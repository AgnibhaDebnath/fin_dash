import { FaSearch } from "react-icons/fa";
import { FilterContext } from "@/context/FilterContext";
import { useContext } from "react";
const NoResults = () => {
    const { setTransactionFilters } = useContext(FilterContext);
    return (
        <tr>
            <td colSpan={6} className="py-6 text-center text-gray-500 ">
                <div className="flex flex-col items-center text-center">
                    <FaSearch size={34} className="text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 tracking-wide">
                        No matching transactions
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 ">
                        Try adjusting or clearing your filters.
                    </p>

                    <p></p>
                    <button
                        onClick={() => {
                            setTransactionFilters((prev) => ({
                                ...prev,
                                type: "all types",
                                category: "all categories",
                                dateFilter: "this-month",
                                search: "",
                            }));
                        }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-1.5 rounded-md font-medium cursor-pointer tracking-wide my-2 mt-5"
                    >
                        Clear Filters
                    </button>
                </div>
            </td>
        </tr>
    );
};
export default NoResults;
