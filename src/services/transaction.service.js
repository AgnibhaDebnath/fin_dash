export const fetchTransactions = async (params = "") => {
    const url = params
        ? `http://localhost:3001/api/transaction?${params}`
        : `http://localhost:3001/api/transaction`;

    const res = await fetch(url, {
        credentials: "include",
        method: "GET",
    });
    const data = await res.json();

    if (!res.ok) {
        console.log(data);
        const error = new Error(data.message);
        error.status = res.status;
        throw error;
    }

    const { totalTransactions, transactions, totalTransactionsAllOverTime } = data;
    return { totalTransactions, transactions, totalTransactionsAllOverTime };
};
