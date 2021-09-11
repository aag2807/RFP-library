"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.get = void 0;
var get = function (object, path, defaultValue) {
    var parts = path.split('.');
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (!object)
            return defaultValue;
        object = object[part];
    }
    return object !== null && object !== void 0 ? object : defaultValue;
};
exports.get = get;
var pick = function (fn) { return typeof fn === "string" ? function (v) { return get(v, fn); } : fn; };
exports.pick = pick;
//# sourceMappingURL=helpers.js.map