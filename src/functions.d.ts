import { Predicate, TwoArgFunc } from './utils/types';
/**
 * @param arr - the array to be iterated
 * @param func - a function applied to every item
 */
declare const foreach: <T extends unknown>(arr: T[], func: (value?: any, index?: number) => any) => void;
/**
 * @param obj - object which keys and values will be iterated
 * @param func - a function applied to every value in the object
 */
declare const foreachObject: <T extends unknown>(obj: T, func: (key?: any, value?: any) => any) => void;
/**
 * @param predicate - a condition which when evaluated false if the code will execute
 * @param fn - the function to be executed if predicate is true
 */
declare const unless: (predicate: Predicate, fn: () => any) => void;
/**
 *
 * @param times - the amount of times the function passed will run
 * @param fn  - the function to be run n amount of times
 */
declare const times: (times: number, fn: TwoArgFunc) => void;
/**
 * takes an array and a function evaluates every item in the function and if all items m eet the condition
 * @param arr - array which will be evaluated
 * @param fn  - function which will evauluated every item of the array is true
 * @returns boolean
 */
declare const every: <T extends unknown>(arr: T[], fn: (arg0?: any) => any) => boolean;
/**
 * takes an array and a function evaluates every item in the function and if some items meet the condition
 * @param arr - array which will be evaluated
 * @param fn  - function which will evauluated every item of the array is true
 * @returns boolean
 */
declare const some: <T extends unknown>(arr: T[], fn: TwoArgFunc) => boolean;
declare const sortBy: (property: string | number) => TwoArgFunc;
declare const unary: (fn: TwoArgFunc) => TwoArgFunc;
declare const once: (fn: TwoArgFunc) => () => any;
declare const memoized: (fn: any) => (...arg: any) => any;
declare function objectAssign(...args: any[]): any;
declare const map: <T extends unknown>(arr: T[], fn: TwoArgFunc) => T[];
declare const filter: <T extends unknown>(arr: T[], fn: TwoArgFunc) => T[];
declare const concatAll: <T extends unknown>(arr: T[], fn: TwoArgFunc) => T[];
declare const reduce: <T extends unknown>(arr: T[], fn: TwoArgFunc, initialValue: any) => any;
declare const zip: (leftArr: any[], rightArr: any[], fn: any) => any[];
declare const tap: (val: any) => (fn: any) => void;
declare const curry: (fn: TwoArgFunc) => (...args: any[]) => any;
declare const partial: (fn: TwoArgFunc, ...arg: any[]) => (...fullArgs: any[]) => any;
declare const compose: (...fns: any[]) => (value: any) => any;
declare const pipe: (...fns: any[]) => (value: any) => any;
declare const identity: <T extends unknown>(it: T | T[]) => T | T[];
export { foreach, partial, pipe, foreachObject, unless, times, every, some, sortBy, tap, unary, once, memoized, objectAssign, map, filter, concatAll, reduce, zip, curry, compose, identity };
