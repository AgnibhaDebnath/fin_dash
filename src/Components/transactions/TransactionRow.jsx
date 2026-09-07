import { FaPlus, FaMinus, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { categories } from "../../constants/transaction/categories";
import { formatDate } from "@/utils/transaction/formatDate";
const TransactionRow = ({
    transaction,
    setIsFormOpen,
    setEditingTransaction,
    setIsDeleteDialogOpen,
    setSelectedTransaction,
}) => {
    const { date, title, category, amount, type } = transaction;

    const categoryInfo = categories.find((item) => item.value === category);
    const Icon = categoryInfo?.icon;
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors ">
            <td className="pl-1">{formatDate(date)}</td>

            <td>{title}</td>

            <td>
                {Icon && <Icon className={`${Icon} inline mr-2 ${categoryInfo.color}`} size={18} />}
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </td>

            <td
                className={` flex items-center py-1 ${type == "income" ? "text-green-500" : "text-red-500"}`}
            >
                <span className="mr-1 ">
                    {type == "income" ? <FaPlus size={10} /> : <FaMinus size={10} />}
                </span>
                <span>
                    <FaRupeeSign className="inline mr-1 mb-0.5" size={14} />
                    {amount}
                </span>
            </td>

            <td>
                {type == "income" ? (
                    <FaArrowTrendUp className="inline text-green-500 mr-3" />
                ) : (
                    <FaArrowTrendDown className="inline text-red-500 mr-3" />
                )}
                <span className={`${type == "income" ? "text-green-500" : "text-red-500"}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </td>
            <td className="space-x-5 pl-2">
                <button
                    onClick={() => {
                        setIsFormOpen(true);
                        setEditingTransaction(transaction);
                    }}
                    type="button"
                    aria-label="Edit transaction"
                    className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors duration-200 px-2"
                >
                    <MdEdit size={20} className="inline" />
                </button>
                <button
                    onClick={() => {
                        setIsDeleteDialogOpen(true);
                        setSelectedTransaction(transaction);
                    }}
                    aria-label="Delete transaction"
                    className="text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200"
                >
                    <FaTrash size={17} className="inline" />
                </button>
            </td>
        </tr>
    );
};
export default TransactionRow;
