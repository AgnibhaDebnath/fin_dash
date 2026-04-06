
import { LuAlignJustify } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { FaUser, FaUserShield } from "react-icons/fa";
const Navbar = ({ role, setRole, activeTab, setIsSidebarOpen }) => {

    return (
        <nav className="px-4 md:px-5 py-5.5 flex flex-row justify-between bg-white shadow-xl fixed top-0 w-full z-50 items-center ">
            {activeTab == "dashboard" && <h1 className="font-bold text-4xl pb-1">
                <button onClick={() => setIsSidebarOpen(true)} className="cursor-pointer min-[768px]:hidden">
                    <LuAlignJustify size={25} className="mt-3" />
                </button>
                <span className="ml-5">Dashboard</span>
            </h1>}
            {activeTab == "transactions" && <h1 className="font-bold text-4xl pb-1">
                <button onClick={() => setIsSidebarOpen(true)} className="cursor-pointer min-[768px]:hidden">
                    <LuAlignJustify size={25} className="mt-3" />
                </button>
                <span className="ml-5">Transactions</span>
            </h1>}
            <div className="relative hidden md:block">
                <FaSearch className="absolute top-2.5 left-3" />
                <input type="text" placeholder="Search..." className="border-2 border-gray-400 rounded-full pl-8 pr-2 py-1 text-justify hidden md:block shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500  focus:ring-blue-500" />
            </div>
            <div className=" hidden md:block ">
                <button
                    onClick={() => setRole("user")}
                    className={`px-4 py-1.5 mr-1 rounded-full font-medium ${role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"
                        }`}
                >
                    <FaUser className="inline mb-1" /> User
                </button>

                <button
                    onClick={() => setRole("admin")}
                    className={`px-4 py-1.5 ml-1 rounded-full font-medium ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"
                        }`}
                >
                    <FaUserShield className="inline mb-1" /> Admin
                </button>
            </div>

        </nav>
    )
}
export default Navbar