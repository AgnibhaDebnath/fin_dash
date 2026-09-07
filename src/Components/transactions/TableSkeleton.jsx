import React from "react";

const TableSkeleton = () => {
    return (
        <div className="w-full px-0 min-[400px]:px-2 sm:px-5 lg:px-10">
            <div className="overflow-x-auto hide-scrollbar rounded-xl border p-5 shadow-md">
                <div className="w-full animate-pulse h-45 min-w-240">
                    <div className="h-12 bg-gray-100 mb-3"></div>
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col h-28 w-13/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                        <div className="flex flex-col w-19/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                        <div className="flex flex-col w-15/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                        <div className="flex flex-col w-12/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                        <div className="flex flex-col w-12/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                        <div className="flex flex-col w-15/100 justify-between">
                            <div className="w-full h-3 bg-gray-200 rounded-lg" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                            <div className="w-full h-3 bg-gray-200 rounded-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableSkeleton;
