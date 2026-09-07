import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const checkAuth = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (res.status == 401) {
                setUser(null);
                setIsAuthenticated(data.success);
                return;
            }

            setUser(data.user);
            setIsAuthenticated(data.success);
        } catch (err) {
            console.log(err);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const channel = new BroadcastChannel("auth");

        channel.onmessage = (event) => {
            if (event.data === "logout") {
                setIsAuthenticated(false);
            }
        };

        return () => channel.close();
    }, []);

    const logout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Logout failed");
            }
            setUser(null);
            setIsAuthenticated(false);
            const data = await res.json();
            toast.success(data.message);

            const channel = new BroadcastChannel("auth");
            channel.postMessage("logout");
            channel.close();
            await checkAuth();
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
