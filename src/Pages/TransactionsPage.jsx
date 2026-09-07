import { useEffect, useState, useContext, useMemo } from "react";

import TransactionToolbar from "../Components/transactions/TransactionToolbar";
import TransactionTable from "../Components/transactions/TransactionTable";
import TransactionForm from "../Components/transactions/TransactionForm";
import DeleteTransactionDialog from "../Components/transactions/DeleteTransactionDialog";
import { fetchTransactions } from "@/services/transaction.service";
import { FilterContext } from "@/context/FilterContext";
import { toast } from "react-toastify";
import { useApiError } from "@/hooks/useApiError";
const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [debouncedSearch, setDebouncedSerach] = useState("");
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction you want to delete
    const [totalTransactionsAllOverTime, setTotalTransactionsAllOverTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const handleApiError = useApiError();
    const { transactionFilters } = useContext(FilterContext);

    const TRANSACTIONS_PER_PAGE = 10;

    const params = useMemo(() => {
        return new URLSearchParams({
            type: transactionFilters.type,
            category: transactionFilters.category,
            search: debouncedSearch,
            page: currentPage,
            dateFilter: transactionFilters.dateFilter,
        });
    }, [
        transactionFilters.type,
        transactionFilters.category,
        debouncedSearch,
        currentPage,
        transactionFilters.dateFilter,
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSerach(transactionFilters.search);
        }, 1000);
        return () => clearTimeout(timer);
    }, [transactionFilters.search]);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTransactions(params);
                setTransactions(data.transactions);
                setTotalTransactions(data.totalTransactions);
                setTotalTransactionsAllOverTime(data.totalTransactionsAllOverTime);
                setIsLoading(false);
            } catch (err) {
                handleApiError(err);
            }
        };

        loadTransactions();
    }, [params, handleApiError]);

    const lastPage = Math.max(1, Math.ceil(totalTransactions / TRANSACTIONS_PER_PAGE));
    useEffect(() => {
        if (currentPage > lastPage) {
            setCurrentPage(lastPage);
        }
    }, [currentPage, lastPage]);

    const handleDeleteTransaction = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/transaction/${selectedTransaction._id}`,
                {
                    credentials: "include",
                    method: "DELETE",
                },
            );
            const data = await res.json();

            if (!res.ok) {
                const error = new Error(data.message);
                error.status = res.status;
                throw error;
            }

            toast.success(data.message);
            setIsDeleteDialogOpen(false);
            setIsLoading(true);
            const { transactions, totalTransactions, totalTransactionsAllOverTime } =
                await fetchTransactions(params);
            setTransactions(transactions);
            setTotalTransactions(totalTransactions);
            setTotalTransactionsAllOverTime(totalTransactionsAllOverTime);
            setIsLoading(false);
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <>
            <TransactionToolbar setIsFormOpen={setIsFormOpen} />

            <TransactionTable
                totalTransactions={totalTransactions}
                totalTransactionsAllOverTime={totalTransactionsAllOverTime}
                lastPage={lastPage}
                transactions={transactions}
                setEditingTransaction={setEditingTransaction}
                setIsFormOpen={setIsFormOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                setSelectedTransaction={setSelectedTransaction}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
            />
            <TransactionForm
                params={params}
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                editingTransaction={editingTransaction}
                setEditingTransaction={setEditingTransaction}
                setTransactions={setTransactions}
                setTotalTransactions={setTotalTransactions}
            />
            <DeleteTransactionDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                handleDeleteTransaction={handleDeleteTransaction}
            />
        </>
    );
};

export default TransactionsPage;
