import { getExpenseByCategory } from "./getExpenseByCategory.js";

export const getTopSpendingCategory = (transactions) => {
    const expenseByCategoryData = getExpenseByCategory(transactions);
    let highestSpendingCategory;
    let highestCategoryAmount = 0;
    expenseByCategoryData.forEach((item) => {
        if (Number(item.amount) > highestCategoryAmount) {
            highestCategoryAmount = Number(item.amount);
            highestSpendingCategory = item.category;
        }
    });
    return { highestSpendingCategory, highestCategoryAmount };
};
