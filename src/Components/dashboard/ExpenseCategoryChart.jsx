import { Tooltip, PieChart, Pie, Sector, ResponsiveContainer, Curve, Label } from "recharts";
import { FaChartPie } from "react-icons/fa";
import { CATEGORY_COLORS } from "@/constants/dashboard/chartsData";
import { getExpenseByCategory } from "@/utils/dashboard/getExpenseByCategory";

const ExpenseCategoryChart = ({ transactions }) => {
    const isMobile = window.innerWidth < 640;
    const outerRadius = isMobile ? 65 : 90;
    const innerRadius = outerRadius * 0.6;

    const expenseByCategory = getExpenseByCategory(transactions);

    const totalExpense = transactions.reduce((sum, transaction) => {
        if (transaction.type != "expense") return sum;
        return (sum += Number(transaction.amount));
    }, 0);
    return (
        <>
            {expenseByCategory.length > 0 ? (
                <div className="flex items-center flex-col h-100 w-full min-[1350px]:w-2/5 pt-8">
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-2xl  text-center">
                            Expense by Category
                        </h3>
                    </div>
                    <ResponsiveContainer
                        initialDimension={{ width: 600, height: 400 }}
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={expenseByCategory}
                                dataKey="amount"
                                nameKey="category"
                                outerRadius={outerRadius}
                                innerRadius={innerRadius}
                                paddingAngle={3}
                                cx="50%"
                                cy="50%"
                                label={({ x, y, textAnchor, name, percent }) => {
                                    if (percent < 0.04) return null;

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            textAnchor={textAnchor}
                                            dominantBaseline="middle"
                                            fill="#111827"
                                            fontSize={15}
                                        >
                                            <tspan x={x} fontWeight="700">
                                                {name.charAt(0).toUpperCase() + name.slice(1)}
                                            </tspan>

                                            <tspan
                                                x={x}
                                                dy="18"
                                                fontWeight="400"
                                                fill="#6B7280"
                                                fontSize={13}
                                            >
                                                {(percent * 100).toFixed(0)}%
                                            </tspan>
                                        </text>
                                    );
                                }}

                                labelLine={(props) => {
                                    if (props.percent < 0.04) return null;

                                    const { key, ...rest } = props;

                                    return <Curve key={key} {...rest} />;
                                }}
                                fontSize={15}
                                isAnimationActive={true}
                                shape={(props) => {
                                    const { fill, ...rest } = props;

                                    return (
                                        <Sector
                                            {...rest}
                                            fill={CATEGORY_COLORS[props.payload.category]}
                                        />
                                    );
                                }}
                            />
                            <Label
                                content={({ viewBox }) => {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="font-semibold"
                                            fill="#374151"
                                            fontSize={isMobile ? 16 : 20}
                                        >
                                            ₹{totalExpense.toLocaleString()}
                                        </text>
                                    );
                                }}
                            />

                            <Tooltip
                                contentStyle={{ borderRadius: "10px" }}
                                formatter={(value, name) => [
                                    `₹${Number(value).toLocaleString("en-IN")}`,
                                    name.charAt(0).toUpperCase() + name.slice(1),
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4">
                        {expenseByCategory.map((item) => (
                            <div key={item.category} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: CATEGORY_COLORS[item.category],
                                    }}
                                />

                                <span className="capitalize text-gray-700 text-sm">
                                    {item.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center flex-col mt-0 max-[1350px]:mt-10 w-full min-[1350px]:w-2/5  ">
                    <h3 className="text-gray-700 font-bold text-2xl  text-center">
                        Expense by Category
                    </h3>
                    <FaChartPie className="text-5xl mt-6 text-gray-200" />
                    <p className="text-lg font-medium text-gray-700 mt-3">
                        No expense categories yet
                    </p>
                    <p className="text-base font-medium text-gray-500 mt-3">
                        Add expenses to see breakdown
                    </p>
                </div>
            )}
        </>
    );
};

export default ExpenseCategoryChart;
