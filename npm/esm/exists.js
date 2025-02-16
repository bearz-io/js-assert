import { assert } from "./assert.js";
/**
 * Asserts that `value` is not `null` or `undefined`.
 * @param value The value to check
 * @param msg The optional message to display if the assertion fails.
 */
export function exists(value, msg) {
    return assert.exists(value, msg);
}
