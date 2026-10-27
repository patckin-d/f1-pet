import { isDeepStrictEqual } from 'node:util'

const show = (value) => (value === undefined ? 'undefined' : JSON.stringify(value))

const fail = (call, expected, got) =>
    `${call}: ожидалось ${show(expected)}, получено ${show(got)}${got === undefined ? ' (забыл return?)' : ''}`

// для задач с одним аргументом: one(вход, ожидаемый ответ)
const one = (input, expected) => [[input], expected]

// порядок элементов в ответе не важен
const sortByJson = (arr) => [...arr].sort((a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : 1))

const tree = {
    value: 1,
    children: [
        { value: 2, children: [] },
        {
            value: 3,
            children: [
                { value: 4, children: [] },
                { value: 5, children: [{ value: 6, children: [] }] },
            ],
        },
    ],
}

const tasks = [
    { name: 'sumTo', cases: [one(1, 1), one(4, 10), one(100, 5050)] },
    { name: 'factorial', cases: [one(0, 1), one(1, 1), one(5, 120), one(10, 3628800)] },
    { name: 'pow', cases: [[[2, 0], 1], [[5, 1], 5], [[3, 4], 81], [[2, 10], 1024]] },
    { name: 'sumDigits', cases: [one(0, 0), one(7, 7), one(1234, 10), one(99999, 45)] },
    { name: 'sumArray', cases: [one([], 0), one([5], 5), one([1, 2, 3, 4], 10)] },
    { name: 'reverse', cases: [one('', ''), one('a', 'a'), one('abc', 'cba'), one('рекурсия', 'яисрукер')] },
    {
        name: 'isPalindrome',
        cases: [one('', true), one('a', true), one('abba', true), one('racecar', true), one('abca', false), one('ab', false)],
    },
    {
        name: 'flatten',
        cases: [one([], []), one([1, 2], [1, 2]), one([1, [2, [3, [4]]], 5], [1, 2, 3, 4, 5]), one([[[]], [[1]]], [1])],
    },
    { name: 'depth', cases: [one([], 1), one([1, 2], 1), one([1, [2]], 2), one([1, [2, [3]], [4]], 3), one([[[]]], 3)] },
    { name: 'treeSum', cases: [one({ value: 7, children: [] }, 7), one(tree, 21)] },
    {
        name: 'deepClone',
        check(deepClone) {
            for (const value of [42, 'str', null, true]) {
                const got = deepClone(value)
                if (got !== value) return fail(`deepClone(${show(value)})`, value, got)
            }
            const src = { a: 1, b: { c: [1, 2, { d: 3 }] }, e: null }
            const copy = deepClone(src)
            if (copy?.b?.c && !Array.isArray(copy.b.c)) return 'массив превратился в объект — массивы нужно копировать как массивы'
            if (!isDeepStrictEqual(copy, src)) return fail(`deepClone(${show(src)})`, src, copy)
            if (copy === src || copy.b === src.b || copy.b.c === src.b.c || copy.b.c[2] === src.b.c[2]) {
                return 'вложенные объекты скопированы по ссылке — а нужно создать новые'
            }
        },
    },
    {
        name: 'deepEqual',
        cases: [
            [[1, 1], true],
            [[1, '1'], false],
            [[null, null], true],
            [[null, {}], false],
            [[{}, null], false],
            [[[], {}], false],
            [[{ a: 1 }, { a: 1 }], true],
            [[{ a: 1 }, { a: 2 }], false],
            [[{ a: 1 }, { a: 1, b: 2 }], false],
            [[{ a: 1, b: 2 }, { a: 1 }], false],
            [[[1, [2, 3]], [1, [2, 3]]], true],
            [[[1, [2, 3]], [1, [2, 4]]], false],
            [[{ a: { b: [1, { c: 'x' }] } }, { a: { b: [1, { c: 'x' }] } }], true],
            [[{ a: { b: [1, { c: 'x' }] } }, { a: { b: [1, { c: 'y' }] } }], false],
        ],
    },
    {
        name: 'fib',
        check(fib) {
            for (const [n, expected] of [[0, 0], [1, 1], [2, 1], [10, 55], [20, 6765]]) {
                const got = fib(n)
                if (got !== expected) return fail(`fib(${n})`, expected, got)
            }
            const start = performance.now()
            const got = fib(37)
            const ms = performance.now() - start
            if (got !== 24157817) return fail('fib(37)', 24157817, got)
            if (ms > 20) return `fib(37) считается ${Math.round(ms)} мс — слишком медленно. Добавь мемоизацию (запоминай уже посчитанные значения)`
            const big = fib(70)
            if (big !== 190392490709135) return fail('fib(70)', 190392490709135, big)
        },
    },
    {
        name: 'subsets',
        normalize: (result) => sortByJson(result.map((subset) => [...subset].sort())),
        cases: [one([], [[]]), one([1], [[], [1]]), one([1, 2, 3], [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])],
    },
    {
        name: 'permutations',
        normalize: sortByJson,
        cases: [
            one([], [[]]),
            one([1], [[1]]),
            one([1, 2, 3], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
        ],
    },
]

// функция, в теле которой только комментарии, считается ещё не начатой
const isStub = (fn) => /\{\s*\}$/.test(fn.toString().replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, ''))

function safe(fn) {
    try {
        return fn()
    } catch (err) {
        if (err instanceof RangeError && err.message.includes('call stack')) {
            return 'переполнение стека — нет базового случая, или рекурсия к нему не приближается'
        }
        return `ошибка: ${err.message}`
    }
}

function checkCases(fn, { name, cases, normalize = (x) => x }) {
    for (const [args, expected] of cases) {
        const call = `${name}(${args.map(show).join(', ')})`
        const got = fn(...structuredClone(args))
        const normalized = safe(() => normalize(got))
        if (!isDeepStrictEqual(normalized, normalize(expected))) return fail(call, expected, got)
    }
}

export function run(solutions) {
    let solved = 0
    tasks.forEach((task, i) => {
        const title = `${String(i + 1).padStart(2)}. ${task.name}`
        const fn = solutions[task.name]
        if (typeof fn !== 'function' || isStub(fn)) {
            console.log(`⬜ ${title}`)
            return
        }
        const error = safe(() => (task.check ? task.check(fn) : checkCases(fn, task)))
        if (error) {
            console.log(`❌ ${title} — ${error}`)
        } else {
            solved++
            console.log(`✅ ${title}`)
        }
    })
    console.log(`\nРешено: ${solved} из ${tasks.length}`)
}
