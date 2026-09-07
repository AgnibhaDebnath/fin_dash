import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { categories } from "../../constants/transaction/categories";
import { transactionTypes } from "../../constants/transaction/transactionTypes";
import { dateFilters } from "../../constants/common/dateFilters";
import FilterDropdown from "../common/FilterDropdown";
import { FilterContext } from "@/context/FilterContext";
const TransactionToolbar = ({ setIsFormOpen }) => {
    const { transactionFilters, setTransactionFilters } = useContext(FilterContext);

    const categoryInfo = categories.find(
        (category) => category.value === transactionFilters.category,
    );
    const typesInfo = transactionTypes.find((type) => type.value === transactionFilters.type);
    const CategoryIcon = categoryInfo?.icon;
    const TypeIcon = typesInfo?.icon;
    const dateFilterInfo = dateFilters.find(
        (dateFilter) => dateFilter.value === transactionFilters.dateFilter,
    );
    const [toolbarDropdown, setToolbarDropdown] = useState(null);
    return (
        <section aria-label="Transaction Controls Filter Toolbar" className="w-full mt-35">
            <div className="px-5 min-[400px]:px-10 flex justify-between items-center gap-y-4 flex-wrap">
                <div className="flex pr-10 items-center flex-wrap gap-y-4 gap-x-4 sm:gap-x-6  lg:gap-x-10">
                    <div className="relative">
                        <FaSearch className="absolute top-[.72rem] left-[1.1rem] text-gray-400" />
                        <input
                            value={transactionFilters.search}
                            onChange={(e) =>
                                setTransactionFilters((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                            type="text"
                            placeholder="Search transactions..."
                            className="border rounded-2xl border-gray-400 py-1 px-3 text-justify pl-12 text-gray-500 font-medium font-[inter] text-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all duration-200 shadow-sm"
                        />
                    </div>
                    <div
                        onClick={() =>
                            setToolbarDropdown(toolbarDropdown == "category" ? null : "category")
                        }
                        className="flex items-center justify-center cursor-pointer relative border-2 px-2 py-0.5 rounded-md border-gray-400 hover:bg-gray-100 transition-all duration-200 w-39"
                    >
                        <CategoryIcon
                            className={`mr-2 ${categoryInfo?.value === "all categories" ? "hidden" : ""} ${categoryInfo?.color} `}
                        />
                        <label className="font-semibold text-gray-600 font-[inter] text-xs min-[390px]:text-sm cursor-pointer">
                            {transactionFilters.category === "all categories"
                                ? "Categories"
                                : transactionFilters.category?.charAt(0).toUpperCase() +
                                  transactionFilters.category.slice(1)}
                        </label>
                        <MdArrowDropDown
                            size={30}
                            className={`transition-transform ${toolbarDropdown == "category" ? "rotate-180" : ""}`}
                        />
                        <FilterDropdown
                            label="category"
                            isOpen={toolbarDropdown == "category"}
                            items={categories}
                            setToolbarDropdown={setToolbarDropdown}
                        />
                    </div>

                    <div
                        onClick={() =>
                            setToolbarDropdown(toolbarDropdown === "type" ? null : "type")
                        }
                        className="flex items-center justify-center cursor-pointer relative border-2 px-2 py-0.5 rounded-md border-gray-400  hover:bg-gray-100 transition-all duration-200 w-35"
                    >
                        <TypeIcon
                            className={`mr-2 ${typesInfo?.value === "all types" ? "hidden" : ""} ${typesInfo?.color} `}
                        />
                        <label className="font-semibold text-gray-600 font-[inter] text-xs min-[390px]:text-sm cursor-pointer">
                            {transactionFilters.type === "all types"
                                ? "Types"
                                : transactionFilters.type?.charAt(0).toUpperCase() +
                                  transactionFilters.type.slice(1)}
                        </label>
                        <MdArrowDropDown
                            size={30}
                            className={`transition-transform ${toolbarDropdown == "type" ? "rotate-180" : ""}`}
                        />
                        <FilterDropdown
                            label="type"
                            isOpen={toolbarDropdown == "type"}
                            items={transactionTypes}
                            setToolbarDropdown={setToolbarDropdown}
                        />
                    </div>
                    <div
                        onClick={() =>
                            setToolbarDropdown(
                                toolbarDropdown === "transaction-date-filter"
                                    ? null
                                    : "transaction-date-filter",
                            )
                        }
                        className="flex items-center justify-center cursor-pointer relative border-2 pl-3 pr-1 py-0.5 rounded-md border-gray-400  hover:bg-gray-100 w-35"
                    >
                        <label className="font-bold text-gray-600 text-base font-[inter] cursor-pointer">
                            {dateFilterInfo.label}
                        </label>
                        <MdArrowDropDown
                            size={30}
                            className={`transition-transform ${toolbarDropdown == "transaction-date-filter" ? "rotate-180" : ""}`}
                        />
                        <FilterDropdown
                            label="transaction-date-filter"
                            isOpen={toolbarDropdown === "transaction-date-filter"}
                            items={dateFilters}
                            setToolbarDropdown={setToolbarDropdown}
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 font-bold font-[inter] text-white rounded-md cursor-pointer flex items-center gap-1 tracking-wide"
                    >
                        <span>
                            <FaPlus className="inline" />
                        </span>{" "}
                        Add Transaction
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TransactionToolbar;
