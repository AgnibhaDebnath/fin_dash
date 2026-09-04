import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import { useCallback, useContext } from "react";
export function useApiError() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    return useCallback(
        (err) => {
            if (err instanceof TypeError) {
                toast.error("Unable to connect. Please check your internet connection.");
                return;
            }

            if (err.status === 401) {
                toast.error(err.message);
                logout();
                navigate("/login", { replace: true });
                return;
            }

            toast.error(err.message);
        },
        [logout, navigate],
    );
}
