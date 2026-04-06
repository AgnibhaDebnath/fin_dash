import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { cards_data } from "../Data/CardsData";
const Cards = ({ total_income, total_expense, monthly_expense_data }) => {


    return (
        <>
            <div className="w-full min-[1215px]:h-1/5 h-2/5 flex flex-col items-center mt-24 px-4 sm:pl-14 sm:pr-4">
                <h1 className="text-3xl font-bold text-gray-700 py-4">Overview</h1>

                <section className="grid grid-cols-1 min-[1215px]:grid-cols-3 min-[667px]:grid-cols-2 gap-x-4 h-full justify-items-center w-full  pt-3 gap-y-2">

                    {cards_data.map((card_data) => (
                        <article key={card_data.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition h-full w-11/12 min-[480px]:w-4/5 min-[667px]:w-full">
                            <h2 className="text-gray-600"><span className="">{card_data.id == 1 ? <FaArrowUp className="inline mb-1 mr-1 text-green-500" /> : card_data.id == 2 ? <FaArrowDown className="inline mb-1 mr-1 text-red-500" /> : <FaBalanceScale className="inline mb-1 mr-1 text-blue-500" />}</span>{card_data.title}{monthly_expense_data.length != 0 ? ` (Jan - Dec ${monthly_expense_data[0].year})` : ""}</h2>

                            {card_data.id == 1 && total_income != 0 && <p className={`text-xl font-[Lato] font-extrabold tracking-wide ml-4 ${card_data.color}`}>₹{total_income}</p>}

                            {card_data.id == 1 && total_income == 0 && <>
                                <p className={`text-xl font-[Lato] font-extrabold tracking-wide ml-4 ${card_data.color}`}>₹{total_income}</p>
                                <p className="ml-4">No data available</p>
                            </>
                            }

                            {card_data.id == 2 && total_expense != 0 && <p className={`text-xl  tracking-wide font-[Lato] font-extrabold ml-4 ${card_data.color}`}>₹{total_expense}</p>}
                            {card_data.id == 2 && total_expense == 0 && <>
                                <p className={`text-xl font-[Lato] font-extrabold tracking-wide  ml-4 ${card_data.color}`}>₹{total_expense}</p>
                                <p className="ml-4">No data available</p>
                            </>}

                            {card_data.id == 3 && <p className={`text-xl tracking-wide ml-4 font-[Lato] font-extrabold ${card_data.color}`}>₹{total_income - total_expense}</p>}
                        </article>))}
                </section>
            </div>
        </>
    )
}
export default Cards