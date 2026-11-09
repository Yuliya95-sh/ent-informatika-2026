/* Углублённые материалы. Раздел 03 */
ext("t06",{html:String.raw`
<h2>Округление и форматирование чисел</h2>
<table>
<tr><th>Выражение</th><th>Результат</th><th>Пояснение</th></tr>
<tr><td><code>round(2.5)</code>, <code>round(3.5)</code></td><td>2, 4</td><td>«Банковское» округление: при ровно .5 к ближайшему чётному</td></tr>
<tr><td><code>round(3.14159, 2)</code></td><td>3.14</td><td>До двух знаков</td></tr>
<tr><td><code>int(3.9)</code>, <code>int(-3.9)</code></td><td>3, −3</td><td>Отбрасывает дробную часть (к нулю)</td></tr>
<tr><td><code>-7 // 2</code></td><td>−4</td><td>Округляет вниз (к −∞)</td></tr>
<tr><td><code>math.floor(-3.5)</code>, <code>math.ceil(3.1)</code></td><td>−4, 4</td><td>Вниз и вверх</td></tr>
<tr><td><code>f"{2/3:.2f}"</code></td><td>'0.67'</td><td>Вывод с двумя знаками</td></tr>
<tr><td><code>f"{7:3d}|"</code></td><td>'  7|'</td><td>Ширина поля 3</td></tr>
</table>

<h2>Логические значения и сокращённое вычисление</h2>
<p>В условии ложными считаются <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>{}</code>, <code>None</code>, <code>False</code>. Всё остальное истинно, в том числе <code>"0"</code> и <code>[0]</code>.</p>
<p><code>and</code> и <code>or</code> вычисляются слева направо и останавливаются, как только результат ясен. Они возвращают один из операндов, а не обязательно True или False: <code>0 or 5</code> даёт 5, <code>3 and 0</code> даёт 0, <code>"" or "нет"</code> даёт "нет". Поэтому проверка <code>if b != 0 and a / b > 1</code> безопасна: при b = 0 деление не выполнится.</p>

<h2>break, continue и else в циклах</h2>
[[py]]
for n in range(2, 10):
    if n % 3 == 0:
        continue          # пропустить 3 и 6
    if n == 8:
        break             # выйти из цикла на 8
    print(n, end=" ")     # 2 4 5 7

for d in range(2, 9):
    if 91 % d == 0:
        print("делитель", d)     # делитель 7
        break
else:                     # выполняется, только если не было break
    print("простое")
[[/py]]
<h3>Трассировка цикла while</h3>
[[py]]
a, b = 1, 1
while b < 20:
    a, b = b, a + b
print(a, b)
[[/py]]
<table>
<tr><th>Итерация</th><th class="c">a</th><th class="c">b</th><th>b &lt; 20?</th></tr>
<tr><td>до цикла</td><td class="c">1</td><td class="c">1</td><td>да</td></tr>
<tr><td>1</td><td class="c">1</td><td class="c">2</td><td>да</td></tr>
<tr><td>2</td><td class="c">2</td><td class="c">3</td><td>да</td></tr>
<tr><td>3</td><td class="c">3</td><td class="c">5</td><td>да</td></tr>
<tr><td>4</td><td class="c">5</td><td class="c">8</td><td>да</td></tr>
<tr><td>5</td><td class="c">8</td><td class="c">13</td><td>да</td></tr>
<tr><td>6</td><td class="c">13</td><td class="c">21</td><td>нет — выход</td></tr>
</table>
<p>Программа выведет <code>13 21</code>. Обратите внимание: в <code>a, b = b, a + b</code> правая часть вычисляется полностью до присваивания.</p>

<h2>Типовые алгоритмы со списками</h2>
[[py]]
a = [4, 9, 2, 9, 1]

# максимум и его первый индекс
mx, imx = a[0], 0
for i in range(1, len(a)):
    if a[i] > mx:          # строгое > даёт первый максимум, >= — последний
        mx, imx = a[i], i
print(mx, imx)             # 9 1

# второй по величине (различные значения)
second = max(x for x in a if x != max(a))   # 4

# количество пар соседей, где левый больше правого
k = sum(1 for i in range(len(a) - 1) if a[i] > a[i + 1])   # 2: (9,2), (9,1)

# среднее чётных
ev = [x for x in a if x % 2 == 0]
avg = sum(ev) / len(ev) if ev else 0         # 3.0

# циклический сдвиг влево на 1 и разворот без срезов
a = a[1:] + a[:1]                            # [9, 2, 9, 1, 4]
n = len(a)
for i in range(n // 2):
    a[i], a[n - 1 - i] = a[n - 1 - i], a[i]

# удаление повторов с сохранением порядка
seen, uniq = set(), []
for x in [3, 1, 3, 2, 1]:
    if x not in seen:
        seen.add(x)
        uniq.append(x)                       # [3, 1, 2]
[[/py]]

<h2>Типовые алгоритмы с числами</h2>
[[py]]
# переворот числа
n, r = 12345, 0
while n > 0:
    r = r * 10 + n % 10
    n //= 10
print(r)                         # 54321

# сумма делителей и совершенные числа (6 = 1 + 2 + 3)
def div_sum(n):
    return sum(d for d in range(1, n) if n % d == 0)
print([n for n in range(2, 1000) if div_sum(n) == n])   # [6, 28, 496]

# НОК через НОД
import math
print(18 * 12 // math.gcd(18, 12))   # 36

# решето Эратосфена: простые до 30
N = 30
is_p = [True] * (N + 1)
is_p[0] = is_p[1] = False
for i in range(2, int(N ** 0.5) + 1):
    if is_p[i]:
        for j in range(i * i, N + 1, i):
            is_p[j] = False
print([i for i in range(N + 1) if is_p[i]])   # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
[[/py]]

<h2>Полезные встроенные функции и модули</h2>
<table>
<tr><th>Функция</th><th>Пример</th><th>Результат</th></tr>
<tr><td><code>enumerate</code></td><td><code>list(enumerate("ab"))</code></td><td>[(0, 'a'), (1, 'b')]</td></tr>
<tr><td><code>zip</code></td><td><code>list(zip([1, 2], [3, 4]))</code></td><td>[(1, 3), (2, 4)]</td></tr>
<tr><td><code>any / all</code></td><td><code>any(x &lt; 0 for x in [1, -2])</code></td><td>True</td></tr>
<tr><td><code>divmod</code></td><td><code>divmod(17, 5)</code></td><td>(3, 2)</td></tr>
<tr><td><code>max / min</code> с key</td><td><code>max(["aa", "b"], key=len)</code></td><td>'aa'</td></tr>
<tr><td><code>math</code></td><td><code>math.sqrt(16)</code>, <code>math.pi</code>, <code>math.gcd(12, 18)</code></td><td>4.0, 3.14159…, 6</td></tr>
<tr><td><code>random</code></td><td><code>random.randint(1, 6)</code>, <code>random.choice(a)</code>, <code>random.shuffle(a)</code></td><td>целое от 1 до 6 включительно; случайный элемент; перемешивание на месте</td></tr>
</table>

<h2>Срезы: тонкие случаи</h2>
<p>Для <code>a = [1, 2, 3, 4, 5, 6]</code>: <code>a[::2]</code> → [1, 3, 5]; <code>a[1::2]</code> → [2, 4, 6]; <code>a[-2:]</code> → [5, 6]; <code>a[:-2]</code> → [1, 2, 3, 4]; <code>a[4:1]</code> → [] (пустой, шаг положительный); <code>a[4:1:-1]</code> → [5, 4, 3]. Срез никогда не вызывает IndexError, даже если границы выходят за список.</p>

<h2>Двумерные списки: обходы</h2>
[[py]]
a = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
n = len(a)

below = sum(a[i][j] for i in range(n) for j in range(n) if i > j)   # 4 + 7 + 8 = 19
above = sum(a[i][j] for i in range(n) for j in range(n) if i < j)   # 2 + 3 + 6 = 11
cols = [sum(a[i][j] for i in range(n)) for j in range(n)]           # [12, 15, 18]
row_max = [max(r) for r in a]                                        # [3, 6, 9]
t = [list(r) for r in zip(*a)]                                       # транспонирование

# ввод матрицы n × m
# n, m = map(int, input().split())
# a = [list(map(int, input().split())) for _ in range(n)]
[[/py]]
<p>Условия для элементов: главная диагональ i == j, побочная i + j == n − 1, ниже главной i &gt; j, выше i &lt; j.</p>

<h2>Сложность алгоритмов</h2>
<table>
<tr><th>Обозначение</th><th>Название</th><th>Пример</th><th>n = 1000 → операций</th></tr>
<tr><td>O(1)</td><td>Константная</td><td>Доступ <code>a[i]</code>, ключ в словаре</td><td>1</td></tr>
<tr><td>O(log n)</td><td>Логарифмическая</td><td>Двоичный поиск</td><td>≈ 10</td></tr>
<tr><td>O(n)</td><td>Линейная</td><td>Поиск максимума, линейный поиск</td><td>1000</td></tr>
<tr><td>O(n log n)</td><td>—</td><td>Сортировка слиянием, <code>sorted()</code></td><td>≈ 10 000</td></tr>
<tr><td>O(n²)</td><td>Квадратичная</td><td>Два вложенных цикла по n, пузырьковая сортировка</td><td>1 000 000</td></tr>
</table>
<p>Проверка <code>x in list</code> — O(n), а <code>x in set</code> и <code>x in dict</code> — в среднем O(1). Поэтому для частых проверок принадлежности лучше множество.</p>
`,
traps:["round(2.5) равно 2, а не 3.","int() отбрасывает дробную часть к нулю, а // округляет вниз: int(-3.5) = −3, но −7 // 2 = −4.","Ветка else у цикла выполняется, только если цикл завершился без break."],
quiz:[
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`print(round(2.5), round(3.5), int(-3.9))`,opts:["3 4 -4","2 4 -3","2 3 -3","3 4 -3"],a:1,ex:"При ровно .5 округление идёт к чётному; int отбрасывает дробную часть."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`print(0 or 5, 3 and 0)`,opts:["True False","5 0","5 3","1 0"],a:1,ex:"or возвращает первый истинный операнд, and — первый ложный."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`for n in range(2, 10):
    if n % 3 == 0:
        continue
    if n == 8:
        break
    print(n, end=" ")`,opts:["2 4 5 7","2 4 5 7 8","2 3 4 5 6 7","2 4 5 7 9"],a:0},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`a, b = 1, 1
while b < 20:
    a, b = b, a + b
print(a, b)`,opts:["8 13","13 21","21 34","13 20"],a:1},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`a = [4, 9, 2, 9, 1]
print(a.index(max(a)), a.count(9))`,opts:["1 2","3 2","9 2","1 1"],a:0,ex:"index возвращает первое вхождение."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`a = [3, 8, 2, 5, 5, 1, 7]
k = 0
for i in range(len(a) - 1):
    if a[i] > a[i + 1]:
        k += 1
print(k)`,opts:["1","2","3","4"],a:1,ex:"Пары (8, 2) и (5, 1). Пара (5, 5) не подходит: 5 > 5 ложно."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`a = [1, 2, 3, 4, 5, 6]
print(a[1::2], a[-2:])`,opts:["[2, 4, 6] [5, 6]","[1, 3, 5] [5, 6]","[2, 4, 6] [6]","[2, 3, 4, 5, 6] [5]"],a:0},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
s = 0
for i in range(3):
    for j in range(3):
        if i > j:
            s += a[i][j]
