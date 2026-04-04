const test = require("node:test");
const assert = require("node:assert/strict");
const ExpressError = require("../utils/expresserror.js");

test("ExpressError stores statusCode and message", () => {
    const err = new ExpressError(400, "Bad Request");

    assert.equal(err.statusCode, 400);
    assert.equal(err.message, "Bad Request");
    assert.ok(err instanceof Error);
});
