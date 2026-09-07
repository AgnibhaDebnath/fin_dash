import { useEffect, useState } from "react";
import { categories } from "../../constants/transaction/categories";
import { transactionTypes } from "../../constants/transaction/transactionTypes";
import FilterDropdown from "../common/FilterDropdown";
import { fetchTransactions } from "../../services/transaction.service";
import { MdArrowDropDown } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useApiError } from "@/hooks/useApiError";
const TransactionForm = ({
    isFormOpen,
    setIsFormOpen,
    editingTransaction,
    setEditingTransaction,
    params,
    setTransactions,
    setTotalTransactions,
}) => {
    const handleApiError = useApiError();
    const [formDropdown, setFormDropdown] = useState(null);
    const [transactionType, setTransactionType] = useState("all types");
    const [transactionCategory, setTransactionCategory] = useState("all categories");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [errors, setErrors] = useState({
        title: [],
        amount: [],
        type: [],
        category: [],
        date: [],
    });
    console.log(import.meta.env.VITE_API_URL);
    const categoryInfo = categories.find((category) => category.value === transactionCategory);
    const typesInfo = transactionTypes.find((type) => type.value === transactionType);
    const CategoryIcon = categoryInfo?.icon;
    const TypeIcon = typesInfo?.icon;
    const filteredCategory =
        transactionType === "all types"
            ? categories
            : categories.filter((category) => category.type === transactionType);

    const TransactionSchema = z.object({
        title: z
            .string()
            .trim()
            .min(1, "Title is required")
            .max(40, "Title must be less than 30 characters"),

        amount: z.preprocess(
            (value) => (value == "" ? undefined : Number(value)),
            z.number({ error: "Amount is required" }).positive("Amount must be greater than 0"),
        ),
        type: z.enum(["income", "expense"], {
            error: "Please select a transaction type",
        }),

        category: z.enum(
            [
                "food",
                "transport",
                "shopping",
                "bills",
                "salary",
                "healthcare",
                "entertainment",
                "household",
                "education",
                "investment",
                "freelance",
            ],
            {
                error: "Please select a category",
            },
        ),
        date: z.preprocess(
            (value) => new Date(value),
            z.date({
                error: "Please select a date",
            }),
        ),
    });

    const handleSubmitTranSactionForm = async (e) => {
        e.preventDefault();

        const result = TransactionSchema.safeParse({
            title,
            amount,
            type: transactionType,
            category: transactionCategory,
            date,
        });

        if (!result.success) {
            const tree = z.treeifyError(result.error);
            setErrors({
                title: tree.properties?.title?.errors ?? [],
                amount: tree.properties?.amount?.errors ?? [],
                type: tree.properties?.type?.errors ?? [],
                category: tree.properties?.category?.errors ?? [],
                date: tree.properties?.date?.errors ?? [],
            });
            return;
        }
        try {
            setFormSubmitted(true);
            const url = editingTransaction
                ? `${import.meta.env.VITE_API_URL}/api/transaction/${editingTransaction._id}`
                : `${import.meta.env.VITE_API_URL}/api/transaction`;

            const method = editingTransaction ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    title,
                    amount,
                    type: transactionType,
                    category: transactionCategory,
                    date,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400) {
                    const { errors } = data;
                    setErrors(errors);
                    return;
                }
                const error = new Error(data.message);
                error.status = res.status;
                throw error;
            }

            const { message } = data;
            toast.success(message);

            const { transactions, totalTransactions } = await fetchTransactions(params);
            setTotalTransactions(totalTransactions);
            setTransactions(transactions);
            setTitle("");
            setAmount("");
            setTransactionType("all types");
            setTransactionCategory("all categories");
            setDate(new Date());
            setEditingTransaction(null);
            setIsFormOpen(false);
        } catch (err) {
            handleApiError(err);
        } finally {
            setFormSubmitted(false);
        }
    };

    const handleTypeChange = (value) => {
        setTransactionType(value);
        if (errors.type.length > 0) {
            const result = TransactionSchema.shape.type.safeParse(value);

            setErrors((prev) => ({
                ...prev,
                type: result.success ? [] : prev.type,
            }));
        }
    };

    const handleCategoryChange = (value) => {
        setTransactionCategory(value);
        if (errors.category.length > 0) {
            const result = TransactionSchema.shape.category.safeParse(value);

            setErrors((prev) => ({
                ...prev,
                category: result.success ? [] : prev.category,
            }));
        }
    };
    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(editingTransaction.amount);
            setTransactionCategory(editingTransaction.category);
            setTransactionType(editingTransaction.type);
            setDate(editingTransaction.date);
        }
    }, [editingTransaction]);
    return (
        <>
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center ">
                    <div className="bg-white p-6 pb-8 rounded-3xl w-88 min-[370px]:w-90 min-[470px]:w-110 min-[600px]:w-130 font-[inter] ">
                        <div className="flex justify-end ">
                            <button
                                onClick={() => {
                                    setTitle("");
                                    setAmount("");
                                    setTransactionType("all types");
                                    setTransactionCategory("all categories");
                                    setErrors({
                                        title: [],
                                        amount: [],
                                        type: [],
                                        category: [],
                                        date: [],
                                    });
                                    setEditingTransaction(null);
                                    setIsFormOpen(false);
                                }}
                                className="cursor-pointer bg-gray-100 hover:bg-gray-300  p-3 rounded-full transition-all duration-200"
                            >
                                <FaTimes className="text-gray-700" size={20} />
                            </button>
                        </div>
                        <div className="w-full">
                            <header>
                                <h2 className="text-2xl font-bold mb-3 text-center text-gray-900 tracking-wide">
                                    {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                                </h2>
                            </header>
                            <form className="flex flex-col gap-8 w-full items-center max-h-90 overflow-y-auto ">
                                <div className="w-85/100 min-[470px]:w-75/100 min-[600px]:w-7/10">
                                    <label htmlFor="title" className="font-bold mb-1 block">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setTitle(value);
                                            if (errors.title.length > 0) {
                                                const result =
                                                    TransactionSchema.shape.title.safeParse(value);
                                                console.log(result.success);
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    title: result.success ? [] : errors.title,
                                                }));
                                            }
                                        }}
                                        placeholder="e.g., Pizza Hut, July Salary"
                                        className={`border w-full transition duration-300 focus:ring-1 focus:ring-blue-500 focus:outline-none focus:border-blue-500 shadow-sm border-gray-400 px-5 py-1.5 rounded-2xl font-medium `}
                                    />
                                    {errors.title.length > 0 && (
                                        <p className="ml-2 text-red-500 font-medium text-sm min-[470px]:text-base">
                                            {errors.title[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="w-85/100 min-[470px]:w-75/100 min-[600px]:w-7/10">
                                    <label htmlFor="amount" className="font-bold mb-1 block">
                                        Amount *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setAmount(value);
                                            if (errors.amount.length > 0) {
                                                const result =
                                                    TransactionSchema.shape.amount.safeParse(value);
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    amount: result.success ? [] : errors.amount,
                                                }));
                                            }
                                        }}
                                        placeholder="Enter amount"
                                        className={`border w-full transition duration-300 focus:ring-1 focus:ring-blue-500 focus:outline-none focus:border-blue-500 shadow-sm border-gray-400 px-5 py-1.5 rounded-2xl font-medium`}
                                    />
                                    {errors.amount.length > 0 && (
                                        <p className="ml-2 text-red-500 font-medium text-sm min-[470px]:text-base">
                                            {errors.amount[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col min-[470px]:flex-row w-85/100 min-[470px]:w-75/100 min-[600px]:w-7/10 gap-y-4 min-[470px]:gap-2">
                                    <div className="space-y-1">
                                        <div
                                            onClick={() =>
                                                setFormDropdown(
                                                    formDropdown == "type-form"
                                                        ? null
                                                        : "type-form",
                                                )
                                            }
                                            className="flex items-center justify-center cursor-pointer relative border-2 px-2 rounded-md border-gray-400 hover:bg-gray-100 transition-all duration-200 py-0.5 w-40 min-[470px]:w-36 min-[600px]:w-40 "
                                        >
                                            <TypeIcon
                                                className={`mr-2 ${typesInfo?.value === "all types" ? "hidden" : ""} ${typesInfo?.color} `}
                                            />
                                            <label className="font-bold text-gray-600 font-[inter] text-xs min-[390px]:text-sm cursor-pointer">
                                                {transactionType === "all types"
                                                    ? "Select Type"
                                                    : transactionType.charAt(0).toUpperCase() +
                                                      transactionType.slice(1)}
                                            </label>
                                            <MdArrowDropDown
                                                size={28}
                                                className={`transition-transform ${formDropdown === "type-form" ? "rotate-180" : ""}`}
                                            />
                                            <FilterDropdown
                                                label="type-form"
                                                isOpen={formDropdown === "type-form"}
                                                items={transactionTypes}
                                                setFormDropdown={setFormDropdown}
                                                handleTypeChange={handleTypeChange}
                                                handleCategoryChange={handleCategoryChange}
                                            />
                                        </div>
                                        {errors.type.length > 0 && (
                                            <p className="text-xs ml-2 text-red-500 font-medium">
                                                {errors.type[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div
                                            onClick={() => {
                                                if (transactionType === "all types") return;
                                                setFormDropdown(
                                                    formDropdown === "category-form"
                                                        ? null
                                                        : "category-form",
                                                );
                                            }}
                                            className={`flex items-center justify-center relative border-2 px-2 py-0.5 rounded-md border-gray-400 w-40 min-[470px]:w-36 min-[600px]:w-40  ${transactionType === "all types" ? "cursor-not-allowed bg-gray-300 shadow-xl" : "cursor-pointer hover:bg-gray-100 transition-all duration-200"}`}
                                        >
                                            <CategoryIcon
                                                className={`mr-2 mb-0.5 ${categoryInfo?.value === "all categories" ? "hidden" : ""} ${categoryInfo?.color} `}
                                            />

                                            <label
                                                className={`font-bold text-gray-600 font-[inter] text-xs min-[600px]:text-sm  ${transactionType === "all types" ? "cursor-not-allowed " : "cursor-pointer"}`}
                                            >
                                                {transactionCategory === "all categories"
                                                    ? "Select Category"
                                                    : transactionCategory.charAt(0).toUpperCase() +
                                                      transactionCategory.slice(1)}
                                            </label>
                                            <MdArrowDropDown
                                                size={28}
                                                className={`transition-transform ${formDropdown === "category-form" ? "rotate-180" : ""}`}
                                            />
                                            <FilterDropdown
                                                label="category-form"
                                                isOpen={formDropdown == "category-form"}
                                                items={filteredCategory}
                                                setFormDropdown={setFormDropdown}
                                                handleCategoryChange={handleCategoryChange}
                                            />
                                        </div>
                                        {errors.category.length > 0 && (
                                            <p className="text-xs ml-2 text-red-500 font-medium">
                                                {errors.category[0]}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Popover>
                                    <div className="w-85/100 min-[470px]:w-75/100 min-[600px]:w-7/10">
                                        <label htmlFor="title" className="font-bold mb-1 block">
                                            Date *
                                        </label>
                                        <PopoverTrigger className="w-full">
                                            <input
                                                className="w-full py-1.5 border rounded-2xl shadow-sm border-gray-400 text-center"
                                                placeholder={`${date ? format(date, "dd MMM yyyy") : "Select date"}`}
                                            />
                                        </PopoverTrigger>
                                    </div>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <footer className="w-85/100 min-[470px]:w-75/100 min-[600px]:w-7/10 flex justify-between ">
                                    <button
                                        onClick={() => {
                                            setTitle("");
                                            setAmount("");
                                            setTransactionType("all types");
                                            setTransactionCategory("all categories");
                                            setErrors({
                                                title: [],
                                                amount: [],
                                                type: [],
                                                category: [],
                                                date: [],
                                            });
                                            setEditingTransaction(null);
                                            setIsFormOpen(false);
                                        }}
                                        type="button"
                                        className="px-5 py-1.5 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-semibold cursor-pointer text-sm min-[390px]:text-base"
                                    >
                                        Cencel
                                    </button>
                                    <button
                                        disabled={formSubmitted}
                                        onClick={handleSubmitTranSactionForm}
                                        type="submit"
                                        className="px-5 py-1.5 text-sm min-[390px]:text-base rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold cursor-pointer disabled:opacity-30"
                                    >
                                        {editingTransaction ? "Save Changes" : "Save transaction"}
                                    </button>
                                </footer>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionForm;
