/**
 * ЕНТ Информатика 2026 — сбор статистики учеников в Google Таблицу.
 *
 * Как установить:
 * 1. Создайте новую Google Таблицу.
 * 2. Меню «Расширения» → «Apps Script». Удалите всё в файле Code.gs и вставьте этот код.
 * 3. В строке TEACHER_KEY ниже замените текст на свой пароль для кабинета учителя.
 * 4. Нажмите «Сохранить» (значок дискеты).
 * 5. «Начать развёртывание» → «Новое развёртывание» → значок шестерёнки → «Веб-приложение».
 *    «Выполнять от имени»: Я. «У кого есть доступ»: Все. Нажмите «Начать развёртывание».
 * 6. Разрешите доступ своему аккаунту Google и скопируйте «URL веб-приложения».
 *
 * Листы «Ответы» и «Пробные тесты» создадутся сами при первой записи.
 */

const TEACHER_KEY = 'ЗАМЕНИТЕ-НА-СВОЙ-ПАРОЛЬ';

const SHEET_ANS = 'Ответы';
const SHEET_MOCK = 'Пробные тесты';
const HEAD_ANS = ['Время', 'Ученик', 'Класс', 'Устройство', 'Тема', 'Задание', 'Баллы', 'Макс'];
const HEAD_MOCK = ['Время', 'Ученик', 'Класс', 'Устройство', 'Баллы из 50', 'По темам'];

function sheet_(name, head) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(head);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, head.length).setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(s, n) {
  return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').replace(/^[=+\-@]/, "'").trim().slice(0, n);
}

function doGet() {
  return json_({ ok: true, service: 'ent-informatika-stats' });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }

  if (body.action === 'log') return log_(body);
  if (body.action === 'stats') {
    if (String(body.key || '') !== TEACHER_KEY || TEACHER_KEY === 'ЗАМЕНИТЕ-НА-СВОЙ-ПАРОЛЬ') return json_({ ok: false, error: 'bad_key' });
    return json_(stats_());
  }
  return json_({ ok: false, error: 'unknown_action' });
}

function log_(body) {
  const st = body.student || {};
  const name = clean_(st.name, 60), cls = clean_(st.cls, 12), dev = clean_(st.device, 24);
  if (!name || !cls) return json_({ ok: false, error: 'no_student' });
  const events = Array.isArray(body.events) ? body.events.slice(0, 200) : [];
  const ans = [], mocks = [];
  events.forEach(function (ev) {
    const time = new Date(Number(ev.ts) || Date.now());
    if (ev.k === 'q') {
      ans.push([time, name, cls, dev, clean_(ev.t, 2), Number(ev.i) + 1, Number(ev.p) || 0, Number(ev.m) || 1]);
    } else if (ev.k === 'mock') {
      mocks.push([time, name, cls, dev, Number(ev.s) || 0, clean_(JSON.stringify(ev.per || {}), 500)]);
    }
  });
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (ans.length) { const sh = sheet_(SHEET_ANS, HEAD_ANS); sh.getRange(sh.getLastRow() + 1, 1, ans.length, HEAD_ANS.length).setValues(ans); }
    if (mocks.length) { const sh = sheet_(SHEET_MOCK, HEAD_MOCK); sh.getRange(sh.getLastRow() + 1, 1, mocks.length, HEAD_MOCK.length).setValues(mocks); }
  } finally { lock.releaseLock(); }
  return json_({ ok: true, saved: ans.length + mocks.length });
}

function stats_() {
  const students = {};
  const keyOf = function (name, cls) { return String(cls).toUpperCase().replace(/\s+/g, '') + '|' + String(name).toLowerCase().replace(/\s+/g, ' '); };
  const get = function (name, cls) {
    const k = keyOf(name, cls);
    if (!students[k]) students[k] = { name: String(name), cls: String(cls).toUpperCase().replace(/\s+/g, ''), last: 0, answers: 0, q: {}, mocks: [] };
    return students[k];
  };
  const shA = sheet_(SHEET_ANS, HEAD_ANS);
  const a = shA.getLastRow() > 1 ? shA.getRange(2, 1, shA.getLastRow() - 1, HEAD_ANS.length).getValues() : [];
  a.forEach(function (r) {
    const s = get(r[1], r[2]);
    const t = new Date(r[0]).getTime();
    s.answers++;
    if (t > s.last) s.last = t;
    const topic = String(r[4]).padStart(2, '0');
    s.q[topic] = s.q[topic] || {};
    s.q[topic][r[5]] = [Number(r[6]), Number(r[7])];
  });
  const shM = sheet_(SHEET_MOCK, HEAD_MOCK);
  const m = shM.getLastRow() > 1 ? shM.getRange(2, 1, shM.getLastRow() - 1, HEAD_MOCK.length).getValues() : [];
  m.forEach(function (r) {
    const s = get(r[1], r[2]);
    const t = new Date(r[0]).getTime();
    if (t > s.last) s.last = t;
    s.mocks.push({ t: t, s: Number(r[4]) });
  });
  const list = Object.keys(students).map(function (k) {
    const s = students[k];
    const topics = {};
    Object.keys(s.q).forEach(function (tp) {
      let done = 0, ok = 0;
      Object.keys(s.q[tp]).forEach(function (i) { done++; if (s.q[tp][i][0] >= s.q[tp][i][1]) ok++; });
      topics[tp] = { done: done, ok: ok };
    });
    return { name: s.name, cls: s.cls, last: s.last, answers: s.answers, topics: topics, mocks: s.mocks };
  });
  return { ok: true, generated: Date.now(), students: list };
}
