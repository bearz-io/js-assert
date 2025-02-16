import { assert } from "./assert.js";
/**
 * Asserts that `value` is an instance of `constructor`.
 *
 * @param value The value to check
 * @param constructor The constructor to check against
 * @param msg The optional message to display if the assertion fails.
 */
export function instanceOf(
    value,
    // deno-lint-ignore no-explicit-any
    constructor,
    msg,
) {
    return assert.instanceOf(value, constructor, msg);
}