print(s)`,opts:["11","15","19","45"],a:2,ex:"Элементы ниже главной диагонали: 4, 7, 8."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`n = 12345
r = 0
while n > 0:
    r = r * 10 + n % 10
    n //= 10
print(r)`,opts:["15","12345","54321","5"],a:2},
{t:"single",lv:"B",q:"Какую сложность имеет фрагмент «for i in range(n): for j in range(n): s += 1»?",opts:["O(n)","O(log n)","O(n²)","O(2n)"],a:2},
{t:"single",lv:"A",q:"Какие значения может вернуть random.randint(1, 6)?",opts:["Целые от 1 до 5","Целые от 1 до 6 включительно","Вещественные от 1 до 6","Целые от 0 до 6"],a:1},
{t:"multi",lv:"B",q:"Какие значения считаются ложными в условии if?",opts:["0","\"\" (пустая строка)","[] (пустой список)","\"0\"","[0]"],a:[0,1,2],ex:"Непустые строка \"0\" и список [0] истинны."},
{t:"match",lv:"B",q:"Установите соответствие между выражением и результатом.",left:["list(zip([1, 2], [3, 4]))","list(enumerate(\"ab\"))","divmod(17, 5)"],right:["(3, 2)","[(0, 'a'), (1, 'b')]","[(1, 3), (2, 4)]","(2, 3)"],a:[2,1,0]},
{t:"match",lv:"B",q:"Установите соответствие между алгоритмом и его сложностью.",left:["Двоичный поиск","Линейный поиск","Пузырьковая сортировка"],right:["O(n)","O(n²)","O(log n)","O(1)"],a:[2,0,1]}
]});

ext("t07",{html:String.raw`
<h2>Функции: области видимости и аргументы</h2>
[[py]]
x = 10
def f():
    x = 5            # новая локальная x, глобальная не меняется
