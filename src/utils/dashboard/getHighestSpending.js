import { getHighestSpendingDay } from "./getHighestSpendingDay";
import { getHighestSpendingMonth } from "./getHighestSpendingMonth";
export const getHighestSpending = (transactions, dateFilter) => {
    let data = [];
    switch (dateFilter) {
        case "this-month":
        case "last-month":
        case "this-week":
            return (data = getHighestSpendingDay(transactions));
        case "this-year":
        case "all-time":
        case "last-year":
            return (data = getHighestSpendingMonth(transactions));
        default:
            return data;
    }
};
