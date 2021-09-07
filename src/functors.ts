const Container = function (val: any): void {
    this.value = val;
};

Container.of = function (val: any) {
    return new Container(val);
};

Container.prototype.map = function (fn: any) {
    return Container.of(fn(this.value));
};

const Maybe = function (val: any): void {
    this.value = val;
};

Maybe.of = function (val: any) {
    return new Maybe(val);
};

Maybe.prototype.isNothing = function () {
    return this.value === null || this.value === undefined;
};

Maybe.prototype.map = function (fn: any) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
};


Maybe.prototype.join = function(){
    return this.isNothing() ? Maybe.of(null) : this.value;
}

Maybe.prototype.chain = function(f){
    return this.map(f).join()
}


const Nothing = function (val: any): void {
    this.value = val;
};

Nothing.of = function (val: any) {
    return new Maybe(val);
};

Nothing.prototype.map = function (fn: any) {
    return this;
};

const Some = function (val) {
    this.value = val
}

Some.of = function (val) {
    return new Some(val)
}

Some.prototype.map = function (fn) {
    return Some.of(fn(this.value))
}


const Either = {
    Some,
    Nothing
}

export { Container, Maybe, Either, Some, Nothing };
