import { assert } from "./assert.js";
/**
 * Asserts that `value` is truthy.
 * @param value The value to check
 * @param msg The optional message to display if the assertion fails.
 */
export function ok(value, msg) {
    return assert.ok(value, msg);
}
