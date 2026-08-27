import { describe, expect, it } from "vitest";
import { getTopSpendingCategory } from "../../src/utils/dashboard/getTopSpendingCategory.js";
describe("getTopSpending", () => {
    it("returns zero values when there are no transactions", () => {
        expect(getTopSpendingCategory([])).toEqual({
            highestSpendingCategory: undefined,
            highestCategoryAmount: 0,
        });
    });

    it("returns zero values when all transactions are income", () => {
        const transactions = [
            { type: "income", amount: 400, category: "salary" },
            { type: "income", amount: 600, category: "freelance" },
        ];
        expect(getTopSpendingCategory(transactions)).toEqual({
            highestSpendingCategory: undefined,
            highestCategoryAmount: 0,
        });
    });

    it("calculates highestSpendingCategory and highestCategoryAmount correctly", () => {
        const transactions = [
            { type: "expense", amount: 400, category: "food" },
            { type: "expense", amount: 600, category: "household" },
            { type: "income", amount: 1000, category: "freelance" },
        ];
        expect(getTopSpendingCategory(transactions)).toEqual({
            highestSpendingCategory: "household",
            highestCategoryAmount: 600,
        });
    });
});
