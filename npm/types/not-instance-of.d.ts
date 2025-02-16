/**
 * Asserts that `value` is not an instance of `constructor`.
 *
 * @param value The value to check
 * @param constructor The constructor to check against
 * @param msg The optional message to display if the assertion fails.
 */
export declare function notInstanceOf<T>(
    value: unknown,
    constructor: new (...args: any[]) => T,
    msg?: string,
): void;
