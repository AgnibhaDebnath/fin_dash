import { describe, expect, it, vi } from "vitest";
import User from "../../../src/modules/auth/user.model.js";
import { loginService, signupService } from "../../../src/modules/auth/auth.service.js";
import * as hashPasswordUtil from "../../../src/utils/hashPassword.js";
import * as jwt from "../../../src/utils/jwt.js";

import * as comparePasswordUtil from "../../../src/utils/comparePassword.js";
describe("signUpService", () => {
    const userData = {
        fullName: "Agnibha",
        email: "agnibha@gmail.com",
        password: "test@123",
    };

    it("creates a new user and returns a token", async () => {
        vi.spyOn(User, "findOne").mockResolvedValue(null);
        vi.spyOn(hashPasswordUtil, "hashPassword").mockResolvedValue("hashed-password");

        vi.spyOn(User, "create").mockResolvedValue({
            _id: "user@001",
            fullName: "Agnibha",
            email: "agnibha@gmail.com",
            password: "hashed-password",
        });
        vi.spyOn(jwt, "generateToken").mockReturnValue("fake-jwt-token");

        const result = await signupService(userData);
        expect(hashPasswordUtil.hashPassword).toHaveBeenCalledWith(userData.password);
        expect(User.create).toHaveBeenCalled();
        expect(jwt.generateToken).toHaveBeenCalled();
        expect(result.token).toBe("fake-jwt-token");
    });

    it("returns false when the user already exists", async () => {
        vi.spyOn(User, "findOne").mockResolvedValue({
            _id: "user@001",
            fullName: "Agnibha",
            email: "agnibha@gmail.com",
            password: "hashed-password",
        });
        const result = await signupService(userData);
        expect(result.success).toBe(false);
    });
});

describe("loginService", () => {
    const userData = {
        email: "test@gmail.com",
        password: "test@123",
    };
    it("returns false when the user is not found", async () => {
        vi.spyOn(User, "findOne").mockResolvedValue(null);
        const result = await loginService(userData);
        expect(result.success).toBe(false);
    });

    it("returns false when the password is incorrect", async () => {
        vi.spyOn(User, "findOne").mockResolvedValue({
            _id: "user@002",
            fullName: "Tunai",
            email: "test@gmail.com",
            password: "hashed-password",
        });
        vi.spyOn(comparePasswordUtil, "comparePassword").mockResolvedValue(false);
        const result = await loginService(userData);
        expect(result.success).toBe(false);
    });

    it("returns a token when the email and password are correct", async () => {
        vi.spyOn(User, "findOne").mockResolvedValue({
            _id: "user@002",
            fullName: "Tunai",
            email: "test@gmail.com",
            password: "hashed-password",
        });

        vi.spyOn(comparePasswordUtil, "comparePassword").mockResolvedValue(true);
        vi.spyOn(jwt, "generateToken").mockReturnValue("fake-jwt-token");
        const result = await loginService(userData);
        expect(result.token).toBe("fake-jwt-token");
    });
});
