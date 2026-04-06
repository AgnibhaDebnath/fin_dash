import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, PieChart, Pie, Sector, ResponsiveContainer } from "recharts"
import { COLORS } from "../Data/ChartsData";
import { FaChartLine, FaChartPie } from "react-icons/fa";
const Charts = ({ expense_category, monthly_expense_data }) => {

    const isMobile = window.innerWidth < 640;

    return (
        <section className="mt-6 flex flex-col items-center justify-evenly min-[1250px]:flex-row pr-4 sm:pl-14 shadow-2xl mx-1 py-4 gap-10  min-[1250px]:gap-0">
            {monthly_expense_data.length > 0 ? < article className="w-full min-[1250px]:w-3/5 h-65" >
                <h2 className="text-gray-700 font-semibold mb-2 text-center">
                    Monthly Expenses(Jan - Dec {monthly_expense_data.length != 0 ? monthly_expense_data[0].year : ""})
                </h2>
                < ResponsiveContainer width="100 %" height="100%">
                    <LineChart data={monthly_expense_data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="expense" stroke="#3b82f6" strokeWidth={3}
                            dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </article > :
                <article className="w-full min-[1250px]:w-3/5 h-65 flex flex-col items-center justify-center">
                    <FaChartLine className="text-5xl mb-3 block text-gray-700" />
                    <h1 className="text-[1.1rem] font-medium text-gray-900">No expense trend available</h1>
                    <h1 className="text-sm text-gray-600 font-medium">Add transactions to see monthly spending</h1>
                </article>
            }

            {expense_category.length > 0 ? <article className="flex items-center flex-col h-79 w-full  min-[1250px]:w-2/5 pt-8">
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
                                `${name} ${(percent * 100).toFixed(0)}%`
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
                            y="52%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[1.2rem] font-extrabold font-[Lato] fill-gray-500"
                        >
                            ₹1000
                        </text>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </article> :
                <article className="flex items-center flex-col h-79 w-full  min-[1250px]:w-2/5  justify-center">
                    <FaChartPie className="text-5xl mb-3 text-gray-700" />
                    <p className="text-lg font-medium text-gray-900">No category data</p>
                    <p className="text-sm font-medium text-gray-500">Add expenses to see breakdown</p>
                </article>
            }
        </section >
    )
}
export default Charts