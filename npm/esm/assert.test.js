import { test } from "vitest";
import { assert } from "./assert.js";
test("assert::assert", () => {
    let throws = false;
    try {
        assert(false, "true is false");
    } catch (e) {
        throws = true;
        if (!(e instanceof Error)) {
            throw new Error("Expected an error to be thrown");
        }
        if (e.message !== "true is false") {
            throw new Error("Expected the error message to be 'true is false'");
        }
    }
    if (!throws) {
        throw new Error("assert(false) should throw an error");
    }
    assert(true, "true is true");
});
