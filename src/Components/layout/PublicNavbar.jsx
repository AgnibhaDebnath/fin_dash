import React from "react";
import Logo from "../../assets/logo.svg";

import { Link } from "react-router";
const PublicNavbar = ({ setIsOpen, scrollHandler }) => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 font-[inter]">
            <div className="flex items-center pl-2 pr-4 min-[430px]:px-5 py-3">
                <div className="flex items-center w-11/12 min-[870px]:w-2/5 gap-2 ">
                    <a href="/">
                        <div className="cursor-pointer">
                            <img
                                src={Logo}
                                alt="Application Logo"
                                className="w-12 min-[400px]:w-15 min-[400px]:h-15 h-12"
                            />
                        </div>
                    </a>
                    <a href="/">
                        <div className="flex items-center cursor-pointer">
                            <h1 className="text-3xl min-[400px]:text-4xl font-bold pb-2">
                                Expense<span className="text-indigo-600">Flow</span>
                            </h1>
                        </div>
                    </a>
                </div>
                <div className="w-1/5 hidden min-[870px]:block">
                    <div className="w-full flex items-center">
                        <ul className="w-full flex justify-end gap-12 items-center">
                            <li className="cursor-pointer hover:text-indigo-600 transition-all duration-200 tracking-wide">
                                About
                            </li>
                            <li className="cursor-pointer hover:text-indigo-600 transition-all duration-200 tracking-wide">
                                <button className="cursor-pointer" onClick={() => scrollHandler()}>
                                    Features
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-2/5 hidden min-[870px]:block">
                    <div className="w-full flex justify-end gap-10 mr-2 items-center">
                        <div>
                            <Link to="/login">
                                <button className="border-2 border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 transition cursor-pointer font-semibold">
                                    Login
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/signup">
                                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer font-semibold">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-1/12 min-[870px]:hidden block">
                    <div className="flex justify-end ">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="font-bold text-2xl cursor-pointer"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