def g():
    global x
    x = 5            # меняет глобальную x
f(); print(x)        # 10
g(); print(x)        # 5

def inc(n):
    n += 1           # число неизменяемо: внешняя переменная не изменится
def add(lst):
    lst.append(1)    # список изменяемый: изменится исходный список
k = 0; inc(k); print(k)      # 0
a = []; add(a); add(a); print(a)   # [1, 1]

def total(*nums):    # произвольное число аргументов
    return sum(nums)
print(total(1, 2, 3))        # 6
[[/py]]
<p>Порядок поиска имени: локальная область функции → объемлющая функция → глобальная область модуля → встроенные имена (правило LEGB).</p>
<div class="note trap"><b>Изменяемое значение по умолчанию</b>В <code>def f(x, acc=[])</code> список создаётся один раз при определении функции и накапливает значения между вызовами. Правильно: <code>acc=None</code>, а внутри <code>if acc is None: acc = []</code>.</div>

<h2>Рекурсия: разборы задач</h2>
<div class="task"><b>Задача 1</b>F(n) = n при n &lt; 3; F(n) = F(n − 1) + 2·F(n − 2) при n ≥ 3. Найдите F(5).
<details class="sol"><summary>Решение</summary>Считаем снизу: F(1) = 1, F(2) = 2, F(3) = 2 + 2·1 = 4, F(4) = 4 + 2·2 = 8, F(5) = 8 + 2·4 = 16.</details></div>
<div class="task"><b>Задача 2</b>Что выведет вызов r(3)?
[[py]]
def r(n):
    if n > 0:
        print(n, end=" ")
        r(n - 1)
        print(n, end=" ")
