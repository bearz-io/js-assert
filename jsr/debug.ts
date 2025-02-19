const g = globalThis as {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
};

let debugTests = false;

if (g.DEBUG_TESTS) {
    debugTests = true;
}

if (g.process && g.process.env && g.process.env.DEBUG_TESTS) {
    debugTests = true;
}

/**
 * Sets the debug output for tests.
 * @param value Set to true to enable debug output for tests.
 */
export function setDebugTests(value: boolean): void {
    debugTests = value;
}

/**
 * Determines whether debug output for tests is enabled.
 * @returns Whether debug output for tests is enabled.
 */
export function isDebugTests(): boolean {
    return debugTests;
}

/**
 * Writes debug output for tests using `console.log`.
 * @param args The arguments to output.
 */
export function debug(...args: unknown[]): void {
    if (debugTests) {
        console.log(...args);
    }
}
