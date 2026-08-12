import { getDailyIncomeExpense } from "./getDailyIncomeExpense";

export const getHighestSpendingDay = (transactions) => {
    const dailyIncomeExpenseData = getDailyIncomeExpense(transactions);

    let highestSpendingPeriod;
    let highestPeriodAmount = 0;
    dailyIncomeExpenseData.forEach((item) => {
        if (Number(item.expense) > highestPeriodAmount) {
            highestSpendingPeriod = item.day;
            highestPeriodAmount = Number(item.expense);
        }
    });
    return { highestSpendingPeriod, highestPeriodAmount };
};
