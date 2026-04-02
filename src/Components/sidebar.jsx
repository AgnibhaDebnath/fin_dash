import { FaHouse } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaUser, FaUserShield, FaEye } from "react-icons/fa";

const SideBar = ({ setActiveTab, activeTab, role, setRole }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (

        <aside className="w-60 left-0 border-t-2  bg-white shadow-2xl h-full flex flex-col  border-gray-400 p-4 ">
            <div className="flex items-center gap-2 py-4 ">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                    <h1 className="font-bold text-2xl font-serif">F</h1>
                </div>
                <span className="text-3xl font-bold">FinDash</span>
            </div>

            <div className="md:hidden">
                <input type="text" placeholder="Search..." className="border-2 rounded-full pl-3 py-0.5 pb-1 text-justify " />
            </div>


            <div className="py-3 flex  items-center ml-2">
                <FaHouse className="inline mr-2" />
                <button onClick={() => setActiveTab("dashboard")} className={`font-medium  hover:scale-105 transition duration-150 cursor-pointer ${activeTab == "dashboard" ? "text-blue-500" : "text-gray-700"}`}>Dashboard</button>
            </div>
            <div className="py-3 flex  items-center ml-2">
                <FaList className="inline mr-2" />
                <button onClick={() => setActiveTab("transactions")} className={`font-medium  hover:scale-105 transition duration-150 cursor-pointer ${activeTab == "transactions" ? "text-blue-500" : "text-gray-700"}`}>Transactions</button>
            </div>
            <div className="relative md:hidden flex items-center ml-2">

                <FaEye className="inline" />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1 px-3 py-2 font-medium cursor-pointer"
                >

                    Viewer
                    <FaChevronDown
                        className={`transition-transform duration-200 mt-1 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>


                {isOpen && (
                    <div className="absolute left-10 w-32 z-50 top-10 flex  flex-col items-start">

                        <button
                            onClick={() => {
                                setRole("user");
                                setIsOpen(false);
                            }}
                            className={`block hover:scale-105 cursor-pointer transition duration-150 ${role == "user" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            <FaUser className="inline mb-2" /> User
                        </button>

                        <button
                            onClick={() => {
                                setRole("admin");
                                setIsOpen(false);
                            }}
                            className={`block hover:scale-105 cursor-pointer transition duration-150 ${role == "admin" ? "text-blue-500" : "text-gray-500"}`}
                        >
                            < FaUserShield className="inline mb-1" /> Admin
                        </button>

                    </div>
                )}
            </div>

        </aside>
    )
}

export default SideBar