import { FiX } from "react-icons/fi";
import { Link } from "react-router";
import Logo from "../../assets/logo.svg";
const PublicSidebar = ({ isOpen, setIsOpen, scrollHandler }) => {
    return (
        isOpen && (
            <>
                <div
                    className="fixed inset-0 z-40 bg-slate-900/30 min-[870px]:hidden"
                    onClick={() => setIsOpen(false)}
                />

                <aside
                    className="
        fixed
        right-0
        top-0
        z-50
        h-full
        w-70
        max-w-[85vw]
        bg-white
        shadow-2xl
        min-[870px]:hidden
        font-[inter]
      "
                >
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 min-[400px]:py-4.5">
                        <div className="flex items-center gap-x-2">
                            <a href="/">
                                <div className="cursor-pointer">
                                    <img src={Logo} alt="Application Logo" className="w-12 h-12 " />
                                </div>
                            </a>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Expense<span className="text-indigo-600">Flow</span>
                            </h2>
                        </div>
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close navigation menu"
                        >
                            <FiX className="h-6 w-6 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex flex-col px-6 ">
                        <a
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-slate-100 py-4 text-slate-700 pl-2"
                        >
                            About
                        </a>

                        <button
                            onClick={() => {
                                scrollHandler();
                                setIsOpen(false);
                            }}
                            className="border-b border-slate-100 py-4 text-slate-700 text-start cursor-pointer pl-2"
                        >
                            Features
                        </button>

                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-slate-100 py-4 text-slate-700 pl-2"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="mt-8 rounded-md bg-indigo-600 px-5 py-2 text-center font-semibold text-white hover:bg-indigo-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </aside>
            </>
        )
    );
};

export default PublicSidebar;
