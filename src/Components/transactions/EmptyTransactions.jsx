import { FaReceipt } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
const EmptyTransactions = ({ setIsFormOpen }) => {
    return (
        <div className="flex flex-col items-center">
            <FaReceipt className="text-gray-300" size={40} />
            <h3 className="text-gray-700 font-semibold tracking-wide text-lg mt-5">
                No transactions yet
            </h3>
            <p className="text-[.8rem] min-[400px]:text-sm text-gray-500 mt-2">
                Start tracking your finances by adding your first transaction.
            </p>
            <button
                onClick={() => setIsFormOpen(true)}
                className="px-5 py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-bold flex items-center tracking-wide mt-5 cursor-pointer"
            >
                <FaPlus className="inline mr-1 " />
                Add Transaction
            </button>
        </div>
    );
};

export default EmptyTransactions;
