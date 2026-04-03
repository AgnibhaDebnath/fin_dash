
const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment Return",
  "Business Profits"
];

const expenseCategories = [
  "Food",
  "Shopping",
  "Travel",
  "Medical",
  "Entertainment"
];


const generateTransactions = () => {
  const data = [];
  let id = 1;

  for (let month = 0; month < 12; month++) {
    for (let i = 0; i < 20; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1;

      const date = new Date(2026, month, randomDay)
        .toISOString()
        .split("T")[0];

      
      const type = Math.random() > 0.3 ? "expense" : "income";

     
      const category =
        type === "income"
          ? incomeCategories[Math.floor(Math.random() * incomeCategories.length)]
          : expenseCategories[Math.floor(Math.random() * expenseCategories.length)];

      
      let amount;

      if (type === "income") {
        amount = Math.floor(Math.random() * 8000) + 2000; 
      } else {
        amount = Math.floor(Math.random() * 1500) + 100; 
      }

      data.push({
        id: id++,
        date,
        category,
        type,
        amount,
      });
    }
  }

  return data;
};


export const transactionsData = generateTransactions();