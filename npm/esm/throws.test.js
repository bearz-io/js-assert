// Copyright 2018-2025 the Deno authors. MIT license.
import "./_dnt.test_polyfills.js";
import { test } from "@bearz/testing";
import { AssertionError, equal, fail, throws, truthy } from "./mod.js";
test("assertThrows() throws when thrown error class does not match expected", () => {
    throws(
        () => {
            //This next assertThrows will throw an AssertionError due to the wrong
            //expected error class
            throws(
                () => {
                    fail("foo");
                },
                TypeError,
                "Failed assertion: foo",
            );
        },
        AssertionError,
        `Expected error to be instance of "TypeError", but was "AssertionError"`,
    );
});
test("assertThrows() changes its return type by parameter", () => {
    throws(() => {
        throw new Error();
    });
});
test("assertThrows() throws when error class is expected but non-error value is thrown", () => {
    throws(
        () => {
            throws(
                () => {
                    throw "Panic!";
                },
                Error,
                "Panic!",
            );
        },
        AssertionError,
        "A non-Error object was thrown.",
    );
});
test("assertThrows() matches thrown non-error value", () => {
    throws(() => {
        throw "Panic!";
    });
    throws(() => {
        throw null;
    });
    throws(() => {
        throw undefined;
    });
});
test("assertThrows() matches thrown error with given error class", () => {
    throws(
        () => {
            throw new Error("foo");
        },
        Error,
        "foo",
    );
});
test("assertThrows() matches and returns thrown error value", () => {
    const error = throws(() => {
        throw new Error("foo");
    });
    truthy(error instanceof Error);
    equal(error.message, "foo");
});
test("assertThrows() matches and returns thrown non-error", () => {
    const stringError = throws(() => {
        throw "Panic!";
    });
    truthy(typeof stringError === "string");
    equal(stringError, "Panic!");
    const numberError = throws(() => {
        throw 1;
    });
    truthy(typeof numberError === "number");
    equal(numberError, 1);
    const nullError = throws(() => {
        throw null;
    });
    truthy(nullError === null);
    const undefinedError = throws(() => {
        throw undefined;
    });
    truthy(typeof undefinedError === "undefined");
    equal(undefinedError, undefined);
});
test("assertThrows() matches subclass of expected error", () => {
    throws(
        () => {
            throw new AssertionError("Fail!");
        },
        Error,
        "Fail!",
    );
});
test("assertThrows() accepts abstract class", () => {
    class AbstractError extends Error {
    }
    class ConcreteError extends AbstractError {
    }
    throws(
        () => {
            throw new ConcreteError("failed");
        },
        AbstractError,
        "fail",
    );
});
test("assertThrows() throws when input function does not throw", () => {
    throws(
        () => {
            throws(() => {});
        },
        AssertionError,
        "Expected function to throw.",
    );
});
test("assertThrows() throws with custom message", () => {
    throws(
        () => {
            throws(() => {}, "CUSTOM MESSAGE");
        },
        AssertionError,
        "Expected function to throw: CUSTOM MESSAGE",
    );
});
test("assertThrows() throws with custom message and no error class", () => {
    throws(
        () => {
            // @ts-expect-error testing invalid input
            throws(() => {}, null, "CUSTOM MESSAGE");
        },
        AssertionError,
        "Expected function to throw: CUSTOM MESSAGE",
    );
});
