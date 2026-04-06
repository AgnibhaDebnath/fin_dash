import { useMemo, useState, useEffect } from "react";

import Navbar from "../Components/navbar"
import SideBar from "../Components/sidebar"
import Cards from "../Components/Cards";
import Charts from "../Components/charts";
import Transactions from "../Components/TranSactions";
import { generateTransactions } from "../Data/tranSactionsData";
import Insights from "../Components/insights";

const DashBoard = () => {
    const [role, setRole] = useState("user");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem("transactions");

        if (stored) {
            return JSON.parse(stored);
        }

        const generated = generateTransactions();
        localStorage.setItem("transactions", JSON.stringify(generated));
        return generated;
    });
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const { total_income, total_expense, expense_category, monthly_expense_data, max_Category, month_having_max_expense } = useMemo(() => {
        if (transactions.length == 0) {
            return {
                total_income: 0,
                total_expense: 0,
                expense_category: [],
                monthly_expense_data: []
            }
        }
        const total_income = transactions.filter((transaction) => transaction.type == "income").reduce((sum, transaction) => sum + transaction.amount, 0);
        const total_expense = transactions.filter((transaction) => transaction.type == "expense").reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalFoodExpense = transactions.filter((transaction) => transaction.category == "Food").reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalShopingExpense = transactions.filter((transaction) => transaction.category == "Shopping").reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalTravelExpense = transactions.filter((transaction) => transaction.category == "Travel").reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalMedicalExpense = transactions.filter((transaction) => transaction.category == "Medical").reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalEntertainmentExpense = transactions.filter((transaction) => transaction.category == "Entertainment").reduce((sum, transaction) => sum + transaction.amount, 0);

        const expense_category = [
            { name: "Food", value: totalFoodExpense },
            { name: "Shopping", value: totalShopingExpense },
            { name: "Travel", value: totalTravelExpense },
            { name: "Medical", value: totalMedicalExpense },
            { name: "Entertainment", value: totalEntertainmentExpense }
        ];
        const max_Category = expense_category.reduce((max, category) => category.value > max.value ? category : max);

        const result = {};

        transactions.forEach((tx) => {

            if (tx.type !== "expense") return;


            const date = new Date(tx.date);

            const month = date.toLocaleString("en-US", { month: "short", });

            const year = date.toLocaleString("en-US", { year: "numeric" })

            const key = `${month}-${year}`
            if (!result[key]) {
                result[key] = {
                    month,
                    year,
                    expense: 0
                }
            }
            result[key].expense += tx.amount

        })
        const monthly_expense_data = Object.values(result);

        const month_having_max_expense = monthly_expense_data.reduce((max, month) => month.expense > max.expense ? month : max);

        return {
            month_having_max_expense,
            total_income,
            total_expense,
            expense_category,
            monthly_expense_data,
            max_Category
        }
    }, [transactions])












    return (
        <div className="h-screen flex flex-col ">
            <Navbar role={role} setRole={setRole} activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex flex-1">
                <div className="hidden md:block w-60 h-full">
                    <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
                </div>
                {activeTab == "dashboard" && <>
                    <div className="flex flex-col w-full">
                        <Cards total_income={total_income} total_expense={total_expense} monthly_expense_data={monthly_expense_data} />
                        <Charts expense_category={expense_category} monthly_expense_data={monthly_expense_data} />
                        <Insights max_Category={max_Category} total_expense={total_expense} month_having_max_expense={month_having_max_expense} />
                    </div>
                </>
                }
                {activeTab == "transactions" && <>

                    <Transactions role={role} transactions={transactions} setTransactions={setTransactions} />

                </>
                }
            </div>

            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    <div className="fixed top-24 left-0 w-60 h-full bg-white shadow-md z-50 md:hidden">
                        <SideBar setActiveTab={setActiveTab} activeTab={activeTab} setRole={setRole} role={role} />
                    </div>
                </>
            )}
        </div>
    )
}

export default DashBoard