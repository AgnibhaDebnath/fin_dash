import { useLocation } from "react-router";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { containerVariants, itemVariants } from "@/animations/variants";

const Navbar = ({ setIsSidebarOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };
    const pageConfig = {
        "/dashboard": {
            title: `${getGreeting()}, ${user.fullName.split(" ")[0]} 👋`,
            subtitle: "Here's your financial overview for today.",
        },
        "/transactions": {
            title: "Transactions",
            subtitle: "Manage your income and expenses.",
        },
    };
    const { pathname } = useLocation();
    const currentPage = pageConfig[pathname];

    return (
        <nav className="px-4 md:pl-5 md:pr-10 py-3 flex flex-row justify-between bg-white shadow-xl fixed top-0 w-full z-60 items-center font-[inter] gap-x-3">
            <div className="flex items-center min-[768px]:hidden">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="cursor-pointer min-[768px]:hidden font-bold text-2xl"
                >
                    ☰
                </button>
            </div>
            <div className="w-92/100 min-[768px]:w-4/5">
                <h1 className="text-xl min-[500px]:text-2xl min-[590px]:text-3xl font-bold tracking-wide ">
                    {currentPage?.title}
                </h1>
                <p className="text-gray-500 text-sm min-[500px]:text-base">
                    {currentPage?.subtitle}
                </p>
            </div>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex gap-x-2 items-center max-[768px]:hidden cursor-pointer"
            >
                <FaUser size={20} />
                <span className="text-xl font-semibold tracking-wide  text-shadow-md">
                    {user.fullName.split(" ")[0]}
                </span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}

                        className={`absolute top-18 right-2 w-35 py-2 rounded-xl border border-gray-200 bg-white shadow-lg z-10 font-[inter] overflow-hidden max-[768px]:hidden`}
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.button
                                variants={itemVariants}
                                type="button"
                                className=" w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaUser className="mr-2" /> Profile
                            </motion.button>
                            <hr />
                            <motion.button
                                variants={itemVariants}
                                type="button"
                                className=" w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaGear className="mr-2" /> Settings
                            </motion.button>
                            <hr />
                            <motion.button
                                variants={itemVariants}
                                type="button"
                                className=" w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center font-medium"
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                            >
                                <MdLogout size={18} className="mr-2 text-red-500 " /> Logout
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
export default Navbar;
