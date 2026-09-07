import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import PublicRoute from "./Components/auth/PublicRoute";
import DashBoard from "./Pages/DashBoard";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import { ToastContainer } from "react-toastify";
import TransactionsPage from "./Pages/TransactionsPage";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <>
            <ToastContainer position="top-center" />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/transactions" element={<TransactionsPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
