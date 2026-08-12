export const getHighestSpendingHeading = (dateFilter) => {
    switch (dateFilter) {
        case "this-month":
        case "this-week":
        case "last-month":
            return "Highest Spending Day";
        case "all-time":
        case "this-year":
            return "Highest Spending Month";
        default:
            return "Highest Spending";
    }
};
