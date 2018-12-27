"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function toBoolean(observableInput) {
    return rxjs_1.from(observableInput).pipe(operators_1.mapTo(true), operators_1.catchError(() => rxjs_1.of(false)));
}
exports.toBoolean = toBoolean;
