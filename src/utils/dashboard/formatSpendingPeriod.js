import { format } from "date-fns";

export const formatSpendingPeriod = (highestSpendingPeriod, dateFilter) => {
    switch (dateFilter) {
        case "this-month":
        case "last-month":
        case "this-week":
            return format(new Date(highestSpendingPeriod), "dd MMM, yyyy");
        case "this-year":
        case "all-time":
            return format(new Date(`${highestSpendingPeriod}-01`), "MMM, yyyy");
        default:
            return highestSpendingPeriod;
    }
};
