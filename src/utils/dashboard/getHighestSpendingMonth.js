import { getMonthlyIncomeExpense } from "./getMonthlyIncomeExpense";

export const getHighestSpendingMonth = (transactions) => {
    const monthlyIncomeExpenseData = getMonthlyIncomeExpense(transactions);

    let highestSpendingPeriod;
    let highestPeriodAmount = 0;
    monthlyIncomeExpenseData.forEach((item) => {
        if (Number(item.expense) > highestPeriodAmount) {
            highestSpendingPeriod = item.month;
            highestPeriodAmount = Number(item.expense);
        }
    });
    return { highestSpendingPeriod, highestPeriodAmount };
};
