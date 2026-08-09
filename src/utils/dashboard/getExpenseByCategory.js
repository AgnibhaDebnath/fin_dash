export const getExpenseByCategory = (transactions) => {

    const expenseByCategory = transactions.reduce((acc, transaction) => {
        if (transaction.type != "expense") return acc;
        acc[transaction.category]=(acc[transaction.category]||0) + Number(transaction.amount)
        return acc
    }, {})
    
    const pieData = Object.entries(expenseByCategory).map(([category,amount]) => {
        return {
            category,
            amount
        }
    })
    return pieData;
}