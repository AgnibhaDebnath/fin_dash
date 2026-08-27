import { describe, it, expect } from "vitest";
import { getExpenseByCategory } from "../../src/utils/dashboard/getExpenseByCategory.js";
describe("getExpenseByCategory", () => {
    it("returns empty array when there are no transactions", () => {
        expect(getExpenseByCategory([])).toEqual([]);
    });

    it("returns empty array when all transactions are income", () => {
        const transactions = [{ type: "income", category: "freelance", amount: "400" }];
        expect(getExpenseByCategory(transactions)).toEqual([]);
    });

    it("calculates expenses by category correctly", () => {
        const transactions = [
            { type: "income", category: "freelance", amount: "2000" },
            { type: "expense", category: "food", amount: "400" },
            { type: "expense", category: "shopping", amount: "740" },
        ];
        expect(getExpenseByCategory(transactions)).toEqual([
            { category: "food", amount: 400 },
            { category: "shopping", amount: 740 },
        ]);
    });
});
