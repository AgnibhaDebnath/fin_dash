const Cards = () => {
    const cards_data = [{
        id: 1,
        title: "Total Income",
        value: "₹5000",
        color: "text-green-600"
    },
    {
        id: 2,
        title: "Expenses",
        value: "₹2000",
        color: "text-red-500"
    },
    {
        id: 3,
        title: "Balance",
        value: "₹3000",
        color: "text-blue-500"
    }]

    return (
        <>
            <div className="w-full min-[1215px]:h-1/5 h-1/2 flex flex-col items-center mt-2.5">
                <h1 className="text-3xl font-bold text-gray-700">Overview</h1>
                <section className="grid grid-cols-1 min-[1215px]:grid-cols-3 min-[667px]:grid-cols-2 gap-4    justify-items-center w-full pt-8 px-8 h-full ">

                    {cards_data.map((card_data) => (<article key={card_data.id} className="bg-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition min-[667px]:h-4/5 min-[1215px]:h-full w-4/5 min-[667px]:w-full">
                        <h2 className="text-gray-600">{card_data.title}</h2>
                        <p className={`text-xl font-bold ${card_data.color}`}>{card_data.value}</p>
                    </article>))}
                </section>
            </div>
        </>
    )
}
export default Cards