import { describe, it, expect } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";
describe("hashPassword", () => {
    it("returns a hashed passowrd", async () => {
        const password = "password@123";
        expect(await hashPassword(password)).not.toBe(password);
        expect(await hashPassword(password)).toBeTypeOf("string");
    });
});
