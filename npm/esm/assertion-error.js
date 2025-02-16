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
export class AssertionError extends Error {
    /**
     * Creates a new instance of `AssertionError`.
     *
     * @param message - The error message.
     * @param options - The options for the error.
     */
    constructor(message, options) {
        super(message, options);
        this.name = "AssertionError";
        this.link = options?.link ?? "https://jsr.io/@bearz/assert/docs/assert-error";
        this.target = options?.target;
    }
    static is(e) {
        return e instanceof AssertionError || e instanceof Error && e.name === "AssertionError";
    }
    /**
     * The target of the assertion.
     */
    target;
    /**
     * A link to the documentation for the assertion.
     */
    link;
}
