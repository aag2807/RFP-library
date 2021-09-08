/**
 * @param val - of type any which is the associated value with the functor
 */
declare const Container: {
    (val: any): void;
    /**
     * of function creates a new Container(functor) of type val
     * @param val - the value returned by the newly created functor.
     * @returns new Container of type val
     */
    of(val: any): any;
};
/**
 * @param val - of type any which is the associated value with the functor
 */
declare const Maybe: {
    (val: any): void;
    /**
     * of function creates a new Maybe(functor) of type val
     * @param val - the value returned by the newly created functor.
     * @returns new Container of type val
     */
    of(val: any): any;
};
/**
 * @param val - of type any which is the associated value with the functor
 */
declare const Nothing: {
    (val: any): void;
    /**
     * of function creates a new Maybe(functor) of type val
     * @param val - the value returned by the newly created functor.
     * @returns Maybe of type val
     */
    of(val: any): any;
};
/**
 * @param val - of type any which is the associated value with the functor
 */
declare const Some: {
    (val: any): void;
    /**
     * of function creates a new Some(functor) of type val
     * @param val - the value returned by the newly created functor.
     * @returns new Some of type val
     */
    of(val: any): any;
};
export { Container, Maybe, Some, Nothing };
