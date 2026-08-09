import { getDailyIncomeExpense } from "./getDailyIncomeExpense";
import { getMonthlyIncomeExpense } from "./getMonthlyIncomeExpense";
import { getYearlyIncomeExpense } from "./getYearlyIncomeExpense";

export function getIncomeExpenseData(transactions, dashboardDateFilter) {
    let data = [];

    switch (dashboardDateFilter) {
        case "this-week":
        case "this-month":
        case "last-month":
            data = getDailyIncomeExpense(transactions);
            data.sort((a, b) => a.day.localeCompare(b.day));
            break;

        case "this-year":
        case "last-year":
            data = getMonthlyIncomeExpense(transactions);
            data.sort((a, b) => a.month.localeCompare(b.month));
            break;

        case "all-time":
            data = getYearlyIncomeExpense(transactions);
            data.sort((a, b) => a.year.localeCompare(b.year));
            break;

        default:
            data = [];
    }

    return data;
}