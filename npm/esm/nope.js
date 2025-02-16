import { assert } from "./assert.js";
/**
 * Asserts that `value` is falsy.
 * @param value The value to check
 * @param msg The optional message to display if the assertion fails.
 */
export function nope(value, msg) {
    return assert.notOk(value, msg);
}
/**
 * Asserts that `value` is falsy.
 * @param value The value to check
 * @param msg The optional message to display if the assertion fails.
 * @returns void
 */
export function notOk(value, msg) {
    return assert.notOk(value, msg);
}
