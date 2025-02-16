import { assert } from "./assert.js";
export function arrayIncludes() {
    switch (arguments.length) {
        case 2:
            {
                const actual = arguments[0];
                const expected = arguments[1];
                if (Array.isArray(expected)) {
                    assert.includeDeepMembers(actual, expected);
                } else {
                    assert.include(actual, expected);
                }
            }
            break;
        case 3:
            {
                const actual = arguments[0];
                const expected = arguments[1];
                const msg = arguments[2];
                if (Array.isArray(expected)) {
                    assert.includeDeepMembers(actual, expected, msg);
                } else {
                    assert.include(actual, expected, msg);
                }
            }
            break;
        default:
            throw new Error("arrayIncludes() expects either 2 or 3 arguments");
    }
}
