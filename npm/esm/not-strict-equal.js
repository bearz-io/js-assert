import { assert } from "./assert.js";
/**
 * Asserts that `actual` is not strictly equal to `expected`.
 *
 * @param actual The actual value to compare.
 * @param expected The expected value to compare.
 * @param msg The optional message to display if the assertion fails.
 * @example Usage
 * ```ts
 * import { notStrictEqual } from "@bearz/assert";
 *
 * notStrictEqual(1, 1); // Throws
 * notStrictEqual(1, 2); // Doesn't throw
 * ```
 */
export function notStrictEqual(actual, expected, msg) {
    return assert.notStrictEqual(actual, expected, msg);
}