[[/py]]
<details class="sol"><summary>Решение</summary>По пути вглубь печатается 3 2 1, на обратном пути 1 2 3. Итог: <code>3 2 1 1 2 3</code>.</details></div>
<div class="task"><b>Задача 3</b>Сколько звёздочек напечатает G(3)?
[[py]]
def G(n):
    print("*", end="")
    if n > 0:
        G(n - 1)
        G(n - 1)
[[/py]]
<details class="sol"><summary>Решение</summary>S(0) = 1, S(n) = 1 + 2·S(n − 1). S(1) = 3, S(2) = 7, S(3) = 15. В общем виде 2ⁿ⁺¹ − 1.</details></div>
<h3>Ханойская башня</h3>
<p>Перенести n дисков с A на C: перенести n − 1 дисков на B, большой диск на C, затем n − 1 дисков с B на C. Наименьшее число ходов <span class="f">2ⁿ − 1</span>: для 5 дисков 31 ход.</p>
[[py]]
def hanoi(n, src, dst, tmp):
    if n == 0:
        return
    hanoi(n - 1, src, tmp, dst)
    print(src, "→", dst)
    hanoi(n - 1, tmp, dst, src)
[[/py]]
<h3>Быстрое возведение в степень и мемоизация</h3>
[[py]]
def power(a, n):                 # O(log n) умножений
    if n == 0:
        return 1
    if n % 2 == 0:
        half = power(a, n // 2)
        return half * half
    return a * power(a, n - 1)

from functools import lru_cache
@lru_cache(maxsize=None)         # запоминает уже вычисленные значения
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
print(fib(100))                  # мгновенно; без кэша — годы вычислений
[[/py]]
<table>
<tr><th></th><th>Рекурсия</th><th>Цикл</th></tr>
<tr><td>Запись</td><td>Короче для задач, которые естественно делятся на подзадачи (деревья, перебор)</td><td>Часто длиннее</td></tr>
<tr><td>Память</td><td>Каждый вызов занимает место в стеке</td><td>Постоянная</td></tr>
<tr><td>Риски</td><td>RecursionError, повторные вычисления</td><td>Бесконечный цикл</td></tr>
</table>

<h2>Строки: алгоритмы</h2>
[[py]]
# шифр Цезаря для латиницы
def caesar(s, k):
    res = ""
    for ch in s:
        if "A" <= ch <= "Z":
            res += chr((ord(ch) - 65 + k) % 26 + 65)
        else:
            res += ch
    return res
print(caesar("CAT", 3))          # FDW

# самая длинная серия одинаковых символов
s = "aabbbbcdd"
best = cur = 1
for i in range(1, len(s)):
    if s[i] == s[i - 1]:
        cur += 1
        best = max(best, cur)
    else:
        cur = 1
print(best)                      # 4

# самое частое слово
text = "мама мыла раму мама"
cnt = {}
for w in text.split():
    cnt[w] = cnt.get(w, 0) + 1
print(max(cnt, key=cnt.get))     # мама

# проверка скобок с помощью стека
def balanced(s):
    stack, pairs = [], {")": "(", "]": "["}
    for ch in s:
        if ch in "([":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack
print(balanced("([])"), balanced("(]"))   # True False
[[/py]]
<p>Строки сравниваются <b>лексикографически</b>, посимвольно по кодам: <code>"apple" &lt; "banana"</code>, <code>"Z" &lt; "a"</code> (90 &lt; 97), <code>"10" &lt; "9"</code> (символ "1" меньше "9"). Числа, записанные строками, перед сравнением нужно переводить в int.</p>

<h2>Файлы и обработка ошибок</h2>
<p>Пусть файл <code>scores.csv</code> содержит строки <code>Айгерим,118</code>, <code>Данияр,96</code> и т. д. Найдём средний балл и лучшего ученика:</p>
[[py]]
try:
    with open("scores.csv", encoding="utf-8") as f:
        rows = []
        for line in f:
            name, score = line.strip().split(",")
            rows.append((name, int(score)))
except FileNotFoundError:
    print("Файл не найден")
except ValueError:
    print("В файле есть нечисловой балл")
else:
    avg = sum(s for _, s in rows) / len(rows)
    best = max(rows, key=lambda r: r[1])
    with open("report.txt", "w", encoding="utf-8") as out:
        out.write(f"Средний балл: {avg:.1f}\n")
        out.write(f"Лучший: {best[0]} ({best[1]})\n")
[[/py]]
<p>Блок <code>try</code> содержит код, который может вызвать ошибку; <code>except</code> обрабатывает конкретный тип ошибки; <code>else</code> выполняется, если ошибки не было; <code>finally</code> выполняется всегда. Числа в одной строке файла читают так: <code>nums = list(map(int, f.read().split()))</code>.</p>
<p><b>Текстовые</b> файлы хранят символы в кодировке (UTF-8), <b>двоичные</b> (изображения, звук, .exe) открываются в режиме <code>"rb"</code> и читаются как байты.</p>

<h2>Сортировки: код и трассировка</h2>
[[py]]
def selection(a):                # выбором
    n = len(a)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]

