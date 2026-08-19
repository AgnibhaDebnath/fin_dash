import { describe, expect, it, vi } from "vitest";

import { signupValidator } from "../../../src/modules/auth/auth.validator";
import { loginValidator } from "../../../src/modules/auth/auth.validator";
describe("signupValidator", () => {
    it("calls next for valid signup data", () => {
        const req = {
            body: {
                fullName: "Tunai",
                email: "agnibha@gmail.com",
                password: "Agni@2005",
            },
        };
        const res = {};
        const next = vi.fn();
        signupValidator(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("rejects an invalid full name", () => {
        const req = {
            body: {
                fullName: "T",
                email: "agnibha@gmail.com",
                password: "Agni@2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        signupValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
    it("rejects an invalid email", () => {
        const req = {
            body: {
                fullName: "Tunai",
                email: "agnibhagmail.com",
                password: "Agni@2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        signupValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
    it("rejects an invalid password", () => {
        const req = {
            body: {
                fullName: "Tunai",
                email: "agnibha@gmail.com",
                password: "Agni2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        signupValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
    it("rejects missing required fields", () => {
        const req = {
            body: {
                email: "agnibha@gmail.com",
                password: "Agni2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        signupValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("loginValidator", () => {
    it("calls next for valid login data", () => {
        const req = {
            body: {
                email: "agnibha@gmail.com",
                password: "Agni@2005",
            },
        };
        const res = {};
        const next = vi.fn();
        loginValidator(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("rejects an invalid email", () => {
        const req = {
            body: {
                email: "agnibhagmail.com",
                password: "Agni@2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        loginValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects an invalid password", () => {
        const req = {
            body: {
                email: "agnibha@gmail.com",
                password: "Agni2005",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        const next = vi.fn();
        loginValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects missing required fields", () => {
        const req = {
            body: {
                email: "agnibha@gmail.com",
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        loginValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});
