/* Раздел 03. Компьютерное мышление */
reg("t06",{lead:"Python 3: типы данных, операции, ветвления, циклы и коллекции. Главный навык для ЕНТ — трассировка: точно определить, что выведет программа.",
html:String.raw`
<h2>Типы данных и ввод-вывод</h2>
<table>
<tr><th>Тип</th><th>Пример</th><th>Изменяемый</th></tr>
<tr><td><code>int</code> — целое</td><td><code>42</code>, <code>-7</code></td><td>—</td></tr>
<tr><td><code>float</code> — вещественное</td><td><code>3.14</code>, <code>2e3</code></td><td>—</td></tr>
<tr><td><code>str</code> — строка</td><td><code>"ЕНТ"</code>, <code>'a'</code></td><td>нет</td></tr>
<tr><td><code>bool</code> — логический</td><td><code>True</code>, <code>False</code></td><td>—</td></tr>
<tr><td><code>list</code> — список</td><td><code>[1, 2, 3]</code></td><td>да</td></tr>
<tr><td><code>tuple</code> — кортеж</td><td><code>(1, 2)</code></td><td>нет</td></tr>
<tr><td><code>dict</code> — словарь</td><td><code>{"a": 1}</code></td><td>да</td></tr>
<tr><td><code>set</code> — множество</td><td><code>{1, 2}</code></td><td>да</td></tr>
</table>
[[py]]
name = input()              # input() всегда возвращает строку
n = int(input())            # число нужно преобразовать
a, b = map(int, input().split())   # два числа в одной строке
print(a, b, sep="-", end="!\n")    # 3-5!
print(f"Сумма: {a + b}")           # f-строка
[[/py]]

<h2>Арифметика</h2>
<table>
<tr><th>Операция</th><th>Пример</th><th>Результат</th></tr>
<tr><td><code>/</code> деление</td><td><code>7 / 2</code></td><td>3.5 (всегда float)</td></tr>
<tr><td><code>//</code> целочисленное деление</td><td><code>17 // 5</code>, <code>-7 // 2</code></td><td>3, −4 (округление вниз)</td></tr>
<tr><td><code>%</code> остаток</td><td><code>17 % 5</code>, <code>-7 % 2</code></td><td>2, 1</td></tr>
<tr><td><code>**</code> степень</td><td><code>2 ** 10</code></td><td>1024</td></tr>
</table>
<p>Приоритет: <code>**</code>, затем унарный минус, затем <code>* / // %</code>, затем <code>+ −</code>. Поэтому <code>-2 ** 2</code> равно −4, а <code>2 ** 3 ** 2</code> равно 2⁹ = 512 (степень вычисляется справа налево).</p>
<p>Цифры числа: <code>n % 10</code> — последняя цифра, <code>n // 10</code> — число без последней цифры, <code>n % 2 == 0</code> — проверка чётности.</p>

<h2>Ветвления</h2>
[[py]]
x = int(input())
if x > 0:
    print("положительное")
elif x == 0:
    print("ноль")
else:
    print("отрицательное")

if 10 <= x <= 99:          # двойное сравнение
    print("двузначное")
[[/py]]
<p>Блок определяется отступом (4 пробела). Ошибка в отступах вызывает <code>IndentationError</code>.</p>

<h2>Циклы</h2>
<p><code>range(stop)</code> даёт 0 … stop−1; <code>range(start, stop)</code>; <code>range(start, stop, step)</code>. Правая граница не включается: <code>range(1, 10, 3)</code> → 1, 4, 7. <code>range(10, 0, -2)</code> → 10, 8, 6, 4, 2.</p>
[[py]]
# сумма цифр числа
n = 2024
s = 0
while n > 0:
    s += n % 10
    n //= 10
print(s)                   # 8

# НОД по алгоритму Евклида
a, b = 48, 18
while b != 0:
    a, b = b, a % b
print(a)                   # 6

# проверка числа на простоту
n = 29
is_prime = n > 1
for d in range(2, int(n ** 0.5) + 1):
    if n % d == 0:
        is_prime = False
        break
print(is_prime)            # True
[[/py]]
<p><code>break</code> прерывает цикл, <code>continue</code> переходит к следующей итерации. Вложенный цикл выполняется полностью на каждом шаге внешнего: при <code>for i in range(1, 5)</code> и <code>for j in range(i)</code> тело выполнится 1 + 2 + 3 + 4 = 10 раз.</p>

<h2>Списки</h2>
<p>Индексы начинаются с 0, отрицательные индексы считают с конца: <code>a[-1]</code> — последний элемент. Срез <code>a[start:stop:step]</code> не включает stop.</p>
[[py]]
a = [5, 3, 8, 1]
a.append(7)         # [5, 3, 8, 1, 7]
a.insert(0, 9)      # [9, 5, 3, 8, 1, 7]
a.remove(8)         # удаляет первое значение 8
x = a.pop()         # удаляет и возвращает последний (7)
a.sort()            # сортирует сам список: [1, 3, 5, 9]
print(a[1:3])       # [3, 5]
print(a[::-1])      # [9, 5, 3, 1]
print(len(a), sum(a), max(a), min(a))   # 4 18 9 1
print(a.index(5), a.count(3), 9 in a)   # 2 1 True
sq = [i * i for i in range(5)]          # [0, 1, 4, 9, 16]
ev = [x for x in sq if x % 2 == 0]      # [0, 4, 16]
[[/py]]
<div class="note trap"><b>Ссылка, а не копия</b><code>b = a</code> не копирует список: обе переменные указывают на один объект, и <code>b.append(4)</code> изменит <code>a</code>. Копия: <code>b = a[:]</code> или <code>b = a.copy()</code>.</div>

<h2>Кортежи, множества, словари</h2>
[[py]]
t = (1, 2, 3)               # кортеж нельзя изменить: t[0] = 5 → TypeError
s = {3, 1, 3, 2}            # {1, 2, 3} — повторы удаляются
print({1, 2} | {2, 3})      # {1, 2, 3} объединение
print({1, 2} & {2, 3})      # {2} пересечение
print({1, 2} - {2, 3})      # {1} разность

d = {"Алматы": 2.2, "Астана": 1.4}
d["Шымкент"] = 1.2          # добавить ключ
print(d["Астана"])          # 1.4
print(d.get("Актау", 0))    # 0 — ключа нет, значение по умолчанию
for city, mln in d.items():
    print(city, mln)

# подсчёт частот символов
cnt = {}
for ch in "банан":
    cnt[ch] = cnt.get(ch, 0) + 1
print(cnt)                  # {'б': 1, 'а': 2, 'н': 2}
[[/py]]

<h2>Двумерные списки</h2>
[[py]]
a = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
n = len(a)
print(a[1][2])                               # 6: строка 1, столбец 2
main = sum(a[i][i] for i in range(n))        # 1 + 5 + 9 = 15
side = sum(a[i][n - 1 - i] for i in range(n))  # 3 + 5 + 7 = 15
rows = [sum(r) for r in a]                   # [6, 15, 24]

m = [[0] * 3 for _ in range(2)]   # правильно: 2 независимые строки
bad = [[0] * 3] * 2               # ошибка: одна и та же строка дважды
[[/py]]

<h2>Типичные ошибки</h2>
<table>
<tr><th>Ошибка</th><th>Причина</th></tr>
<tr><td><code>SyntaxError</code></td><td>Нарушен синтаксис: нет двоеточия, скобки</td></tr>
<tr><td><code>IndentationError</code></td><td>Неверный отступ</td></tr>
<tr><td><code>NameError</code></td><td>Переменная не определена</td></tr>
<tr><td><code>TypeError</code></td><td>Операция с несовместимыми типами: <code>"5" + 5</code></td></tr>
<tr><td><code>ValueError</code></td><td>Неподходящее значение: <code>int("abc")</code></td></tr>
<tr><td><code>IndexError</code></td><td>Индекс вне списка</td></tr>
<tr><td><code>KeyError</code></td><td>Ключа нет в словаре</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>Деление на ноль</td></tr>
</table>

<h2>Как трассировать программу</h2>
<p>Заведите таблицу: столбец на каждую переменную, строка на каждую итерацию. Записывайте значения после выполнения тела цикла. Проверяйте условие выхода перед каждой итерацией. Это медленнее, чем «в уме», но на уровнях B и C почти исключает ошибки.</p>

<div class="note trap"><b>Ловушки ЕНТ</b>
<ul>
<li><code>range(a, b)</code> не включает b.</li>
<li><code>//</code> и <code>%</code> с отрицательными числами округляют вниз: −7 // 2 = −4.</li>
<li><code>/</code> всегда даёт float: <code>6 / 2</code> равно 3.0.</li>
<li><code>"3" * 2</code> даёт "33", а <code>"3" + "2"</code> даёт "32".</li>
<li><code>a.sort()</code> возвращает None. Запись <code>a = a.sort()</code> стирает список.</li>
</ul></div>
`,
quiz:[
{t:"single",lv:"A",q:"Что выведет программа?",code:String.raw`print(17 // 5, 17 % 5)`,opts:["3 2","3.4 2","2 3","3 3"],a:0},
{t:"single",lv:"A",q:"Что выведет программа?",code:String.raw`print(-7 // 2)`,opts:["-3","-3.5","-4","3"],a:2,ex:"Целочисленное деление округляет вниз, к −∞."},
{t:"single",lv:"A",q:"Какой тип данных возвращает функция input()?",opts:["int","str","float","Зависит от введённых данных"],a:1},
{t:"single",lv:"A",q:"Что выведет программа?",code:String.raw`a = [5, 3, 8, 1]
print(a[-1] + a[1])`,opts:["8","4","13","6"],a:1,ex:"a[-1] = 1, a[1] = 3."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`s = 0
for i in range(1, 10, 3):
    s += i
print(s)`,opts:["12","22","15","45"],a:0,ex:"i принимает значения 1, 4, 7. Сумма 12."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`n = 2024
s = 0
while n > 0:
    s += n % 10
    n //= 10
print(s)`,opts:["4","8","2024","6"],a:1,ex:"Сумма цифр 2 + 0 + 2 + 4 = 8."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`s = "Informatika"
print(s[2:6])`,opts:["nfor","form","forma","orma"],a:1,ex:"Индексы 2, 3, 4, 5: f, o, r, m."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`a = [1, 2, 3]
b = a
b.append(4)
print(len(a))`,opts:["3","4","Ошибка","7"],a:1,ex:"b и a ссылаются на один и тот же список."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`d = {"a": 1, "b": 2}
d["a"] += 5
d["c"] = 0
print(sum(d.values()))`,opts:["3","8","9","Ошибка KeyError"],a:1,ex:"Значения 6, 2, 0."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`x = 0
for i in range(1, 5):
    for j in range(i):
        x += 1
print(x)`,opts:["4","10","16","15"],a:1,ex:"Внутренний цикл выполняется 1, 2, 3, 4 раза."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`k = 0
for n in range(10, 100):
    if n % 7 == 0 and n % 2 == 1:
        k += 1
print(k)`,opts:["6","7","13","12"],a:0,ex:"Нечётные двузначные числа, кратные 7: 21, 35, 49, 63, 77, 91."},
{t:"multi",lv:"B",q:"Какие выражения Python дают целое число 8?",opts:["2 ** 3","17 // 2","26 % 9","len('8')","2 * 3 + 1"],a:[0,1,2],ex:"len('8') = 1, 2 * 3 + 1 = 7."},
{t:"multi",lv:"A",q:"Какие типы данных Python изменяемы?",opts:["list","tuple","dict","str","set"],a:[0,2,4]},
{t:"match",lv:"B",q:"Дан список a = [3, 1, 2]. Установите соответствие между выражением и его значением.",left:["sorted(a)","a[::-1]","a + [0]"],right:["[2, 1, 3]","[1, 2, 3]","[3, 1, 2, 0]","[3, 2, 1]"],a:[1,0,2],ex:"a[::-1] переворачивает список: [2, 1, 3]. [3, 2, 1] — сортировка по убыванию, лишний вариант."},
{t:"match",lv:"A",q:"Установите соответствие между ошибкой и её причиной.",left:["TypeError","ZeroDivisionError","IndexError"],right:["Сложение строки и числа","Деление на ноль","Обращение к a[10] у списка из 3 элементов","Неверный отступ"],a:[0,1,2],ex:"Неверный отступ даёт IndentationError."}
]});

