import { FaChartPie, FaCalendarAlt, FaInbox, FaUtensils, FaShoppingCart, FaPlane, FaHeartbeat, FaFilm } from "react-icons/fa";

import Footer from "./footer";
const Insights = ({ max_Category, total_expense, month_having_max_expense }) => {
    return (
        <section className="w-full flex flex-col  justify-center mb-5">
            <artical className="w-full flex justify-center">
                <h1 className="text-gray-800 text-3xl font-bold my-8">
                    Summary
                </h1>
            </artical>
            <div className="flex justify-center flex-col min-[1000px]:flex-row pl-0 min-[490px]:pl-14 gap-4 min-[490px]:pr-3 pr-0">
                <article className="w-full flex justify-center">
                    <div className="w-10/11 min-[1000px]:w-full shadow-md hover:shadow-lg rounded-2xl my-2 py-4 flex flex-col justify-center items-center" >
                        <h1 className="font-bold text-xl text-gray-600"><FaChartPie className="inline mb-0.5 text-3xl mr-2" />Top Category Spending</h1>
                        {max_Category ? <>
                            {max_Category.name === "Food" ? <p><FaUtensils className="inline mr-2 text-orange-500 " />{max_Category.name}</p> : max_Category.name === "Shopping" ? <p><FaShoppingCart className="inline mr-2 text-blue-500" />{max_Category.name}</p> : max_Category.name === "Travel" ? <p><FaPlane className="inline text-purple-500 mr-2" />{max_Category.name}</p> : max_Category.name === "Medical" ? <p><FaHeartbeat className="inline text-red-500 mr-2" />{max_Category.name}</p> : max_Category.name === "Entertainment" ? <p><FaFilm className="inline text-pink-500 mr-2" />{max_Category.name}</p> : ""}
                            <p className="font-extrabold text-[1.2rem] text-red-500 font-[Lato]">₹ {max_Category.value}</p>
                            <p className="text-gray-600">{((max_Category.value / total_expense) * 100).toFixed(0)}% of total expense</p>
                            <p className="text-gray-600">Highest spending category</p>
                        </> : <p>No data available</p>}
                    </div>
                </article>
                <article className="w-full flex justify-center">
                    <div className="w-10/11 min-[1000px]:w-full shadow-md hover:shadow-lg rounded-2xl my-2 py-4 flex flex-col justify-center items-center" >
                        <h1 className="font-bold text-xl text-gray-600"><FaCalendarAlt className="inline mr-2 mb-1 text-2xl" />Top Monthly Spending</h1>
                        {month_having_max_expense ? <>
                            <p>{month_having_max_expense.month}</p>
                            <p className="font-extrabold text-[1.2rem] text-red-500 font-[Lato]">₹ {month_having_max_expense.expense}</p>
                            <p className="text-gray-600">{((month_having_max_expense.expense / total_expense) * 100).toFixed(0)}% of total expense</p>
                            <p className="text-gray-600">Peak spending month</p>
                        </> : <p>No data available</p>}
                    </div>
                </article>
            </div>
            <Footer />
        </section>
    )
}
export default Insights;