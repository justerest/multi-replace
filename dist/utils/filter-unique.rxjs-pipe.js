"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
/**
 * RxJs pipable operator.
 */
function filterUnique(fn = (data) => data) {
    const cache = new Set();
    return operators_1.filter((data) => {
        const value = fn(data);
        if (!cache.has(value)) {
            cache.add(value);
            return true;
        }
        return false;
    });
}
exports.filterUnique = filterUnique;
