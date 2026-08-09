

export const getMonthlyIncomeExpense = (transactions) => {
    const monthly_income_vs_expense_data_obj = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const istDate = date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
        });
        const month = istDate.slice(0, 7);

        if (!acc[month]) {
            acc[month]={income:0,expense:0}
        }
        if (transaction.type === "income") {
            acc[month].income += Number(transaction.amount);
        }
        else {
            acc[month].expense += Number(transaction.amount);
        }
        return acc
    }, [])

    const monthly_income_vs_expense_data_array = Object.entries(monthly_income_vs_expense_data_obj).map(([month, totals]) => {
        return ({
            month: month,
            income: totals.income,
            expense:totals.expense
        }
            
        )
    })
    return monthly_income_vs_expense_data_array;

}