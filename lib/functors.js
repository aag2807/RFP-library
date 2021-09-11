"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nothing = exports.Some = exports.Maybe = exports.Container = void 0;
/**
 * @param val - of type any which is the associated value with the functor
 */
var Container = function (val) {
    this.value = val;
};
exports.Container = Container;
/**
 * of function creates a new Container(functor) of type val
 * @param val - the value returned by the newly created functor.
 * @returns new Container of type val
 */
Container.of = function (val) {
    return new Container(val);
};
/**
 * map returns a new container with the value after being passed by the passed function.
 * @param fn - the function passed to used to transform and return a new Container of said type
 */
Container.prototype.map = function (fn) {
    return Container.of(fn(this.value));
};
/**
 * @param val - of type any which is the associated value with the functor
 */
var Maybe = function (val) {
    this.value = val;
};
exports.Maybe = Maybe;
/**
 * of function creates a new Maybe(functor) of type val
 * @param val - the value returned by the newly created functor.
 * @returns new Container of type val
 */
Maybe.of = function (val) {
    return new Maybe(val);
};
/**
 * isNothing verifies that the current value is not null or undefined and returns a boolean
 * @param void
 * @returns boolean
 */
Maybe.prototype.isNothing = function () {
    return this.value === null || this.value === undefined;
};
/**
 *  map first calls isNothing method and verifies it has a value,
 * if it has a value it returns new Maybe with the value after being passed by the passed function.
 * if it does not have a value returns a Maybe of null.
 * @param fn - the function passed to used to transform and return a new Maybe of said type
 * @returns Maybe(value:null) || Maybe(value:this.value)
 */
Maybe.prototype.map = function (fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
};
/**
 * first calls isNothing method and verifies it has a value,
 * if it has a value it returns the value of the maybe else,
 * if it does not have a value returns a Maybe of null.
 * used to join nested Maybe
 * @returns Maybe(value:null) ||this.value
 */
Maybe.prototype.join = function () {
    return this.isNothing() ? Maybe.of(null) : this.value;
};
/**
 * chain calls map internally with a function passed as an argument
 * and then applies join
 * @param f - function which is applied to a map calle
 */
Maybe.prototype.chain = function (f) {
    return this.map(f).join();
};
/**
 * @param val - of type any which is the associated value with the functor
 */
var Nothing = function (val) {
    this.value = val;
};
exports.Nothing = Nothing;
/**
 * of function creates a new Maybe(functor) of type val
 * @param val - the value returned by the newly created functor.
 * @returns Maybe of type val
 */
Nothing.of = function (val) {
    return new Maybe(val);
};
/**
 * the map function returns itself
 * @param fn -  a function which is never called
 *  @returns this
 */
Nothing.prototype.map = function (fn) {
    return this;
};
/**
 * @param val - of type any which is the associated value with the functor
 */
var Some = function (val) {
    this.value = val;
};
exports.Some = Some;
/**
 * of function creates a new Some(functor) of type val
 * @param val - the value returned by the newly created functor.
 * @returns new Some of type val
 */
Some.of = function (val) {
    return new Some(val);
};
/**
 * map returns a new Some with the value after being passed by the passed function.
 * @param fn - the function passed to used to transform and return a new Container of said type
 * @returns Some
 */
Some.prototype.map = function (fn) {
    return Some.of(fn(this.value));
};
//# sourceMappingURL=functors.js.map