reg("t07",{lead:"Функции, рекурсия, строки, файлы, сортировка, поиск и графы. Это самая объёмная тема спецификации, из неё берутся задания уровней B и C.",
html:String.raw`
<h2>Функции</h2>
[[py]]
def area(a, b=1):          # b — параметр со значением по умолчанию
    return a * b

def min_max(lst):
    return min(lst), max(lst)   # возвращается кортеж

print(area(5))             # 5
print(area(5, 3))          # 15
lo, hi = min_max([4, 9, 2])     # lo = 2, hi = 9

def hello():
    print("Сәлем")         # нет return → функция возвращает None
r = hello()                # печатает Сәлем, r = None
[[/py]]
<p>Переменные внутри функции <b>локальные</b> и не видны снаружи. Чтобы изменить глобальную переменную, её объявляют через <code>global</code>. <code>return</code> сразу завершает функцию.</p>
<p><b>lambda</b> — короткая безымянная функция: <code>sorted(words, key=lambda w: len(w))</code> сортирует слова по длине.</p>

<h2>Рекурсия</h2>
<p>Рекурсивная функция вызывает сама себя. Ей обязательно нужен <b>базовый случай</b>, где рекурсия останавливается, и <b>рекурсивный шаг</b>, который приближает к базовому случаю. Каждый вызов хранится в <b>стеке вызовов</b>. Если базового случая нет, стек переполняется и возникает <code>RecursionError</code> (по умолчанию предел около 1000 вызовов).</p>
[[py]]
def fact(n):
    if n <= 1:             # базовый случай
        return 1
    return n * fact(n - 1) # рекурсивный шаг

def F(n):                  # числа Фибоначчи (F(0) = F(1) = 1)
    if n <= 1:
        return 1
    return F(n - 1) + F(n - 2)

def p(n):                  # печать двоичной записи
    if n > 0:
        p(n // 2)
        print(n % 2, end="")

print(fact(5))   # 120
print(F(5))      # 8
p(13)            # 1101
[[/py]]
<h3>Как трассировать рекурсию</h3>
<p>Считайте значения снизу вверх: F(0) = 1, F(1) = 1, F(2) = 2, F(3) = 3, F(4) = 5, F(5) = 8. Число вызовов считается так же: C(n) = 1 + C(n − 1) + C(n − 2), C(0) = C(1) = 1. Отсюда C(2) = 3, C(3) = 5, C(4) = 9.</p>
<p>Если <code>print</code> стоит <b>до</b> рекурсивного вызова, значения выводятся по пути вглубь. Если <b>после</b>, то на обратном пути, в обратном порядке. Функция <code>p</code> выше печатает остатки после вызова, поэтому они идут от старшего разряда к младшему.</p>

<h2>Строки</h2>
<p>Строки неизменяемы: <code>s[0] = "A"</code> вызовет ошибку. Методы возвращают новую строку.</p>
<table>
<tr><th>Метод</th><th>Пример для s = "Astana"</th><th>Результат</th></tr>
<tr><td><code>len(s)</code></td><td><code>len(s)</code></td><td>6</td></tr>
<tr><td><code>upper / lower</code></td><td><code>s.upper()</code></td><td>"ASTANA"</td></tr>
<tr><td><code>find</code></td><td><code>s.find("ta")</code>, <code>s.find("z")</code></td><td>2, −1</td></tr>
<tr><td><code>index</code></td><td><code>s.index("z")</code></td><td>ValueError (в отличие от find)</td></tr>
<tr><td><code>count</code></td><td><code>s.count("a")</code></td><td>2 (заглавная A не считается)</td></tr>
<tr><td><code>replace</code></td><td><code>s.replace("a", "o")</code></td><td>"Astono"</td></tr>
<tr><td><code>split / join</code></td><td><code>"a b c".split()</code>, <code>"-".join(["a","b"])</code></td><td>['a', 'b', 'c'], "a-b"</td></tr>
<tr><td><code>strip</code></td><td><code>"  hi ".strip()</code></td><td>"hi"</td></tr>
<tr><td><code>startswith / endswith</code></td><td><code>s.startswith("As")</code></td><td>True</td></tr>
<tr><td><code>isdigit / isalpha</code></td><td><code>"2026".isdigit()</code></td><td>True</td></tr>
<tr><td><code>ord / chr</code></td><td><code>ord("A")</code>, <code>chr(66)</code></td><td>65, "B"</td></tr>
</table>
[[py]]
s = "А роза упала на лапу Азора"
t = s.lower().replace(" ", "")
print(t == t[::-1])          # True — палиндром

text = "ЕНТ 2026 информатика"
digits = sum(int(ch) for ch in text if ch.isdigit())   # 10
words = len(text.split())                                 # 3
[[/py]]

<h2>Работа с файлами</h2>
<table>
<tr><th>Режим</th><th>Действие</th></tr>
<tr><td><code>"r"</code></td><td>Чтение (по умолчанию). Если файла нет — FileNotFoundError</td></tr>
<tr><td><code>"w"</code></td><td>Запись. Файл создаётся, а старое содержимое стирается</td></tr>
<tr><td><code>"a"</code></td><td>Дозапись в конец файла</td></tr>
<tr><td><code>"x"</code></td><td>Создание нового файла; ошибка, если он уже есть</td></tr>
<tr><td><code>"b"</code>, <code>"+"</code></td><td>Двоичный режим; чтение и запись одновременно</td></tr>
</table>
[[py]]
# числа по одному в строке → сумма записывается в другой файл
with open("numbers.txt", "r", encoding="utf-8") as f:
    nums = [int(line) for line in f]      # перебор строк файла

with open("result.txt", "w", encoding="utf-8") as f:
    f.write(f"Сумма: {sum(nums)}\n")

with open("log.txt", "a", encoding="utf-8") as f:
    f.write("ещё одна строка\n")         # добавляется в конец
[[/py]]
<p><code>f.read()</code> читает весь файл одной строкой, <code>f.readline()</code> — одну строку, <code>f.readlines()</code> — список строк (с символами <code>\n</code>). Конструкция <code>with</code> закрывает файл автоматически, даже при ошибке. Строки CSV разбирают через <code>line.strip().split(",")</code>.</p>

<h2>Сортировка</h2>
<table>
<tr><th>Алгоритм</th><th>Идея</th><th>Сложность</th></tr>
<tr><td>Пузырьковая</td><td>Сравниваются соседние элементы и меняются местами. После каждого прохода наибольший элемент «всплывает» в конец</td><td>O(n²)</td></tr>
<tr><td>Выбором</td><td>Находится минимум неотсортированной части и ставится на её начало</td><td>O(n²)</td></tr>
<tr><td>Вставками</td><td>Очередной элемент вставляется на своё место в отсортированной части. Быстра на почти упорядоченных данных</td><td>O(n²), лучший случай O(n)</td></tr>
<tr><td>Быстрая (quicksort)</td><td>Опорный элемент делит массив на «меньше» и «больше», части сортируются рекурсивно</td><td>O(n log n) в среднем, O(n²) в худшем</td></tr>
<tr><td>Слиянием (merge sort)</td><td>Массив делится пополам, половины сортируются и сливаются</td><td>O(n log n) всегда</td></tr>
</table>
[[py]]
def bubble(a):
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]

a = [5, 1, 4, 2, 8]
bubble(a)                 # после 1-го прохода: [1, 4, 2, 5, 8]

nums = [3, 1, 2]
nums.sort()                        # меняет сам список, возвращает None
b = sorted(nums, reverse=True)     # новый список [3, 2, 1]
names = sorted(["Ерлан", "Аружан", "Дана"], key=len)
[[/py]]

<h2>Поиск</h2>
<p><b>Линейный поиск</b> проверяет элементы по очереди, O(n), работает на любом списке. <b>Двоичный поиск</b> делит отсортированный список пополам, O(log n). Максимальное число сравнений для n элементов — ⌈log₂(n + 1)⌉: для 1000 элементов 10, для 10⁶ около 20.</p>
[[py]]
def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
[[/py]]

<h2>Графы</h2>
<p><b>Граф</b> — множество вершин и рёбер. Граф бывает <b>ориентированным</b> (рёбра-дуги имеют направление) и <b>неориентированным</b>, <b>взвешенным</b> (у рёбер есть длины или стоимости). <b>Степень вершины</b> — число рёбер при ней. Сумма степеней всех вершин равна удвоенному числу рёбер. <b>Дерево</b> — связный граф без циклов: при n вершинах в нём n − 1 рёбер.</p>
<div class="grid2">
<div><h4>Матрица смежности</h4><p>Таблица n × n, где M[i][j] = 1 (или вес), если есть ребро i → j. У неориентированного графа матрица симметрична относительно главной диагонали.</p></div>
<div><h4>Список смежности</h4><p>Для каждой вершины перечислены её соседи. В Python это словарь: <code>{"A": ["B", "C"], "B": ["D"]}</code>.</p></div>
</div>
<h3>Обход в ширину и в глубину</h3>
[[py]]
from collections import deque

g = {"A": ["B", "C"], "B": ["D"], "C": ["D", "E"], "D": ["E"], "E": []}

def bfs(start):                # в ширину: очередь, кратчайший путь по числу рёбер
    dist = {start: 0}
    q = deque([start])
    while q:
        v = q.popleft()
        for u in g[v]:
            if u not in dist:
                dist[u] = dist[v] + 1
                q.append(u)
    return dist

def dfs(v, seen=None):         # в глубину: рекурсия (стек)
    if seen is None:
        seen = set()
    seen.add(v)
    for u in g[v]:
        if u not in seen:
            dfs(u, seen)
    return seen

print(bfs("A"))   # {'A': 0, 'B': 1, 'C': 1, 'D': 2, 'E': 2}
[[/py]]
<h3>Кратчайший путь во взвешенном графе (Дейкстра)</h3>
<p>Алгоритм Дейкстры работает при неотрицательных весах. Всем вершинам ставится расстояние ∞, стартовой 0. На каждом шаге берётся непосещённая вершина с наименьшим расстоянием, и пересчитываются расстояния до её соседей.</p>
<table>
<tr><th></th><th class="c">A</th><th class="c">B</th><th class="c">C</th><th class="c">D</th><th class="c">E</th></tr>
<tr><th>A</th><td class="c"></td><td class="c">2</td><td class="c">5</td><td class="c"></td><td class="c"></td></tr>
<tr><th>B</th><td class="c">2</td><td class="c"></td><td class="c">1</td><td class="c">4</td><td class="c"></td></tr>
<tr><th>C</th><td class="c">5</td><td class="c">1</td><td class="c"></td><td class="c">1</td><td class="c">6</td></tr>
<tr><th>D</th><td class="c"></td><td class="c">4</td><td class="c">1</td><td class="c"></td><td class="c">3</td></tr>
<tr><th>E</th><td class="c"></td><td class="c"></td><td class="c">6</td><td class="c">3</td><td class="c"></td></tr>
</table>
<p>Из A: B = 2, затем C = min(5, 2 + 1) = 3, затем D = min(2 + 4, 3 + 1) = 4, затем E = min(3 + 6, 4 + 3) = 7. Кратчайший путь A → B → C → D → E длиной 7.</p>
[[py]]
import heapq

def dijkstra(g, s):            # g = {v: [(u, w), ...]}
    dist = {v: float("inf") for v in g}
    dist[s] = 0
    pq = [(0, s)]
    while pq:
        d, v = heapq.heappop(pq)
        if d > dist[v]:
            continue
        for u, w in g[v]:
            if d + w < dist[u]:
                dist[u] = d + w
                heapq.heappush(pq, (dist[u], u))
    return dist
[[/py]]
<h3>Подсчёт путей в графе без циклов</h3>
<p>Число путей в вершину равно сумме чисел путей во все вершины, из которых в неё ведёт дуга. Дуги: A→B, A→C, B→C, B→D, C→D, C→E, D→E. Тогда A = 1, B = 1, C = A + B = 2, D = B + C = 3, E = C + D = 5. Из A в E ведут 5 путей.</p>

<div class="note trap"><b>Ловушки ЕНТ</b>
<ul>
<li>Функция без <code>return</code> возвращает None.</li>
<li><code>find</code> возвращает −1, а <code>index</code> вызывает ошибку, если подстроки нет.</li>
<li>Режим <code>"w"</code> стирает файл. Для дописывания нужен <code>"a"</code>.</li>
<li>Двоичный поиск работает только на отсортированных данных.</li>
<li>Порядок вывода в рекурсии зависит от того, стоит <code>print</code> до или после вызова.</li>
<li>Ребро неориентированного графа учитывается в степени обеих вершин.</li>
</ul></div>
`,
quiz:[
{t:"single",lv:"A",q:"Что выведет программа?",code:String.raw`def f(a, b=2):
    return a * b

print(f(3) + f(2, 5))`,opts:["16","11","13","Ошибка"],a:0,ex:"f(3) = 6, f(2, 5) = 10."},
{t:"single",lv:"B",q:"Чему равно F(5)?",code:String.raw`def F(n):
    if n <= 1:
        return 1
    return F(n - 1) + F(n - 2)`,opts:["5","8","13","120"],a:1,ex:"1, 1, 2, 3, 5, 8."},
{t:"single",lv:"C",q:"Для функции F из предыдущего задания: сколько раз будет вызвана F при вычислении F(4), включая первый вызов?",code:String.raw`def F(n):
    if n <= 1:
        return 1
    return F(n - 1) + F(n - 2)`,opts:["5","7","9","15"],a:2,ex:"C(n) = 1 + C(n − 1) + C(n − 2): C(0) = C(1) = 1, C(2) = 3, C(3) = 5, C(4) = 9."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`def p(n):
    if n > 0:
        p(n // 2)
        print(n % 2, end="")

p(13)`,opts:["1011","1101","13","0111"],a:1,ex:"Остатки печатаются на обратном пути рекурсии, то есть от старшего разряда: 13 = 1101₂."},
{t:"single",lv:"A",q:"Что выведет программа?",code:String.raw`s = "информатика"
print(s.count("а"), s.find("ф"))`,opts:["2 2","2 3","1 2","2 -1"],a:0,ex:"Буква «а» встречается 2 раза, «ф» стоит под индексом 2."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`print("-".join("a b c".split()))`,opts:["a b c","a-b-c","-a-b-c-","['a', 'b', 'c']"],a:1},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`s = "ЕНТ2026"
k = 0
for ch in s:
    if ch.isdigit():
        k += int(ch)
print(k)`,opts:["4","2026","10","8"],a:2,ex:"2 + 0 + 2 + 6 = 10."},
{t:"single",lv:"A",q:"В каком режиме нужно открыть файл, чтобы дописать строки в конец, не стирая содержимое?",opts:["\"r\"","\"w\"","\"a\"","\"x\""],a:2},
{t:"single",lv:"B",q:"Каким будет список [5, 1, 4, 2, 8] после первого прохода пузырьковой сортировки по возрастанию?",opts:["[1, 5, 4, 2, 8]","[1, 4, 2, 5, 8]","[1, 2, 4, 5, 8]","[1, 4, 5, 2, 8]"],a:1,ex:"5 и 1 меняются, 5 и 4 меняются, 5 и 2 меняются, 5 и 8 остаются."},
{t:"single",lv:"B",q:"Какое наибольшее число сравнений потребуется двоичному поиску в отсортированном списке из 1000 элементов?",opts:["10","100","500","1000"],a:0,ex:"⌈log₂ 1001⌉ = 10, так как 2¹⁰ = 1024."},
{t:"single",lv:"C",q:"Длины дорог между пунктами: A–B 2, A–C 5, B–C 1, B–D 4, C–D 1, D–E 3, C–E 6. Найдите длину кратчайшего пути из A в E.",opts:["7","8","9","11"],a:0,ex:"A → B → C → D → E: 2 + 1 + 1 + 3 = 7."},
{t:"single",lv:"C",q:"В ориентированном графе есть дуги A→B, A→C, B→C, B→D, C→D, C→E, D→E. Сколько различных путей ведёт из A в E?",opts:["4","5","6","7"],a:1,ex:"B = 1, C = 2, D = B + C = 3, E = C + D = 5."},
{t:"single",lv:"A",q:"Сколько рёбер в дереве с 10 вершинами?",opts:["9","10","11","45"],a:0},
{t:"multi",lv:"B",q:"Какие утверждения о сортировке и поиске верны?",opts:["Сложность пузырьковой сортировки O(n²)","Метод list.sort() изменяет список и возвращает None","Функция sorted() возвращает новый список","Двоичный поиск работает на неотсортированном списке","Быстрая сортировка всегда работает за O(n log n)"],a:[0,1,2],ex:"В худшем случае быстрая сортировка O(n²)."},
{t:"multi",lv:"B",q:"Какие утверждения о рекурсии верны?",opts:["В рекурсивной функции должен быть базовый случай","Каждый незавершённый вызов хранится в стеке вызовов","Без базового случая возникает RecursionError","Рекурсия всегда работает быстрее цикла","Функция не может вызывать сама себя больше 10 раз"],a:[0,1,2]},
{t:"match",lv:"A",q:"Установите соответствие между режимом открытия файла и действием.",left:["\"r\"","\"w\"","\"a\""],right:["Дозапись в конец файла","Чтение","Запись со стиранием прежнего содержимого","Удаление файла"],a:[1,2,0]},
{t:"match",lv:"B",q:"Установите соответствие между алгоритмом на графе и его особенностью.",left:["Обход в ширину (BFS)","Обход в глубину (DFS)","Алгоритм Дейкстры"],right:["Использует стек или рекурсию","Кратчайшие пути во взвешенном графе с неотрицательными весами","Использует очередь","Упорядочивает массив по возрастанию"],a:[2,0,1]},
{t:"match",lv:"B",q:"Дана строка s = \"Astana\". Установите соответствие между выражением и результатом.",left:["s.upper()","s.replace(\"a\", \"o\")","s[::-1]"],right:["\"Astono\"","\"anatsA\"","\"ASTANA\"","\"ostono\""],a:[2,0,1],ex:"replace меняет только строчные «a», заглавная A остаётся."}
]});
