
export const getYearlyIncomeExpense = (transactions) => {
    const yearly_income_vs_expense_data_obj = transactions.reduce((acc, transaction) => {

   const date = new Date(transaction.date);
        const istDate = date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
        });
        const year = istDate.slice(0, 4);
        if (!acc[year]) {
            acc[year] = { income: 0, expense: 0 };
        }
        if (transaction.type === "income") {
            acc[year].income += Number(transaction.amount);
        }
        else {
            acc[year].expense += Number(transaction.amount); 
        }
       

       return acc
    },{})
    
    const yearly_income_vs_expense_data_array = Object.entries(yearly_income_vs_expense_data_obj).map(([year, totals])=> {
        return {
            year,
            income: totals.income,
            expense:totals.expense
    }
    }) 
    return yearly_income_vs_expense_data_array
}