def insertion(a):                # вставками
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key

def quick(a):                    # быстрая
    if len(a) <= 1:
        return a
    p = a[len(a) // 2]
    return quick([x for x in a if x < p]) + [x for x in a if x == p] + quick([x for x in a if x > p])

def merge_sort(a):               # слиянием
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
    res, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            res.append(L[i]); i += 1
        else:
            res.append(R[j]); j += 1
    return res + L[i:] + R[j:]
[[/py]]
<table>
<tr><th>Сортировка вставками [5, 2, 4, 1]</th><th>Список после шага</th></tr>
<tr><td>i = 1, вставляем 2</td><td>[2, 5, 4, 1]</td></tr>
<tr><td>i = 2, вставляем 4</td><td>[2, 4, 5, 1]</td></tr>
<tr><td>i = 3, вставляем 1</td><td>[1, 2, 4, 5]</td></tr>
</table>
<p>Пузырьковая сортировка без досрочного выхода делает n(n − 1)/2 сравнений: для 10 элементов 45. <b>Устойчивая</b> сортировка сохраняет порядок равных элементов: слиянием, вставками, пузырьковая и встроенная <code>sorted()</code> устойчивы; выбором и быстрая в обычной реализации — нет.</p>
<p>Сортировка по нескольким ключам: <code>sorted(students, key=lambda s: (-s[1], s[0]))</code> — по убыванию балла, при равенстве по имени в алфавитном порядке.</p>

<h3>Трассировка двоичного поиска</h3>
<p>Ищем 23 в [3, 7, 11, 15, 19, 23, 27, 31]. Шаг 1: lo = 0, hi = 7, mid = 3, a[3] = 15 &lt; 23, значит lo = 4. Шаг 2: mid = (4 + 7) // 2 = 5, a[5] = 23 — найдено за 2 шага.</p>

<h2>Стек и очередь</h2>
<table>
<tr><th>Структура</th><th>Принцип</th><th>В Python</th><th>Где используется</th></tr>
<tr><td>Стек</td><td>LIFO: последним пришёл — первым вышел</td><td><code>list.append</code>, <code>list.pop()</code></td><td>Вызовы функций, отмена действий, проверка скобок, DFS</td></tr>
<tr><td>Очередь</td><td>FIFO: первым пришёл — первым вышел</td><td><code>deque.append</code>, <code>deque.popleft()</code></td><td>Очередь печати, BFS, обработка запросов</td></tr>
</table>

<h2>Графы: углублённо</h2>
<p>В <b>полном графе</b> из n вершин каждая соединена с каждой: <span class="f">n(n − 1)/2</span> рёбер (10 вершин → 45). Число вершин нечётной степени в любом графе чётно (лемма о рукопожатиях).</p>
<h3>Алгоритм Дейкстры по шагам</h3>
<p>Граф из основной части темы: A–B 2, A–C 5, B–C 1, B–D 4, C–D 1, D–E 3, C–E 6.</p>
<table>
<tr><th>Посещаем</th><th class="c">A</th><th class="c">B</th><th class="c">C</th><th class="c">D</th><th class="c">E</th></tr>
<tr><td>Старт</td><td class="c">0</td><td class="c">∞</td><td class="c">∞</td><td class="c">∞</td><td class="c">∞</td></tr>
<tr><td>A (0)</td><td class="c">✓</td><td class="c">2</td><td class="c">5</td><td class="c">∞</td><td class="c">∞</td></tr>
<tr><td>B (2)</td><td class="c">✓</td><td class="c">✓</td><td class="c">3</td><td class="c">6</td><td class="c">∞</td></tr>
<tr><td>C (3)</td><td class="c">✓</td><td class="c">✓</td><td class="c">✓</td><td class="c">4</td><td class="c">9</td></tr>
<tr><td>D (4)</td><td class="c">✓</td><td class="c">✓</td><td class="c">✓</td><td class="c">✓</td><td class="c">7</td></tr>
</table>
<h3>Минимальное остовное дерево (алгоритм Краскала)</h3>
<p>Остовное дерево соединяет все вершины без циклов. Рёбра сортируются по весу и добавляются, если не образуют цикл: B–C (1), C–D (1), A–B (2), D–E (3). Ребро B–D (4) образовало бы цикл B–C–D, A–C и C–E тоже. Вес дерева 1 + 1 + 2 + 3 = 7, рёбер 4 = 5 − 1.</p>
<h3>Пути через обязательную вершину</h3>
<p>В ориентированном графе A→B, A→C, B→C, B→D, C→D, C→E, D→E путей из A в E всего 5. Путей через C: (пути A→C) × (пути C→E) = 2 × 2 = 4. Путей, избегающих C: 5 − 4 = 1 (A→B→D→E).</p>
<h3>Деревья</h3>
<p>У дерева есть <b>корень</b>, у каждой вершины кроме корня один родитель, вершины без потомков — <b>листья</b>, <b>высота</b> — длина самого длинного пути от корня до листа. Дерево каталогов файловой системы обходят рекурсивно: обработать папку, затем каждую вложенную.</p>
`,
traps:["Список, переданный в функцию, можно изменить внутри неё; число и строку — нельзя.","\"10\" &lt; \"9\" истинно: строки сравниваются посимвольно.","Сортировки выбором и быстрая неустойчивы."],
quiz:[
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`def add(lst):
    lst.append(1)

a = []
add(a)
add(a)
print(a)`,opts:["[]","[1]","[1, 1]","Ошибка"],a:2,ex:"Список изменяемый, функция меняет исходный объект."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`x = 10
def f():
    x = 5
f()
print(x)`,opts:["5","10","None","Ошибка"],a:1,ex:"Внутри f создаётся локальная переменная."},
{t:"single",lv:"C",q:"Что выведет программа?",code:String.raw`def F(n):
    if n < 3:
        return n
    return F(n - 1) + 2 * F(n - 2)

print(F(5))`,opts:["11","16","10","21"],a:1,ex:"F(3) = 4, F(4) = 8, F(5) = 16."},
{t:"single",lv:"C",q:"Что выведет вызов r(3)?",code:String.raw`def r(n):
    if n > 0:
        print(n, end=" ")
        r(n - 1)
        print(n, end=" ")`,opts:["3 2 1","1 2 3","3 2 1 1 2 3","3 2 1 0 1 2 3"],a:2},
{t:"single",lv:"C",q:"Сколько звёздочек напечатает вызов G(3)?",code:String.raw`def G(n):
    print("*", end="")
    if n > 0:
        G(n - 1)
        G(n - 1)`,opts:["4","8","15","16"],a:2,ex:"S(n) = 1 + 2·S(n − 1), S(0) = 1."},
{t:"single",lv:"A",q:"Какое наименьшее число ходов нужно, чтобы решить головоломку «Ханойская башня» для 5 дисков?",opts:["25","31","32","10"],a:1,ex:"2⁵ − 1 = 31."},
{t:"single",lv:"B",q:"Что выведет программа?",code:String.raw`print("10" < "9", "Z" < "a")`,opts:["False False","True True","False True","True False"],a:1,ex:"Сравнение посимвольное по кодам: '1' < '9', 'Z' (90) < 'a' (97)."},
{t:"single",lv:"B",q:"Каким будет список [5, 2, 4, 1] после первых двух шагов сортировки вставками (вставлены элементы с индексами 1 и 2)?",opts:["[2, 5, 4, 1]","[2, 4, 5, 1]","[1, 2, 4, 5]","[2, 4, 1, 5]"],a:1},
{t:"single",lv:"B",q:"Сколько сравнений выполнит пузырьковая сортировка без досрочного выхода для 10 элементов?",opts:["10","45","90","100"],a:1,ex:"n(n − 1)/2 = 45."},
{t:"single",lv:"C",q:"Граф: A–B 2, A–C 5, B–C 1, B–D 4, C–D 1, D–E 3, C–E 6. Чему равна длина кратчайшего пути из A в D?",opts:["4","5","6","3"],a:0,ex:"A → B → C → D: 2 + 1 + 1."},
{t:"single",lv:"C",q:"Граф: A–B 2, A–C 5, B–C 1, B–D 4, C–D 1, D–E 3, C–E 6. Чему равен вес минимального остовного дерева?",opts:["6","7","9","13"],a:1,ex:"Рёбра B–C, C–D, A–B, D–E."},
{t:"single",lv:"C",q:"Ориентированный граф: A→B, A→C, B→C, B→D, C→D, C→E, D→E. Сколько путей из A в E проходят через вершину C?",opts:["2","3","4","5"],a:2,ex:"(A→C: 2 пути) × (C→E: 2 пути)."},
{t:"single",lv:"A",q:"Сколько рёбер в полном неориентированном графе с 10 вершинами?",opts:["10","45","90","100"],a:1},
{t:"single",lv:"B",q:"Двоичным поиском ищут 23 в списке [3, 7, 11, 15, 19, 23, 27, 31]. Сколько раз будет вычислен средний индекс mid?",opts:["1","2","3","4"],a:1,ex:"mid = 3 (15), затем mid = 5 (23)."},
{t:"multi",lv:"B",q:"Какие сортировки являются устойчивыми (в обычной реализации)?",opts:["Слиянием","Вставками","Пузырьковая","Выбором","Быстрая"],a:[0,1,2]},
{t:"multi",lv:"B",q:"Какие утверждения о стеке верны?",opts:["Работает по принципу LIFO","Методы list.append и list.pop() реализуют стек","Используется для проверки скобок и при вызовах функций","Первым извлекается первый добавленный элемент","deque.popleft() извлекает вершину стека"],a:[0,1,2]},
{t:"match",lv:"B",q:"Установите соответствие между исключением и ситуацией, в которой оно возникает.",left:["FileNotFoundError","ValueError","KeyError"],right:["int(\"12a\")","Обращение к отсутствующему ключу словаря","Деление на ноль","Открытие несуществующего файла для чтения"],a:[3,0,1]},
{t:"match",lv:"B",q:"Установите соответствие между структурой данных и принципом доступа.",left:["Стек","Очередь","Словарь"],right:["Первым пришёл — первым вышел (FIFO)","Доступ по ключу","Последним пришёл — первым вышел (LIFO)","Доступ только по номеру строки в файле"],a:[2,0,1]}
]});
