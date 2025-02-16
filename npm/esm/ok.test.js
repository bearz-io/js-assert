import { test } from "vitest";
import { ok } from "./ok.js";
test("assert::ok", () => {
    ok(true);
    ok(1);
    ok("1");
    function throws(fn, msg) {
        let threw = false;
        try {
            fn();
        } catch {
            threw = true;
        }
        if (!threw) {
            throw new Error(msg ?? "Expected function to throw");
        }
    }
    throws(() => ok(false), "Expected value to be truthy");
    throws(() => ok(0), "Expected value to be truthy");
    throws(() => ok(""), "Expected value to be truthy");
    throws(() => ok(null), "Expected value to be truthy");
    throws(() => ok(undefined), "Expected value to be truthy");
});
