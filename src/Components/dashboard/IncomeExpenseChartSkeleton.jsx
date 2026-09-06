const IncomeExpenseChartSkeleton = () => {
    return (
        <div className=" w-full">
            <div className="flex justify-center w-full">
                <h3 className="text-2xl font-bold text-gray-700 text-center">Income vs Expenses</h3>
            </div>
            <div className="flex pt-6 animate-pulse h-70">
                {/* Y-axis labels */}
                <div className="w-15 flex justify-between">
                    <div className="flex w-10 flex-col justify-between pb-7">
                        <div className="h-3 w-8 rounded bg-gray-200" />
                        <div className="h-3 w-8 rounded bg-gray-200" />
                        <div className="h-3 w-8 rounded bg-gray-200" />
                        <div className="h-3 w-8 rounded bg-gray-200" />
                        <div className="h-3 w-8 rounded bg-gray-200" />
                    </div>
                    <div className="h-57 w-0.5 bg-gray-200"></div>
                </div>
                {/* Chart area */}
                <div className="relative flex flex-1 flex-col">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-x-0 top-0 border-t border-gray-100" />
                    <div className="absolute inset-x-0 top-23/100 border-t border-gray-100" />
                    <div className="absolute inset-x-0 top-44/100 border-t border-gray-100" />
                    <div className="absolute inset-x-0 top-65/100 border-t border-gray-100" />

                    {/* Bars */}
                    <div className="relative flex flex-1 items-end justify-around px-6">
                        <div className="flex h-1/2 items-end gap-x-2">
                            <div className="w-2 min-[450px]:w-4 min-[860px]:w-9 h-full rounded-t bg-gray-200" />
                            <div className="h-2/5 w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>
                        <div className="flex h-4/5 items-end gap-x-2">
                            <div className="h-2/5 w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                            <div className="h-4/5 w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>
                        <div className="flex h-1/4 items-end gap-x-2">
                            <div className="h-full w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                            <div className="h-[45%] w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>
                        <div className="flex h-full items-end gap-x-2">
                            <div className="h-full w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                            <div className="h-[75%] w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>
                        <div className="flex h-4/5 items-end gap-x-2">
                            <div className="h-[75%] w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                            <div className="h-full w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>

                        <div className="flex h-4/5 items-end gap-x-2">
                            <div className="h-[60%] w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                            <div className="h-[40%] w-2 min-[450px]:w-4 min-[860px]:w-9 rounded-t bg-gray-200" />
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="h-7.5 flex flex-col justify-between">
                        <div className="w-full h-0.5 bg-gray-200"></div>
                        <div className="flex justify-around px-6">
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                            <div className="h-3 w-6 min-[450px]:w-8 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseChartSkeleton;
