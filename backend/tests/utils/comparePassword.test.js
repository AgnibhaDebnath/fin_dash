import { describe, expect, it } from "vitest";
import bcrypt from "bcrypt";
import { comparePassword } from "../../src/utils/comparePassword.js";
describe("comparePassword", () => {
    it("returns true when the password matches with hash", async () => {
        const plainPassword = "password@123";
        const hashPassword = await bcrypt.hash(plainPassword, 10);

        const result = await comparePassword(plainPassword, hashPassword);
        expect(result).toBe(true);
    });

    it("returns false when the password do not match with hash", async () => {
        const plainPassword = "password@123";
        const hashPassword = await bcrypt.hash(plainPassword, 10);

        const result = await comparePassword("password#1234", hashPassword);

        expect(result).toBe(false);
    });
});
