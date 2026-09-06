import { NavLink } from "react-router";
import Logo from "../../assets/logo.svg";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { PiSquaresFourFill } from "react-icons/pi";
import { FaExchangeAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
const SideBar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <aside className="w-60 left-0 fixed bg-white shadow-2xl h-[calc(100vh-4rem)] flex flex-col p-4 top-22 min-[768px]:top-20 font-[inter] justify-between pb-10">
            <div>
                <div className="flex items-center gap-2 py-4 ">
                    <div>
                        <img src={Logo} alt="Application Logo" className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold">
                        Expense<span className="text-indigo-600">Flow</span>
                    </h2>
                </div>
                <hr />

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `py-3.5 flex items-center px-3 mt-2 rounded-md transition duration-300 hover:scale-105 ${
                            isActive
                                ? "bg-indigo-50 text-indigo-600"
                                : "hover:bg-gray-100 text-gray-600"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <PiSquaresFourFill
                                className={`mr-2 ${isActive ? "text-indigo-600" : "text-gray-600"}`}
                                size={21}
                            />
                            <span
                                className={`font-medium tracking-wide text-[1.1rem]  ${
                                    isActive ? "text-indigo-600" : "text-gray-500"
                                }`}
                            >
                                Dashboard
                            </span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `py-3.5 flex items-center px-3 mt-2 rounded-md
                transition duration-300 hover:scale-105 ${
                    isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100 text-gray-600"
                }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <FaExchangeAlt
                                className={`mr-2 ${isActive ? "text-indigo-600" : "text-gray-600"}`}
                                size={16}
                            />
                            <span
                                className={`font-medium tracking-wide text-[1.1rem] ${
                                    isActive ? "text-indigo-600" : "text-gray-500"
                                }`}
                            >
                                Transactions
                            </span>
                        </>
                    )}
                </NavLink>
            </div>
            <div className="min-[768px]:hidden">
                <div className="flex flex-col pl-4 ">
                    <div className="flex gap-x-2 items-center">
                        <FaUser />
                        <span className="font-semibold">{user.fullName}</span>
                    </div>
                    <span className="font-medium text-sm ml-6">{user.email}</span>
                </div>
                <hr className="mt-2" />
                <button className=" w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center font-medium rounded-md mt-2">
                    <FaGear className="mr-2" /> Settings
                </button>
                <button
                    className=" w-full px-4 py-2 text-left hover:bg-red-100 cursor-pointer flex items-center font-medium rounded-md "
                    onClick={() => logout()}
                >
                    <MdLogout size={18} className="mr-2 text-red-500 " /> Logout
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
