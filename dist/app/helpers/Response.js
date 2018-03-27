"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = (_module$exports = {
    returnSuccess: function returnSuccess(message, data) {
        return {
            message: message,
            data: data
        };
    }
}, _defineProperty(_module$exports, "returnSuccess", function returnSuccess(data) {
    return {
        data: data
    };
}), _defineProperty(_module$exports, "render", function render(res, path) {
    return res.status(200).render(path);
}), _defineProperty(_module$exports, "returnError", function returnError(message, code) {
    return {
        error: {
            message: message,
            code: code
        }
    };
}), _module$exports);