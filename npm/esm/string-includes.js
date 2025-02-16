import { assert } from "./assert.js";
/**
 * Asserts that `actual` string includes the `expected` substring value.
 *
 * @example Usage
 * ```ts
 * import { stringIncludes } from "@bearz/assert";
 *
 * arrayIncludes([1, 2, 3], 2); // Doesn't throw
 * arrayIncludes([1, 2, 3], 4); // Throws
 * ```
 *
 * @param actual The array to check
 * @param expected The value to check for.
 * @param msg The optional message to display if the assertion fails.
 * @returns
 */
export function stringIncludes(actual, expected, msg) {
    return assert.include(actual, expected, msg);
}
