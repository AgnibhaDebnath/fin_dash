import { useContext, useState } from "react";

import { FaArrowUp, FaArrowDown, FaBalanceScale, FaRupeeSign, FaMinus } from "react-icons/fa";

import { MdArrowDropDown } from "react-icons/md";
import { cards_data } from "@/constants/dashboard/cardsData";
import { calculateSummary } from "@/utils/dashboard/calculateSummary";
import FilterDropdown from "../common/FilterDropdown";
import { dateFilters } from "@/constants/common/dateFilters";
import { FilterContext } from "@/context/FilterContext";
import CardsSkeleton from "./CardsSkeleton";
const DashboardCards = ({ isLoading, transactions }) => {
    const { income, expense, balance } = calculateSummary(transactions);
    const [dashboardFilterDropdown, setDashboardFilterDropdown] = useState(null);
    const { dashboardDateFilter } = useContext(FilterContext);
    const dateFilterInfo = dateFilters.find(
        (dateFilter) => dateFilter.value === dashboardDateFilter,
    );
    return (
        <>
            <div className="w-full min-[1215px]:h-1/5 h-2/5 flex flex-col items-center mt-24 px-4 sm:pl-14 sm:pr-4 font-[inter] relative justify-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-700 py-4">Overview</h1>
                </div>

                <div
                    onClick={() =>
                        setDashboardFilterDropdown(
                            dashboardFilterDropdown === "dashboard-date-filter"
                                ? null
                                : "dashboard-date-filter",
                        )
                    }
                    className="flex items-center justify-center cursor-pointer  border-2 pl-3 pr-1 py-0.5 rounded-md border-gray-400  hover:bg-gray-100 w-35 h-9 absolute  right-5 top-20 min-[570px]:top-10 min-[768px]:top-20 min-[850px]:top-10 "
                >
                    <label className="font-bold text-gray-600 text-base font-[inter] cursor-pointer">
                        {dateFilterInfo.label}
                    </label>
                    <MdArrowDropDown
                        size={30}
                        className={`transition-transform ${dashboardFilterDropdown == "dashboard-date-filter" ? "rotate-180" : ""}`}
                    />
                    <FilterDropdown
                        label="dashboard-date-filter"
                        isOpen={dashboardFilterDropdown === "dashboard-date-filter"}
                        items={dateFilters}
                        setDashboardFilterDropdown={setDashboardFilterDropdown}
                    />
                </div>

                <section className="grid grid-cols-1 min-[1215px]:grid-cols-3 min-[667px]:grid-cols-2 gap-x-4 h-full justify-items-center w-full  pt-3 gap-y-10 min-[667px]:gap-y-5 mt-10 min-[570px]:mt-0 min-[768px]:mt-10 min-[850px]:mt-0">
                    {cards_data.map((card_data) => (
                        <article
                            key={card_data.id}
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition h-full w-11/12 min-[480px]:w-4/5 min-[667px]:w-full"
                        >
                            <h2 className="text-gray-600 font-semibold text-xl">
                                <span className="">
                                    {card_data.id == 1 ? (
                                        <FaArrowUp className="inline mb-1 mr-1 text-green-500 text-2xl" />
                                    ) : card_data.id == 2 ? (
                                        <FaArrowDown className="inline mb-1 mr-1 text-red-500 text-2xl" />
                                    ) : (
                                        <FaBalanceScale className="inline mb-1 mr-1 text-blue-600 text-2xl" />
                                    )}
                                </span>
                                {card_data.title}
                            </h2>

                            {isLoading ? (
                                <CardsSkeleton />
                            ) : card_data.id == 1 && income != 0 ? (
                                <p
                                    className={`text-2xl font-extrabold tracking-wide ml-4 text-green-500 items-center`}
                                >
                                    <FaRupeeSign className="inline mb-1" size={22} />{" "}
                                    {income.toLocaleString("en-IN")}
                                </p>
                            ) : card_data.id === 1 && income === 0 ? (
                                <>
                                    <p
                                        className={`text-2xl font-extrabold tracking-wide ml-4 text-green-500`}
                                    >
                                        <FaRupeeSign className="inline mb-1" size={22} /> {income}
                                    </p>
                                    <p className="ml-4">No data available</p>
                                </>
                            ) : card_data.id == 2 && expense != 0 ? (
                                <p
                                    className={`text-2xl  tracking-wide font-extrabold ml-4 text-red-500`}
                                >
                                    <FaRupeeSign className="inline mb-1" size={22} />{" "}
                                    {expense.toLocaleString("en-IN")}
                                </p>
                            ) : card_data.id == 2 && expense == 0 ? (
                                <>
                                    <p
                                        className={`text-2xl font-extrabold tracking-wide  ml-4 text-red-500`}
                                    >
                                        {" "}
                                        <FaRupeeSign className="inline mb-1" size={22} /> {expense}
                                    </p>
                                    <p className="ml-4">No data available</p>
                                </>
                            ) : (
                                card_data.id == 3 && (
                                    <p
                                        className={`text-2xl tracking-wide ml-4 font-extrabold ${balance > 0 ? "text-green-500" : balance < 0 ? "text-red-500" : "text-blue-600"}`}
                                    >
                                        <FaRupeeSign className="inline mb-1" size={22} />
                                        {balance < 0 && (
                                            <FaMinus className="inline mb-1" size={18} />
                                        )}
                                        {Math.abs(balance).toLocaleString("en-IN")}
                                    </p>
                                )
                            )}
                        </article>
                    ))}
                </section>
            </div>
        </>
    );
};
export default DashboardCards;
