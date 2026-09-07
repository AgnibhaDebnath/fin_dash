import { FilterContext } from "@/context/FilterContext";
import Footer from "../layout/Footer";
import { useContext } from "react";
import { getHighestSpendingHeading } from "@/utils/dashboard/getHighestSpendingHeading";
import { getHighestSpending } from "@/utils/dashboard/getHighestSpending";
import { FaRupeeSign, FaCalendarAlt, FaTrophy } from "react-icons/fa";

import { formatSpendingPeriod } from "@/utils/dashboard/formatSpendingPeriod";
import { getTopSpendingCategory } from "@/utils/dashboard/getTopSpendingCategory";
import { categories } from "@/constants/transaction/categories";
import CardsSkeleton from "./CardsSkeleton";
const Insights = ({ transactions, isLoading }) => {
    const { dashboardDateFilter } = useContext(FilterContext);

    const { highestSpendingPeriod, highestPeriodAmount } = getHighestSpending(
        transactions,
        dashboardDateFilter,
    );
    const { highestSpendingCategory, highestCategoryAmount } = getTopSpendingCategory(transactions);

    const categoryInfo = categories.find((category) => category.value === highestSpendingCategory);
    const Icon = categoryInfo?.icon;
    return (
        <section className="w-full flex flex-col  justify-center mb-5 font-[inter]">
            <artical className="w-full flex justify-center">
                <h1 className="text-gray-800 text-3xl font-bold my-8">Summary</h1>
            </artical>
            <div className="flex justify-center flex-col min-[1000px]:flex-row pl-0 min-[490px]:pl-14 gap-4 min-[490px]:pr-3 pr-0">
                <div className="w-full flex justify-center">
                    <div className="w-10/11 min-[1000px]:w-full shadow-md hover:shadow-lg rounded-2xl my-2 py-4 flex flex-col justify-center items-center">
                        <h4 className="font-bold text-lg text-gray-900">
                            {" "}
                            <FaCalendarAlt className="inline text-blue-500 mb-1.5 mr-2" size={23} />
                            {getHighestSpendingHeading(dashboardDateFilter)}
                        </h4>
                        {isLoading ? (
                            <div className="w-full flex justify-center">
                                <CardsSkeleton />
                            </div>
                        ) : highestPeriodAmount > 0 ? (
                            <>
                                <p className="mt-2">
                                    {formatSpendingPeriod(
                                        highestSpendingPeriod,
                                        dashboardDateFilter,
                                    )}
                                </p>
                                <p className="text-rose-500 text-2xl font-semibold mt-0.5">
                                    <FaRupeeSign size={20} className="inline mb-1" />
                                    {highestPeriodAmount}
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-500">No spending</p>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-10/11 min-[1000px]:w-full shadow-md hover:shadow-lg rounded-2xl my-2 py-4 flex flex-col justify-center items-center">
                        <h4 className="font-bold text-lg text-gray-900">
                            <FaTrophy className="inline text-orange-400 mb-1" size={24} /> Top
                            Spending Category
                        </h4>
                        {isLoading ? (
                            <div className="flex justify-center w-full">
                                <CardsSkeleton />
                            </div>
                        ) : highestSpendingCategory ? (
                            <>
                                <p
                                    className={` font-medium text-[1rem] text-gray-800 tracking-wide mt-2`}
                                >
                                    <Icon
                                        className={`inline mb-1.5 ${categoryInfo?.color}`}
                                        size={20}
                                    />{" "}
                                    {categoryInfo?.label}
                                </p>
                                <p className="text-rose-500 text-2xl font-semibold">
                                    <FaRupeeSign size={20} className="inline mb-1" />
                                    {highestCategoryAmount}
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-500">No expenses recorded</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};
export default Insights;
