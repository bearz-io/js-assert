/**
 * Options for the AssertionError class.
 * @see {@link AssertionError}
 */
export interface AssertionErrorOptions extends ErrorOptions {
    /**
     * The target of the assertion.
     */
    target?: unknown;
    /**
     * A link to the documentation for the assertion.
     */
    link?: string;
}
/**
 * Represents an assertion error with additional context.
 *
 * @remarks
 * This class extends the built-in `Error` class to provide additional
 * information about assertion errors, including a link to documentation
 * and an optional target related to the error.
 *
 * @example
 * ```typescript
 * import { AssertionError } from "@bearz/assert";
 *
 * throw new AssertionError("Assertion failed", { link: "https://example.com/docs", target: someObject });
 * ```
 *
 * @public
 */
export declare class AssertionError extends Error {
    /**
     * Creates a new instance of `AssertionError`.
     *
     * @param message - The error message.
     * @param options - The options for the error.
     */
    constructor(message: string, options?: AssertionErrorOptions);
    static is(e: unknown): e is AssertionError;
    /**
     * The target of the assertion.
     */
    target?: unknown;
    /**
     * A link to the documentation for the assertion.
     */
    link?: string;
}
