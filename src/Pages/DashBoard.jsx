import { useState, useEffect, useContext, useMemo } from "react";
import DashboardCards from "@/Components/dashboard/DashboardCards";
import IncomeExpenseChart from "@/Components/dashboard/IncomeExpenseChart";

import { fetchTransactions } from "@/services/transaction.service";
import { FilterContext } from "@/context/FilterContext";
import ExpenseTrendChart from "@/Components/dashboard/ExpenseTrendChart";
import ExpenseCategoryChart from "@/Components/dashboard/ExpenseCategoryChart";
import Insights from "@/Components/dashboard/Insights";
import { useApiError } from "@/hooks/useApiError";
const DashBoard = () => {
    console.log("Dashboard rendered");
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleApiError = useApiError();
    const { dashboardDateFilter } = useContext(FilterContext);

    const params = useMemo(() => {
        return new URLSearchParams({
            dateFilter: dashboardDateFilter,
        });
    }, [dashboardDateFilter]);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTransactions(params);

                setTransactions(data.transactions);
                setIsLoading(false);
            } catch (err) {
                handleApiError(err);
            }
        };

        loadTransactions();
    }, [dashboardDateFilter, params, handleApiError]);

    return (
        <>
            <div className="flex flex-col w-full">
                <DashboardCards isLoading={isLoading} transactions={transactions} />
                <IncomeExpenseChart isLoading={isLoading} transactions={transactions} />
                <section className="py-10 mt-10 pr-5 shadow-2xl ">
                    <div className="w-full flex flex-col items-center min-[1350px]:flex-row min-[1350px]:gap-x-2 gap-y-10 font-[inter]">
                        <ExpenseTrendChart transactions={transactions} />
                        <ExpenseCategoryChart transactions={transactions} />
                    </div>
                </section>
                <Insights transactions={transactions} isLoading={isLoading} />
            </div>
        </>
    );
};

export default DashBoard;
