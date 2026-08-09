import React, { useContext } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"

import { getIncomeExpenseData } from '@/utils/dashboard/getIncomeExpenseData';
import { format } from 'date-fns';
import { FilterContext } from '@/context/FilterContext';
import { FaChartBar } from 'react-icons/fa';
import ChartSkeleton from "./ChartsSkeleton";
const IncomeExpenseChart = ({ transactions, isLoading }) => {
    const { dashboardDateFilter } = useContext(FilterContext);
    const income_vs_expense_data = getIncomeExpenseData(transactions, dashboardDateFilter);



    return (
        <section className='mt-6 py-4 pb-10 pr-4 sm:pl-14 shadow-2xl font-[inter]'>
            {isLoading ? <ChartSkeleton /> : transactions != 0 ? <div className="w-full h-80 mb-20">

                < div className="flex justify-center w-full">
                    <h3 className="text-2xl font-bold mb-2 text-gray-700 text-center pb-5">
                        Income vs Expenses
                    </h3>
                </div>


                < ResponsiveContainer initialDimension={{ width: 600, height: 400 }} width="100%" height="100%">
                    <BarChart data={income_vs_expense_data} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tickMargin={8} dataKey={(dashboardDateFilter === "this-month" || dashboardDateFilter === "last-month" || dashboardDateFilter === "this-week") ? "day" : dashboardDateFilter === "all-time" ? "year" : "month"}
                            tickFormatter={(value) =>
                                (dashboardDateFilter === "this-month" || dashboardDateFilter === "last-month") ?
                                    format(new Date(`${value}`), "dd")
                                    : dashboardDateFilter === "this-week" ?
                                        format(new Date(`${value}`), "EEE") :
                                        dashboardDateFilter === "all-time" ?
                                            format(new Date(`${value}-01-01`), "yyyy") :
                                            format(new Date(`${value}-01`), "MMM")} />

                        <YAxis tickMargin={10} tickFormatter={(value) => `₹${value / 1000}k`} />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "none", padding: "15px" }}
                            labelFormatter={(value) =>
                                (dashboardDateFilter === "this-month" || dashboardDateFilter === "last-month") ?
                                    format(new Date(`${value}`), "dd MMM, yyyy")
                                    : dashboardDateFilter === "this-week" ? format(new Date(`${value}`), "dd MMM (EEE)") :
                                        dashboardDateFilter === "all-time" ?
                                            format(new Date(`${value}-01`), "yyyy") :
                                            format(new Date(`${value}-01`), "MMM, yyyy")
                            }

                            formatter={(value, name) => [
                                `₹${value}`,
                                name === "income" ? "Income" : "Expense"
                            ]} />
                        <Legend formatter={(value) => {
                            if (value === "income") return "Income";
                            if (value === "expense") return "Expense";
                            return value;
                        }} />
                        <Bar animationDuration={800} dataKey="income" fill="#22C55E " radius={[2, 2, 0, 0]} />
                        <Bar animationDuration={800} dataKey="expense" fill="#F43F5E" radius={[2, 2, 0, 0]} />

                    </BarChart>
                </ResponsiveContainer>
            </div> :
                <>
                    <div className="w-full my-5 flex flex-col items-center justify-end ">
                        < div className="flex justify-center w-full">
                            <h3 className="text-[1.5rem] font-bold mb-2 text-gray-700 text-center pb-5">
                                Income vs Expenses
                            </h3>
                        </div>
                        <FaChartBar className="text-5xl mb-3 block text-gray-300" />
                        <h4 className="font-medium text-[1.1rem] text-gray-700 tracking-wide">No income vs expense data available</h4>
                        <p className='text-gray-600 mt-4 text-base tracking-wide'>Add transactions to view your income and expense trends.</p>
                    </div>
                </>
            }
        </section >
    )
}

export default IncomeExpenseChart