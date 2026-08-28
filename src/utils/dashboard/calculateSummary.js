export const calculateSummary = (transactions) => {
    let income = 0;
    let expense = 0;
    transactions?.forEach((transaction) => {
        if (transaction.type === "income") {
            income += Number(transaction.amount);
        } else {
            expense += Number(transaction.amount);
        }
    });

    return {
        income,
        expense,
        balance: income - expense,
    };
};
