export const getDailyIncomeExpense = (transactions) => {
    const daily_income_vs_expense_data_obj = transactions.reduce((acc, transaction)=> {
        const date = new Date(transaction.date);
        const istDate = date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
        });
        if (!acc[istDate]) {
            acc[istDate]={income:0,expense:0}
        }
        if (transaction.type === "income") {
            acc[istDate].income += Number(transaction.amount);
        }
        else {
            acc[istDate].expense += Number(transaction.amount);
        }
        return acc;
    }, {})
    
    const daily_income_vs_expense_data_array = Object.entries(daily_income_vs_expense_data_obj)
        .filter(([,totals])=>totals.income!=0 || totals.expense!=0)
        .map(([istDate, totals]) => {
            return {
                day:istDate,
                income: totals.income,
                expense:totals.expense,
      }
        })
    return daily_income_vs_expense_data_array
}