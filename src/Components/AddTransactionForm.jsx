import { useState, useEffect } from "react";
import { incomeCategories, expenseCategories } from "../Data/tranSactionsData";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

const AddTransactionForm = ({ showForm, setShowForm, setTransactions, transactions, editingTransaction, setEditingTransaction }) => {


    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        type: "",
        date: "",
    });
    const [errors, setErrors] = useState({})
    const handleAddTransaction = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        }

        if (!formData.category) {
            newErrors.category = "Transaction category is required";
        }

        if (!formData.date) {
            newErrors.date = "Date is required";
        }

        if (!formData.type) {
            newErrors.type = "Transaction type is required";
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        setErrors({});
        if (editingTransaction) {
            setTransactions((prev) => prev.map((transaction) =>
                transaction.id == editingTransaction.id ? { ...formData, id: editingTransaction.id } : transaction

            ))
        } else {
            const newTransaction = {
                id: Date.now(),
                amount: Number(formData.amount),
                category: formData.category,
                type: formData.type,
                date: formData.date,
            };

            setTransactions((prev) => [newTransaction, ...prev]);
        }



        setFormData({
            amount: "",
            category: "",
            type: "",
            date: "",
        });
        setEditingTransaction(null)
        setShowForm(false);
    };
    useEffect(() => {
        if (editingTransaction) {
            setFormData(editingTransaction);
        }
    }, [editingTransaction]);
    return (
        <>
            {showForm && <div className="fixed inset-0 bg-black/30 flex justify-center items-center ">
                <div className="bg-white p-6 rounded-xl w-80">

                    <h2 className="text-xl font-bold mb-3 text-center text-gray-900">{editingTransaction ? "Update Transaction" : "Add Transaction"}</h2>
                    <form >
                        <input
                            type="text"
                            placeholder="Amount"
                            className={`w-full border-2 font-mono transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 hover:border-blue-500 shadow-sm border-gray-400 bg-gray-50 font-medium px-4 py-1.25 my-2 rounded-xl ${errors.amount ? "border-red-500" : ""}`}

                            value={formData.amount}
                            onChange={(e) => {
                                const onlyDegit = e.target.value.replace(/[a-zA-Z]/g, "")
                                setFormData({ ...formData, amount: onlyDegit })
                                setErrors((prev) => ({
                                    ...prev,
                                    amount: ""
                                }));
                            }
                            }

                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm  pl-4">
                                {errors.amount}
                            </p>)}

                        <div className="relative">
                            <select
                                className={`w-full border-2 font-mono font-medium px-4 py-1.25 my-2 rounded-xl appearance-none transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 hover:border-blue-500 cursor-pointer shadow-sm border-gray-400 bg-gray-50 ${errors.type ? "border-red-500" : ""}`}
                                value={formData.type}
                                onChange={(e) => {
                                    setFormData({ ...formData, type: e.target.value })
                                    setErrors((prev) => ({
                                        ...prev,
                                        type: ""
                                    }));
                                }
                                }
                            >
                                <option value="">Select type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <FaChevronDown className="absolute right-4 top-5 pointer-events-none" />
                        </div>
                        {errors.type && (
                            <p className="text-red-500 text-sm  pl-4">
                                {errors.type}
                            </p>)}
                        <div className={`relative ${formData.type == "" ? "bg-gray-200 rounded-2xl" : ""}`}>

                            <select disabled={!formData.type}
                                className={`w-full font-mono font-medium appearance-none border-2 px-4 py-1.25 my-2 rounded-xl ${formData.type != "" ? "transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 hover:border-blue-500 cursor-pointer shadow-sm border-gray-400 bg-gray-50" : ""}   ${errors.category ? "border-red-500" : ""}`}
                                value={formData.category}
                                onChange={(e) => {
                                    setFormData({ ...formData, category: e.target.value })
                                    setErrors((prev) => ({
                                        ...prev,
                                        category: ""
                                    }));
                                }
                                }

                            >

                                {formData.type == "income" ? <>
                                    <option >Select income category</option>
                                    {incomeCategories.map((category) => (
                                        <option value={category} key={category}>{category}</option>
                                    ))}

                                </> : formData.type == "expense" ?
                                    <>
                                        <option >Select expense category</option>
                                        {expenseCategories.map((category) => (
                                            <option value={category} key={category}>{category}</option>
                                        ))}
                                    </> :
                                    <>
                                        <option value="">Select category</option>

                                        {incomeCategories.map((category) => (
                                            <option value={category} key={category}>{category}</option>
                                        ))}
                                        {expenseCategories.map((category) => (
                                            <option value={category} key={category}>{category}</option>
                                        ))}
                                    </>
                                }

                            </select>
                            <FaChevronDown className="absolute right-4 top-5 pointer-events-none" />
                        </div>
                        {errors.category && (
                            <p className="text-red-500 text-sm  pl-4">
                                {errors.category}
                            </p>)}
                        <div className="relative">
                            <DatePicker

                                className={`w-67 border-2 px-4 py-1.25 my-3 rounded-xl font-medium font-mono transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 hover:border-blue-500 cursor-pointer shadow-sm border-gray-400 bg-gray-50 ${errors.date ? "border-red-500" : ""}`}
                                selected={formData.date ? new Date(formData.date) : null}
                                onChange={(date) => {
                                    setFormData({ ...formData, date: date ? date.toISOString().split("T")[0] : "", })
                                    setErrors((prev) => ({
                                        ...prev,
                                        date: ""
                                    }));
                                }
                                }
                                isClearable="true"
                                dateFormat="dd MMM yyyy"
                                placeholderText="Select date"

                            />
                            <FaCalendarAlt className="absolute right-4 top-5.5 text-gray-800 text-[1.1rem]" />
                        </div>
                        {errors.date && (
                            <p className="text-red-500 text-sm pl-4">
                                {errors.date}
                            </p>)}
                    </form>
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                setFormData({
                                    amount: "",
                                    category: "",
                                    type: "",
                                    date: "",

                                })
                                setEditingTransaction(null)
                                setShowForm(false)
                                setErrors({})
                            }}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200  text-gray-800 font-medium rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleAddTransaction}
                            type="submit"
                            className="px-5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium cursor-pointer rounded-md"
                        >
                            {editingTransaction ? "Update" : "Add"}
                        </button>
                    </div>

                </div>
            </div >}
        </>
    )
}
export default AddTransactionForm