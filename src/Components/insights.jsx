const Insights = ({ max_Category, total_expense }) => {
    return (
        <section className="w-full flex flex-col justify-center">
            <artical className="w-full flex justify-center">
                <h1 className="text-gray-800 text-3xl font-bold my-8">
                    Summery
                </h1>
            </artical>
            <article className="w-full flex justify-center">
                <div className="w-1/2 shadow-xl rounded-2xl my-2 py-4 flex flex-col justify-center items-center" >
                    <h1 className="font-bold text-xl text-gray-600">Top Spending by category</h1>
                    {max_Category && <>
                        <p>{max_Category.name}</p>
                        <p className="font-bold text-lg text-red-500">₹ {max_Category.value}</p>
                        <p>{((max_Category.value / total_expense) * 100).toFixed(0)}% of total expense</p>
                    </>}
                </div>
            </article>
        </section>
    )
}
export default Insights;