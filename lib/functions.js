"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = exports.compose = exports.curry = exports.zip = exports.reduce = exports.concatAll = exports.filter = exports.map = exports.objectAssign = exports.memoized = exports.once = exports.unary = exports.tap = exports.sortBy = exports.some = exports.every = exports.times = exports.unless = exports.foreachObject = exports.pipe = exports.partial = exports.foreach = void 0;
var helpers_1 = require("./utils/helpers");
var groupBy = function (target, fn) {
    fn = (0, helpers_1.pick)(fn);
    return target
        .map(function (val) { return ({ val: val, key: fn(val) }); })
        .reduce(function (c, a) {
        c[a.key] = c[a.key] || [];
        c[a.key].push(a.val);
        return c;
    }, {});
};
var keyBy = function (target, fn) {
    fn = (0, helpers_1.pick)(fn);
    return target
        .map(function (val) { return ({ val: val, key: fn(val) }); })
        .reduce(function (c, a) {
        c[a.key] = a.val;
        return c;
    }, {});
};
/**
 * @param target - T
 * @param prop  - String
 * @returns an array of the keys without the one to be omiited
 */
var omit = function (target, prop) { return Object.entries(target).filter(function (_a) {
    var key = _a[0];
    return !prop.includes(key);
}); };
var uniqBy = function (target, fn) {
    fn = (0, helpers_1.pick)(fn);
    var dedupe = new Set();
    return target
        .filter(function (v) {
        var k = fn(v);
        if (dedupe.has(k))
            return false;
        dedupe.add(k);
        return true;
    });
};
/**
 * @param arr - the array to be iterated
 * @param func - a function applied to every item
 */
var foreach = function (arr, func) {
    for (var i = 0; i < arr.length; i++)
        func(arr[i], i);
};
exports.foreach = foreach;
/**
 * @param obj - object which keys and values will be iterated
 * @param func - a function applied to every value in the object
 */
var foreachObject = function (obj, func) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            func(prop, obj[prop]);
        }
    }
};
exports.foreachObject = foreachObject;
/**
 * @param predicate - a condition which when evaluated false if the code will execute
 * @param fn - the function to be executed if predicate is true
 */
var unless = function (predicate, fn) {
    if (!predicate)
        fn();
};
exports.unless = unless;
/**
 *
 * @param times - the amount of times the function passed will run
 * @param fn  - the function to be run n amount of times
 */
var times = function (times, fn) {
    for (var i = 0; i < times; i++)
        fn(i);
};
exports.times = times;
/**
 * takes an array and a function evaluates every item in the function and if all items m eet the condition
 * @param arr - array which will be evaluated
 * @param fn  - function which will evauluated every item of the array is true
 * @returns boolean
 */
var every = function (arr, fn) {
    var result = true;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var val = arr_1[_i];
        result = result && fn(val);
        if (result === false)
            return false;
    }
    return result;
};
exports.every = every;
/**
 * takes an array and a function evaluates every item in the function and if some items meet the condition
 * @param arr - array which will be evaluated
 * @param fn  - function which will evauluated every item of the array is true
 * @returns boolean
 */
var some = function (arr, fn) {
    var result = false;
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var val = arr_2[_i];
        result = result || fn(val);
        if (result === true)
            return true;
    }
    return result;
};
exports.some = some;
var sortBy = function (property) {
    return function (a, b) {
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result;
    };
};
exports.sortBy = sortBy;
var unary = function (fn) { return (fn.length === 1 ? fn : function (arg) { return fn(arg); }); };
exports.unary = unary;
var once = function (fn) {
    var done = false;
    return function () {
        return done ? undefined : ((done = true), fn.apply(this, arguments));
    };
};
exports.once = once;
var memoized = function (fn) {
    var lookUpMap = {};
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var key = JSON.stringify(arguments);
        return lookUpMap[key] || (lookUpMap[key] = fn.apply(void 0, arg));
    };
};
exports.memoized = memoized;
function objectAssign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var to = {};
    for (var i = 0; i < arguments.length; i += 1) {
        var from = arguments[i];
        var keys = Object.keys(from);
        for (var ii = 0; ii < keys.length; ii++) {
            to[keys[ii]] = from[keys[ii]];
        }
    }
    return to;
}
exports.objectAssign = objectAssign;
var map = function (arr, fn) {
    var result = [];
    for (var i = 0; i < arr.length; i++)
        result.push(fn(arr[i], i));
    return result;
};
exports.map = map;
var filter = function (arr, fn) {
    var results = [];
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i]) ? results.push(arr[i]) : undefined;
    }
    return results;
};
exports.filter = filter;
var concatAll = function (arr, fn) {
    var results = [];
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var val = arr_3[_i];
        results.push.apply(results, val);
    }
    return results;
};
exports.concatAll = concatAll;
var reduce = function (arr, fn, initialValue) {
    var accumulator;
    if (initialValue != undefined)
        accumulator = initialValue;
    else
        accumulator = arr[0];
    if (initialValue === undefined)
        for (var i = 1; i < arr.length; i++)
            accumulator = fn(accumulator, arr[i]);
    else
        for (var _i = 0, arr_4 = arr; _i < arr_4.length; _i++) {
            var val = arr_4[_i];
            accumulator = fn(accumulator, val);
        }
    return accumulator;
};
exports.reduce = reduce;
var zip = function (leftArr, rightArr, fn) {
    var index, results = [];
    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
        results.push(fn(leftArr[index], rightArr[index]));
    }
    return results;
};
exports.zip = zip;
var tap = function (val) {
    return function (fn) { return (typeof fn === 'function' && fn(val),
        console.log(val)); };
};
exports.tap = tap;
var curry = function (fn) {
    if (typeof fn !== 'function') {
        throw Error("No function provided");
    }
    return function curriedFn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < fn.length) {
            return function () {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)));
            };
        }
        return fn.apply(null, args);
    };
};
exports.curry = curry;
var partial = function (fn) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    var args = arg;
    return function () {
        var fullArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fullArgs[_i] = arguments[_i];
        }
        var arg = 0;
        for (var i = 0; i < args.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArgs[arg++];
            }
        }
        return fn.apply(null, args);
    };
};
exports.partial = partial;
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (value) { return reduce(fns.reverse(), function (acc, fn) { return fn(acc); }, value); };
};
exports.compose = compose;
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (value) { return reduce(fns, function (acc, fn) { return fn(acc); }, value); };
};
exports.pipe = pipe;
var identity = function (it) {
    console.log(it);
    return it;
};
exports.identity = identity;
//# sourceMappingURL=functions.js.map