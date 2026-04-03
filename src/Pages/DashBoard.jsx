import { useState } from "react";

import Navbar from "../Components/navbar"
import SideBar from "../Components/sidebar"
import Cards from "../Components/Cards";
import Charts from "../Components/charts";
import Transactions from "../Components/TranSactions";
import { transactionsData } from "../Data/tranSactionsData";
const DashBoard = () => {
    const [role, setRole] = useState("user");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [transactions, setTransactions] = useState(transactionsData);

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

    return (
        <div className="h-screen flex flex-col ">
            <Navbar role={role} setRole={setRole} activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex flex-1">
                <div className="hidden md:block w-60 h-full">
                    <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
                </div>
                {activeTab == "dashboard" && <>
                    <div className="flex flex-col w-full">
                        <Cards total_income={total_income} total_expense={total_expense} />
                        <Charts expense_category={expense_category} />
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