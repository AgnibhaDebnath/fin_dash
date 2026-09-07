import { useContext } from "react";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { FilterContext } from "@/context/FilterContext";
import { FaChartLine } from "react-icons/fa";
import { getIncomeExpenseData } from "@/utils/dashboard/getIncomeExpenseData";
import { format } from "date-fns";
import { formatNumber } from "@/utils/common/formatNumber";
const ExpenseTrendChart = ({ transactions }) => {
    const { dashboardDateFilter } = useContext(FilterContext);

    let expenseTrendData = [],
        filteredExpenseTrendData = [];

    if (transactions.length > 0) {
        expenseTrendData = getIncomeExpenseData(transactions, dashboardDateFilter);
        filteredExpenseTrendData = expenseTrendData.filter((item) => Number(item.expense) > 0);
    }

    return (
        <>
            {filteredExpenseTrendData?.length > 0 ? (
                <div className="w-full min-[1350px]:w-3/5 h-85 ">
                    <h3 className="text-gray-700 font-bold  text-center text-2xl mb-2">
                        Expense Trend
                    </h3>
                    <ResponsiveContainer
                        initialDimension={{ width: 600, height: 400 }}
                        width="100%"
                        height="100%"
                    >
                        <LineChart data={filteredExpenseTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                tickMargin={8}
                                dataKey={
                                    dashboardDateFilter === "this-month" ||
                                        dashboardDateFilter === "last-month" ||
                                        dashboardDateFilter === "this-week"
                                        ? "day"
                                        : dashboardDateFilter === "all-time"
                                            ? "year"
                                            : "month"
                                }
                                tickFormatter={(value) =>
                                    dashboardDateFilter === "this-month" ||
                                        dashboardDateFilter === "last-month"
                                        ? format(new Date(`${value}`), "dd")
                                        : dashboardDateFilter === "this-week"
                                            ? format(new Date(`${value}`), "EEE")
                                            : dashboardDateFilter === "all-time"
                                                ? format(new Date(`${value}-01-01`), "yyyy")
                                                : format(new Date(`${value}-01`), "MMM")
                                }
                            />

                            <YAxis
                                tickMargin={10}
                                tickFormatter={(value) => `₹${formatNumber(value)}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: "12px", padding: "15px" }}
                                labelFormatter={(value) =>
                                    dashboardDateFilter === "this-month" ||
                                        dashboardDateFilter === "last-month"
                                        ? format(new Date(`${value}`), "dd MMM, yyyy")
                                        : dashboardDateFilter === "this-week"
                                            ? format(new Date(`${value}`), "dd MMM (EEE)")
                                            : dashboardDateFilter === "all-time"
                                                ? format(new Date(`${value}-01`), "yyyy")
                                                : format(new Date(`${value}-01`), "MMM, yyyy")
                                }
                                formatter={(value, name) => [
                                    `₹${value}`,
                                    name === "expense" ? "Expense" : "expense",
                                ]}
                            />
                            <Legend
                                iconSize={20}
                                labelStyle={{
                                    fontWeight: "20px",
                                    fontSize: "1.1rem",
                                    marginLeft: "4px",
                                }}
                                formatter={(value) => {
                                    if (value === "expense") return "Expense";
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#F43F5E"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="w-full min-[1350px]:w-3/5 flex flex-col items-center ">
                    <h3 className="text-gray-700 font-bold text-center text-2xl">Expense Trend</h3>
                    <FaChartLine className="text-5xl mt-5 block text-gray-200" />
                    <h4 className="text-lg text-gray-700 font-medium tracking-wide mt-3">
                        No expense trend data available.
                    </h4>
                    <p className="text-sm min-[390px]:text-base text-gray-600 font-medium mt-4 tracking-wide text-center">
                        Add expense transactions to view your spending trend.
                    </p>
                </div>
            )}
        </>
    );
};

export default ExpenseTrendChart;
