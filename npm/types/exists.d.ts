/**
 * Asserts that `value` is not `null` or `undefined`.
 * @param value The value to check
 * @param msg The optional message to display if the assertion fails.
 */
export declare function exists<T>(value: T, msg?: string): asserts value is NonNullable<T>;
