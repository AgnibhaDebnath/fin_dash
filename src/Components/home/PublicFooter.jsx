import { Link } from "react-router";
import Logo from "../../assets/logo.svg";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const PublicFooter = ({ scrollHandler }) => {
    return (
        <footer className="border-t border-slate-200 bg-white font-[inter]">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <div className="flex gap-x-2 items-center">
                            <a href="/">
                                <div className="cursor-pointer">
                                    <img src={Logo} alt="Application Logo" className="w-12 h-12 " />
                                </div>
                            </a>
                            <a href="/" className="text-2xl font-bold tracking-tight ">
                                Expense<span className="text-indigo-600">Flow</span>
                            </a>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 pl-5">
                            Take control of your finances with simple expense tracking, clear
                            insights, and an easy-to-use dashboard.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition  hover:shadow-md"
                            >
                                <FiGithub className="h-5 w-5" />
                            </a>

                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-indigo-200  hover:text-indigo-600 hover:shadow-md"
                            >
                                <FiLinkedin className="h-5 w-5" />
                            </a>

                            <a
                                href="mailto:contact@example.com"
                                aria-label="Email"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:shadow-md"
                            >
                                <FiMail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="pl-2">
                        <h3 className="text-sm font-semibold text-slate-900">Product</h3>

                        <ul className="mt-4 space-y-3">
                            <li>
                                <button
                                    onClick={() => scrollHandler()}
                                    className="text-sm text-slate-600 transition hover:text-indigo-600 cursor-pointer"
                                >
                                    Features
                                </button>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    className="text-sm text-slate-600 transition hover:text-indigo-600"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="pl-2">
                        <h3 className="text-sm font-semibold text-slate-900">Account</h3>

                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-slate-600 transition hover:text-indigo-600"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/signup"
                                    className="text-sm text-slate-600 transition hover:text-indigo-600"
                                >
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Expense<span className="text-indigo-600">Flow</span>. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            to="/"
                            className="text-sm text-slate-500 transition hover:text-indigo-600"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-slate-500 transition hover:text-indigo-600"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
