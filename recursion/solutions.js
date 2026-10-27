// Решения к practice.js. Запуск: node recursion/solutions.js
// У каждой функции помечено: что базовый случай, а что шаг.

import { run } from './tests.js'

// ───────────── Уровень 1 ─────────────

function sumTo(n) {
    if (n === 1) return 1      // база
    return n + sumTo(n - 1)    // шаг: n + сумма всех меньших
}

function factorial(n) {
    if (n <= 1) return 1
    return n * factorial(n - 1)
}

// Наивно: base * pow(base, exp - 1) — exp вызовов.
// Так быстрее: степень делится пополам, вызовов ~log2(exp).
function pow(base, exp) {
    if (exp === 0) return 1
    const half = pow(base, Math.floor(exp / 2))
    return exp % 2 === 0 ? half * half : half * half * base
}

function sumDigits(n) {
    if (n < 10) return n                             // одна цифра
    return (n % 10) + sumDigits(Math.floor(n / 10))  // последняя цифра + остальные
}

// ───────────── Уровень 2 ─────────────

// slice копирует массив на каждом шаге. Без копий — через индекс:
// function sumArray(arr, i = 0) { return i === arr.length ? 0 : arr[i] + sumArray(arr, i + 1) }
function sumArray(arr) {
    if (arr.length === 0) return 0
    return arr[0] + sumArray(arr.slice(1))
}

function reverse(str) {
    if (str.length <= 1) return str
    return reverse(str.slice(1)) + str[0]  // развёрнутый хвост + первый символ в конец
}

function isPalindrome(str) {
    if (str.length <= 1) return true
    if (str[0] !== str[str.length - 1]) return false
    return isPalindrome(str.slice(1, -1))  // крайние совпали — проверяем середину
}

// ───────────── Уровень 3 ─────────────

function flatten(arr) {
    const result = []
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item))  // массив — пусть его разложит рекурсия
        } else {
            result.push(item)              // не массив — база, просто кладём
        }
    }
    return result
}

function depth(value) {
    if (!Array.isArray(value)) return 0
    return 1 + Math.max(0, ...value.map(depth))  // 0 — на случай пустого массива
}

// База неявная: у листа children пустой, цикл не выполнится
function treeSum(node) {
    let sum = node.value
    for (const child of node.children) {
        sum += treeSum(child)
    }
    return sum
}

function deepClone(value) {
    if (value === null || typeof value !== 'object') return value  // примитив — копировать нечего
    if (Array.isArray(value)) return value.map(deepClone)
    const copy = {}
    for (const key of Object.keys(value)) {
        copy[key] = deepClone(value[key])
    }
    return copy
}

function deepEqual(a, b) {
    if (a === b) return true
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
    if (Array.isArray(a) !== Array.isArray(b)) return false
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]))
}

// ───────────── Уровень 4 ─────────────

// Без memo fib(40) делает ~330 млн вызовов, с memo — ~80
function fib(n, memo = {}) {
    if (n <= 1) return n
    if (n in memo) return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
}

// Подмножества без первого элемента + те же самые, но с ним
function subsets(arr) {
    if (arr.length === 0) return [[]]
    const [first, ...rest] = arr
    const withoutFirst = subsets(rest)
    const withFirst = withoutFirst.map((subset) => [first, ...subset])
    return [...withoutFirst, ...withFirst]
}

// Каждый элемент по очереди ставим первым, к нему — все перестановки остальных
function permutations(arr) {
    if (arr.length === 0) return [[]]
    const result = []
    arr.forEach((item, i) => {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
        for (const perm of permutations(rest)) {
            result.push([item, ...perm])
        }
    })
    return result
}

run({
    sumTo, factorial, pow, sumDigits,
    sumArray, reverse, isPalindrome,
    flatten, depth, treeSum, deepClone, deepEqual,
    fib, subsets, permutations,
})
