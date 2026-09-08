import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations/variants";
import { FilterContext } from "@/context/FilterContext";

const FilterDropdown = ({
    label,
    items,
    isOpen,
    setToolbarDropdown,
    setFormDropdown,
    setDashboardFilterDropdown,
    handleTypeChange,
    handleCategoryChange,
}) => {
    const { setTransactionFilters, setDashboardDateFilter } = useContext(FilterContext);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}

                    className={`absolute top-10 w-40 py-2 rounded-xl border border-gray-200 bg-white shadow-lg z-10 font-[inter] overflow-hidden`}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`${label == "category-form" ? "max-h-50 overflow-y-auto " : "overflow-y-auto max-h-90"} hide-scrollbar`}
                    >
                        {items.map((item) => {
                            const Icon = item.icon;
                            if (
                                (label === "category-form" && item.value === "all categories") ||
                                (label === "type-form" && item.value === "all types")
                            ) {
                                return null;
                            }
                            return (
                                <>

                                    <motion.button
                                        key={item.id}
                                        variants={itemVariants}
                                        type="button"
                                        className=" w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center font-medium"
                                        onClick={() => {
                                            if (label === "category") {
                                                setTransactionFilters((prev) => ({
                                                    ...prev,
                                                    category: item.value,
                                                }));
                                                setToolbarDropdown(null);
                                            } else if (label === "type") {
                                                setTransactionFilters((prev) => ({
                                                    ...prev,
                                                    type: item.value,
                                                }));
                                                setToolbarDropdown(null);
                                            } else if (label === "transaction-date-filter") {
                                                setTransactionFilters((prev) => ({
                                                    ...prev,
                                                    dateFilter: item.value,
                                                }));
                                                setToolbarDropdown(null);
                                            } else if (label === "category-form") {
                                                handleCategoryChange(item.value);
                                                setFormDropdown(null);
                                            } else if (label === "type-form") {
                                                handleTypeChange(item.value);
                                                handleCategoryChange("all categories");
                                                setFormDropdown(null);
                                            } else if (label === "dashboard-date-filter") {
                                                setDashboardDateFilter(item.value);
                                                setDashboardFilterDropdown(null);
                                            }
                                        }}
                                    >
                                        <Icon className={` ${item.color} inline mr-2`} size={18} />
                                        {item.label}
                                    </motion.button>
                                    <hr />
                                </>
                            );
                        })}
                    </motion.div>
                    {(label === "category-form" || label == "Category") && (
                        <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-white to-transparent" />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FilterDropdown;
