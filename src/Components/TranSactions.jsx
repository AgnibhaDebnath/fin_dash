import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddTransactionForm from "./AddTransactionForm";
import { FaArrowUp, FaArrowDown, FaInbox, FaUtensils, FaShoppingCart, FaPlane, FaHeartbeat, FaMoneyCheckAlt, FaLaptopCode, FaFilm, FaChartLine, FaChartPie } from "react-icons/fa";
const Transactions = ({ role, transactions, setTransactions }) => {
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedValue, setSelectedValue] = useState("all")
    const [editingTransaction, setEditingTransaction] = useState(null)
    const item_per_page = 4;
    const start_index = (currentPage - 1) * item_per_page;
    const end_index = start_index + item_per_page;

    const filteredTransactions =
        selectedValue === "all"
            ? transactions.filter(tx => tx.category.toLowerCase().includes(search.toLowerCase()))
            : transactions.filter(tx => tx.type === selectedValue && tx.category.toLowerCase().includes(search.toLowerCase()))

    const currentTransactions = filteredTransactions.slice(start_index, end_index);
    const total_page = Math.ceil(filteredTransactions.length / item_per_page);


    return (
        <section className="w-full mt-28 min-[766px]:px-4 min-[417px]:px-8 px-3 flex flex-col items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-700 h-10 pt-1">Transaction Details</h1>
            <article className="flex flex-col min-[491px]:flex-row  min-[491px]:items-center min-[950px]:w-3/5 min-[765px]:w-4/5 w-full justify-between gap-3 items-start">
                <div className="flex flex-col items-center  min-[491px]:flex-row gap-3 my-3">
                    <select value={selectedValue}
                        onChange={e => {
                            setSelectedValue(e.target.value);
                            setCurrentPage(1)
                        }}
                        className="border-2 font-mono border-blue-500 rounded-lg px-2 py-1 w-full  block font-medium"
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <div className="relative">
                        <FaSearch className="absolute top-2.5 left-3" />
                        <input
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                                setCurrentPage(1);
                            }}
                            type="text"
                            placeholder="Search category..."
                            className="pl-8 py-1 rounded-full flex-1 border-2 font-semibold font-mono "
                        />
                    </div>
                </div>
                {role == "admin" &&
                    <div className="w-">
                        <button onClick={() => setShowForm(true)} className="bg-green-100 rounded-full px-4 py-1 text-green-500 hover:bg-green-200 transition cursor-pointer font-medium">
                            + Add
                        </button>
                    </div>
                }
            </article>

            <article className="w-full sm:px-20 min-[446px]:px-4 px-0 flex flex-col items-center gap-4">
                {transactions.length == 0 ? <>
                    <FaInbox className="text-5xl mb-3 text-gray-600" />
                    <h1 className="text-gray-700 font-medium text-[1.1rem]">No transaction yet</h1>
                </> :
                    currentTransactions.map((currentTransaction) => (
                        <div key={currentTransaction.id} className="shadow-md hover:shadow-lg transition rounded-2xl p-4 w-full min-[1200px]:w-1/2 min-[800px]:w-4/5 ">
                            <div className={`p-3 rounded-full w-10 ${currentTransaction.type == "income" ? "bg-green-100" : "bg-red-100"}`}>
                                {currentTransaction.type === "income" ? (
                                    <FaArrowUp className="text-green-500" />
                                ) : (
                                    <FaArrowDown className="text-red-500" />
                                )}
                            </div>
                            <div className="flex justify-between my-2 items-center ">

                                <p className="font-medium text-gray-700 font-mono">
                                    {new Date(currentTransaction.date).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>

                                <p className={`text-[1.3rem] font-[Lato] font-extrabold  tracking-wide ${currentTransaction.type == "income" ? "text-green-500" : "text-red-500"}`}>
                                    ₹{currentTransaction.type == "income" ? "+" : "-"}{currentTransaction.amount}
                                </p>

                            </div>
                            <div className="flex justify-between my-2">
                                <p className="font-medium text-gray-700">
                                    <span className="text-gray-600 text-[1rem] font-normal">Catagory</span>: {currentTransaction.category == "Food" ? <FaUtensils className="inline mx-1 mb-1 text-orange-600  " /> : currentTransaction.category == "Shopping" ? <FaShoppingCart className="inline text-blue-600 mx-1 mb-1" /> : currentTransaction.category == "Travel" ? <FaPlane className="inline text-purple-500 mx-1" /> : currentTransaction.category == "Medical" ? <FaHeartbeat className="inline text-red-500 mx-1" /> : currentTransaction.category == "Salary" ? < FaMoneyCheckAlt className="inline mx-1  text-green-600 text-[1.2rem] mb-0.5" /> : currentTransaction.category == "Freelance" ? < FaLaptopCode className="inline mx-1  text-blue-600 text-[1.2rem] mb-0.5" /> : currentTransaction.category == "Entertainment" ? < FaFilm className="inline mx-1  text-pink-600 text-[1.2rem] mb-0.5" /> : currentTransaction.category == "Investment Return" ? <  FaChartPie className="inline mx-1  text-teal-600 text-[1.2rem] mb-0.5" /> : currentTransaction.category == "Business Profits" ? < FaChartLine className="inline mx-1  text-emerald-600 text-[1.2rem] mb-0.5" /> : ""}{currentTransaction.category}
                                </p>
                                <p>Type: {currentTransaction.type}</p>
                            </div>
                            {role == "admin" &&
                                <div className="flex justify-end">
                                    <button onClick={() => {
                                        setEditingTransaction(currentTransaction);
                                        console.log(currentTransaction)
                                        setShowForm(true)
                                    }} className="px-5 py-1 rounded-2xl bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer font-medium transition">Edit</button>
                                </div>
                            }
                        </div>
                    ))
                }
            </article>

            {(transactions.length == 0) ? "" : transactions.length > 0 && filteredTransactions.length == 0 ? <>
                <FaInbox className="text-5xl mb-3 text-gray-600" />
                <h1 className="text-lg text-gray-700 font-medium">No matching transactions</h1>
            </> :
                <div className="flex justify-center gap-5 my-2 shadow-2xl px-4 py-4 rounded-2xl items-center">
                    <button disabled={currentPage == 1} onClick={() => setCurrentPage(() => currentPage - 1)} className={`bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium px-8 py-1  ${currentPage == 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>Prev</button>
                    <h2 className="text-xs sm:text-[1rem]">page {currentPage} of {total_page}</h2>
                    <button disabled={currentPage == total_page} onClick={() => setCurrentPage(() => currentPage + 1)} className={`bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium px-8 py-1  ${currentPage == total_page ? "cursor-not-allowed" : "cursor-pointer"}`}>Next</button>
                </div>
            }
            <article>
                <AddTransactionForm showForm={showForm} setShowForm={setShowForm} transactions={transactions} setTransactions={setTransactions} editingTransaction={editingTransaction} setEditingTransaction={setEditingTransaction} />
            </article>
        </section>
    )
}
export default Transactions;