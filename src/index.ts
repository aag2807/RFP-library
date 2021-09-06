import { Predicate, TwoArgFunc } from "./utils/types";

const foreach = <T extends unknown>(arr: T[], func: (value?: any, index?: number) => any): void => {
	for (let i = 0; i < arr.length; i++)
		func(arr[i], i);
}

const foreachObject = <T extends unknown>(obj: T, func: (key?: any, value?: any) => any): void => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			func(prop, obj[prop])
		}
	}
}

const unless = (predicate: Predicate, fn: () => any): void => {
	if (!predicate)
		fn();
}

const times = (times: number, fn: (arg0?: any) => any): void => {
	for (let i = 0; i < times; i++)
		fn(i)
}

const every = <T extends unknown>(arr: T[], fn: (arg0?: any) => any): boolean => {
	let result = true;
	for (const val of arr) {
		result = result && fn(val)
		if (result === false) return false;
	}

	return result
}

const some = <T extends unknown>(arr: T[], fn: TwoArgFunc): boolean => {
	let result = false;
	for (const val of arr) {
		result = result || fn(val)
		if (result === true) return true;
	}
	return result
}

const sortBy = (property: string | number): TwoArgFunc => {
	return (a: any, b: any) => {
		let result = (a[property] < b[property]) ? -1 :
			(a[property] > b[property]) ? 1 : 0
		return result
	}
}

const tap = (val: any) =>
	(fn: any) => (
		typeof fn === 'function' && fn(val),
		console.log(val)
	)

const unary = (fn: TwoArgFunc) => fn.length === 1 ? fn : (arg: any) => fn(arg);

const once = (fn: TwoArgFunc) => {
	let done = false;

	return function () {
		return done ? undefined : ((done = true), fn.apply(this, arguments))
	}
}

const memoized = (fn: any) => {
	const lookUpMap: any = {};
	return function (...arg: any) {
		let key = JSON.stringify(arguments)
		return lookUpMap[key] || (lookUpMap[key] = fn(...arg));
	}
}

function objectAssign(...args:any[]): any {
	let to: any = {}
	for (let i = 0; i < arguments.length; i+=1) {
		let from: any = arguments[i]
		let keys: any = Object.keys(from);
		for (let ii = 0; ii < keys.length; ii++) {
			to[keys[ii]] = from[keys[ii]]
		}
	}
	return to;
}
let a = {name:'Alvaro'}
let b = {age:24}
let c = {profesion: 'Developer'}

console.log(objectAssign(a,b,c))


export default { foreach, foreachObject, unless, times, every, some, sortBy, tap, unary }