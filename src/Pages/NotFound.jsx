import React from "react";
import { Link } from "react-router";
const NotFound = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen font-[inter]">
            <div className="flex flex-col items-center gap-8">
                <div>
                    <h1 className="text-8xl min-[450px]:text-9xl font-bold text-gray-700 ">404</h1>
                </div>
                <div>
                    <h1 className="text-4xl min-[450px]:text-5xl font-bold text-gray-700">
                        Page not found
                    </h1>
                </div>
                <Link
                    to="/"
                    className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
