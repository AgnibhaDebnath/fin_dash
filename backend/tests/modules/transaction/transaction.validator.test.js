import { describe, expect, it, vi } from "vitest";
import transactionFormValidator from "../../../src/modules/transaction/transaction.validator";

describe("transactionFormValidator", () => {
    it("calls next for valid transaction data", () => {
        const req = {
            body: {
                title: "Fuchka",
                type: "expense",
                category: "food",
                amount: 20,
                date: new Date(),
            },
        };
        const res = {};
        const next = vi.fn();
        transactionFormValidator(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("rejects transaction with invalid title", () => {
        const req = {
            body: {
                title: "",
                type: "expense",
                category: "food",
                amount: 20,
                date: new Date(),
            },
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        transactionFormValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects transaction with invalid type", () => {
        const req = {
            body: {
                title: "Fuchka",
                type: "spending",
                category: "food",
                amount: 20,
                date: new Date(),
            },
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        transactionFormValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects transaction with invalid category", () => {
        const req = {
            body: {
                title: "Fuchka",
                type: "expense",
                category: "fast food",
                amount: 20,
                date: new Date(),
            },
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        transactionFormValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects transaction with invalid amount", () => {
        const req = {
            body: {
                title: "Fuchka",
                type: "expense",
                category: "food",
                amount: -20,
                date: new Date(),
            },
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const next = vi.fn();
        transactionFormValidator(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});
