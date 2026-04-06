
export const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment Return",
  "Business Profits"
];

export const expenseCategories = [
  "Food",
  "Shopping",
  "Travel",
  "Medical",
  "Entertainment"
];


const generateTransactions = () => {
  const data = [];
  let id = 1;
const year = Math.floor(Math.random() * (2030 - 2000 + 1)) + 2000;
  for (let month = 0; month < 12; month++) {
    for (let i = 0; i < 20; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1;
      
      const date = new Date(year, month, randomDay)
        .toLocaleDateString("en-CA")
        

      
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
// export const transactionsData = [];