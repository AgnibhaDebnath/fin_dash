import { useState } from "react";

import Navbar from "../Components/navbar"
import SideBar from "../Components/sidebar"
import Cards from "../Components/Cards";
import Charts from "../Components/charts";
const DashBoard = () => {
    const [role, setRole] = useState("user");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [transactions, setTransactions] = useState();
    return (
        <div className="h-screen flex flex-col">
            <Navbar role={role} setRole={setRole} activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex flex-1 ">
                <div className="hidden md:block w-60">
                    <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
                </div>
                {activeTab == "dashboard" && <>
                    <Cards />
                    <Charts />
                </>
                }
            </div>

            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    <div className="fixed top-20 left-0 w-60 h-full bg-white shadow-md z-50 md:hidden">
                        <SideBar setActiveTab={setActiveTab} activeTab={activeTab} setRole={setRole} role={role} />
                    </div>
                </>
            )}
        </div>
    )
}

export default DashBoard