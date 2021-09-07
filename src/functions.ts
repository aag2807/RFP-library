import { Predicate, TwoArgFunc } from './utils/types'

const foreach = <T extends unknown>(
	arr: T[],
	func: (value?: any, index?: number) => any,
): void => {
	for (let i = 0; i < arr.length; i++) func(arr[i], i)
}

const foreachObject = <T extends unknown>(
	obj: T,
	func: (key?: any, value?: any) => any,
): void => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			func(prop, obj[prop])
		}
	}
}

const unless = (predicate: Predicate, fn: () => any): void => {
	if (!predicate) fn()
}

const times = (times: number, fn: (arg0?: any) => any): void => {
	for (let i = 0; i < times; i++) fn(i)
}

const every = <T extends unknown>(
	arr: T[],
	fn: (arg0?: any) => any,
): boolean => {
	let result = true
	for (const val of arr) {
		result = result && fn(val)
		if (result === false) return false
	}

	return result
}

const some = <T extends unknown>(arr: T[], fn: TwoArgFunc): boolean => {
	let result = false
	for (const val of arr) {
		result = result || fn(val)
		if (result === true) return true
	}
	return result
}

const sortBy = (property: string | number): TwoArgFunc => {
	return (a: any, b: any) => {
		let result =
			a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
		return result
	}
}

const unary = (fn: TwoArgFunc) => (fn.length === 1 ? fn : (arg: any) => fn(arg))

const once = (fn: TwoArgFunc) => {
	let done = false

	return function () {
		return done ? undefined : ((done = true), fn.apply(this, arguments))
	}
}

const memoized = (fn: any) => {
	const lookUpMap: any = {}
	return function (...arg: any) {
		let key = JSON.stringify(arguments)
		return lookUpMap[key] || (lookUpMap[key] = fn(...arg))
	}
}

function objectAssign(...args: any[]): any {
	let to: any = {}
	for (let i = 0; i < arguments.length; i += 1) {
		let from: any = arguments[i]
		let keys: any = Object.keys(from)
		for (let ii = 0; ii < keys.length; ii++) {
			to[keys[ii]] = from[keys[ii]]
		}
	}
	return to
}

const map = <T extends unknown>(arr: T[], fn: TwoArgFunc): T[] => {
	let result: T[] = []
	for (let i = 0; i < arr.length; i++) result.push(fn(arr[i], i))

	return result
}

const filter = <T extends unknown>(arr: T[], fn: TwoArgFunc): T[] => {
	let results: T[] = []
	for (let i = 0; i < arr.length; i++) {
		fn(arr[i]) ? results.push(arr[i]) : undefined
	}
	return results
}

const concatAll = <T extends unknown>(arr: T[], fn: TwoArgFunc): T[] => {
	let results: T[] = []
	for (const val of arr) results.push.apply(results, val)

	return results
}

const reduce = <T extends unknown>(
	arr: T[],
	fn: TwoArgFunc,
	initialValue: any,
): any => {
	let accumulator: T | typeof initialValue

	if (initialValue != undefined) accumulator = initialValue
	else accumulator = arr[0]

	if (initialValue === undefined)
		for (let i = 1; i < arr.length; i++) accumulator = fn(accumulator, arr[i])
	else for (const val of arr) accumulator = fn(accumulator, val)
	return accumulator
}

const zip = (leftArr: any[], rightArr: any[], fn: any) => {
	let index,
		results = []

	for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
		results.push(fn(leftArr[index], rightArr[index]))
	}
	return results
}

const tap = (val: any) =>
	(fn: any) => (
		typeof fn === 'function' && fn(val),
		console.log(val)
	)

const curry = (fn: TwoArgFunc) => {
	if (typeof fn !== 'function') {
		throw Error("No function provided")
	}
	return function curriedFn(...args: any[]) {
		if (args.length < fn.length) {
			return function () {
				return curriedFn.apply(null, args.concat([].slice.call(arguments)))
			}
		}
		return fn.apply(null, args)
	}
}

const partial = function (fn: TwoArgFunc, ...arg: any[]) {
	let args = arg;
	return function (...fullArgs: any[]) {
		let arg = 0;
		for (let i = 0; i < args.length; i++) {
			if (args[i] === undefined) {
				args[i] = fullArgs[arg++]
			}
		}
		return fn.apply(null, args)
	}
}

const compose = (...fns: any[]) => (value: any) => reduce(fns.reverse(), (acc, fn) => fn(acc), value)

const pipe = (...fns: any[]) => (value: any) => reduce(fns, (acc, fn) => fn(acc), value)

const identity = <T extends unknown>(it:T|T[]):T|T[] => {
	console.log(it)
	return it
}



export default {
	foreach,
	partial,
	pipe,
	foreachObject,
	unless,
	times,
	every,
	some,
	sortBy,
	tap,
	unary,
	once,
	memoized,
	objectAssign,
	map,
	filter,
	concatAll,
	reduce,
	zip,
	curry,
	compose,
	identity
}
