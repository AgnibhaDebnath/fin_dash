import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, PieChart, Pie, Sector, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"

import { COLORS } from "../Data/ChartsData";
import { FaChartLine, FaChartPie, FaChartBar } from "react-icons/fa";
const Charts = ({ expense_category, monthly_expense_data, monthly_income_data, total_expense }) => {


    const isMobile = window.innerWidth < 640;

    const mergeData = (monthly_income_data, monthly_expense_data) => {
        const map = new Map();


        monthly_income_data.forEach(item => {
            const key = `${item.month}-${item.year}`;
            map.set(key, {
                month: item.month,
                year: item.year,
                income: item.income,
                expense: 0
            });
        });


        monthly_expense_data.forEach(item => {
            const key = `${item.month}-${item.year}`;

            if (map.has(key)) {
                map.get(key).expense = item.expense;
            } else {
                map.set(key, {
                    month: item.month,
                    year: item.year,
                    income: 0,
                    expense: item.expense
                });
            }
        });

        return Array.from(map.values());
    };

    const monthly_income_vs_expense_data = mergeData(monthly_income_data, monthly_expense_data);



    return (
        <section className="mt-6 py-4 pb-10 pr-4 sm:pl-14 shadow-2xl ">
            {monthly_income_vs_expense_data.length > 0 && <div className="flex justify-center">
                <h2 className="text-[1rem] font-semibold mb-2 text-gray-700 text-center">
                    Monthly Income vs Expense(Jan - Dec {monthly_income_vs_expense_data.length != 0 ? monthly_income_vs_expense_data[0].year : ""})
                </h2>
            </div>}
            {monthly_income_vs_expense_data.length > 0 ? <article className="w-full h-75">
                < ResponsiveContainer width="100 %" height="100%">
                    <BarChart data={monthly_income_vs_expense_data} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                        <Tooltip contentStyle={{ borderRadius: "10px", border: "none" }}
                            formatter={(value, name) => [
                                `₹${value}`,
                                name === "income" ? "Income" : "Expense"
                            ]} />
                        <Legend />
                        <Bar animationDuration={800} dataKey="income" fill="#22C55E " radius={[2, 2, 0, 0]} />
                        <Bar animationDuration={800} dataKey="expense" fill="#F43F5E" radius={[2, 2, 0, 0]} />

                    </BarChart>
                </ResponsiveContainer>
            </article> : <>
                <div className="w-full  my-5 flex flex-col items-center justify-end ">
                    <FaChartBar className="text-5xl mb-3 block text-gray-700" />
                    <h1 className="font-medium text-gray-800">No monthly income vs expense trend available</h1>
                </div>
            </>
            }

            <div className="w-full flex flex-col items-center justify-evenly min-[1250px]:flex-row min-[1250px]:gap-0 gap-10">
                {monthly_expense_data.length > 0 ? < article className="w-full min-[1250px]:w-3/5 h-65" >
                    <h2 className="text-gray-700 font-semibold mb-6 text-center">
                        Monthly Expenses(Jan - Dec {monthly_expense_data.length != 0 ? monthly_expense_data[0].year : ""})
                    </h2>
                    < ResponsiveContainer width="100 %" height="100%">
                        <LineChart data={monthly_expense_data} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="expense" stroke="#F43F5E" strokeWidth={3}
                                dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </article > :
                    <article className="w-full min-[1250px]:w-3/5 my-5 flex flex-col items-center justify-end ">
                        <FaChartLine className="text-5xl mb-3 block text-gray-700" />
                        <h1 className="text-[1.1rem] font-medium text-gray-900">No expense trend available</h1>
                        <h1 className="text-sm text-gray-600 font-medium">Add transactions to see monthly spending</h1>
                    </article>
                }

                {expense_category.length > 0 ? <article className="flex items-center flex-col h-85 w-full  min-[1250px]:w-2/5 pt-8">
                    <div className="">
                        <h2 className="text-gray-700 font-semibold  text-center">
                            Expense Breakdown
                            (Jan - Dec {monthly_expense_data.length != 0 ? monthly_expense_data[0].year : ""})
                        </h2>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                            <Pie data={expense_category}
                                dataKey="value"
                                outerRadius={isMobile ? 60 : 90}
                                innerRadius={isMobile ? 35 : 50}
                                paddingAngle={3}
                                cx="50%"


                                label={({ name, percent }) =>
                                    (percent * 100).toFixed(0) > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : `Others ${(percent * 100).toFixed(0)}%`
                                }
                                fontFamily="mono"

                                fontSize={isMobile ? 12 : 15}
                                isAnimationActive={true}
                                shape={(props) => {
                                    const { fill, ...rest } = props;

                                    return <Sector {...rest} fill={COLORS[props.index % COLORS.length]} />;
                                }} />

                            <text
                                x="50%"
                                y={isMobile ? "40%" : "48%"}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm md:text-[1.2rem] font-extrabold font-[Lato] fill-gray-500"
                            >
                                ₹{total_expense}
                            </text>
                            <Tooltip contentStyle={{ borderRadius: "10px" }}
                                formatter={(value, name) => {
                                    const index = expense_category.findIndex(
                                        item => item.name === name
                                    );
                                    const color = COLORS[index % COLORS.length];
                                    return [
                                        <span style={{ color, fontWeight: "bold", fontFamily: "Lato" }}>
                                            ₹{value}
                                        </span>,
                                        name
                                    ];
                                }}
                            />
                            <Legend
                                content={({ payload }) => (
                                    <div className="flex gap-4 justify-center flex-wrap">
                                        {payload.map((entry, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        backgroundColor: COLORS[index % COLORS.length]
                                                    }}
                                                />
                                                <span style={{ color: COLORS[index % COLORS.length] }}>
                                                    {entry.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </article> :
                    <article className="flex items-center flex-col my-5 w-full  min-[1250px]:w-2/5  justify-end ">
                        <FaChartPie className="text-5xl mb-3 text-gray-700" />
                        <p className="text-lg font-medium text-gray-900">No expense categories yet</p>
                        <p className="text-sm font-medium text-gray-500">Add expenses to see breakdown</p>
                    </article>
                }
            </div>
        </section >
    )
}
export default Charts