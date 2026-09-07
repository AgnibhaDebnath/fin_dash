import React, { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { Link } from "react-router";

import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { checkAuth } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const timerRef = useRef(null);
    const UserSchema = z.object({
        email: z.email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    });

    const login = async (e) => {
        e.preventDefault();
        const result = UserSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }
        setErrors({});
        console.log("Form Submitted");
        setFormSubmitted(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400) {
                    const { errors } = data;
                    setErrors(errors);
                    return;
                }

                const error = new Error(data.message);
                throw error;
            }

            toast.success(data.message);

            timerRef.current = setTimeout(async () => {
                await checkAuth();
            }, 2000);
            setFormData({ email: "", password: "" });
        } catch (err) {
            if (err instanceof TypeError) {
                toast.error("Unable to connect. Please check your internet connection.");
                return;
            }
            toast.error(err.message);
        } finally {
            setFormSubmitted(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    return (
        <div className="bg-slate-50 w-full h-screen px-3 min-[390px]:px-5 pt-20 flex justify-center font-[inter]">
            <div className="w-9/20 hidden min-[900px]:block">
                <div className="w-full space-y-8 flex flex-col pl-10">
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-slate-600">Welcome to</p>

                        <h1 className="text-6xl font-bold text-slate-900">
                            Expense<span className="text-indigo-600">Flow</span>
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 leading-8 max-w-md">
                        Manage your income, expenses, savings, and transactions—all in one place.
                        Gain valuable insights into your financial habits with an intuitive
                        dashboard.
                    </p>
                    <ul className="space-y-5">
                        <li className="flex items-center gap-3 text-lg tracking-wide">
                            <FiCheckCircle className="text-green-500 text-xl" />
                            Track income & expenses
                        </li>

                        <li className="flex items-center gap-3 text-lg tracking-wide">
                            <FiCheckCircle className="text-green-500 text-xl" />
                            Manage every transaction
                        </li>

                        <li className="flex items-center gap-3 text-lg tracking-wide">
                            <FiCheckCircle className="text-green-500 text-xl" />
                            Visualize your financial insights
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full min-[900px]:w-11/20">
                <div className="flex w-full max-[900px]:justify-center min-[900px]:pl-15">
                    <div className="flex flex-col px-5 py-8 min-[460px]:p-8 w-full max-w-md items-center shadow-2xl rounded-2xl">
                        <div>
                            <h1 className="text-3xl font-bold">Welcome Back</h1>
                        </div>

                        <p className="my-5 text-gray-500 ">
                            Sign in to access your financial dashboard
                        </p>
                        <form className="flex flex-col gap-5 w-full items-center">
                            <div className="w-85/100 min-[380px]:w-8/10 min-[440px]:w-7/10">
                                <label htmlFor="email" className="font-semibold mb-1 block">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={formData.email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({ ...prev, email: value }));
                                        if (errors.email) {
                                            const result = UserSchema.shape.email.safeParse(value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                email: result.success
                                                    ? undefined
                                                    : [result.error.issues[0].message],
                                            }));
                                        }
                                    }}
                                    id="email"
                                    className={`border w-full px-4 py-1.5 rounded-xl pb-2 ${errors.email ? "border-red-500" : "border-gray-300"} font-medium text-gray-600 focus:ring-1 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600`}
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-xs  ml-2 mt-0.5 font-medium text-red-500 tracking-wide">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>
                            <div className="w-85/100 min-[380px]:w-8/10 min-[440px]:w-7/10 relative">
                                <label htmlFor="password" className="font-semibold mb-1 block">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={formData.password}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({ ...prev, password: value }));
                                    }}
                                    className={`border w-full px-4 py-1.5 rounded-xl pb-2 ${errors.password ? "border-red-500" : "border-gray-300"}  font-medium text-gray-600 focus:ring-1 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600`}
                                    type={eyeOpen ? "text" : "password"}
                                    placeholder="Enter your password"
                                />

                                <button type="button" onClick={() => setEyeOpen(!eyeOpen)}>
                                    {eyeOpen ? (
                                        <FiEye
                                            className="absolute right-3 top-9.5 text-gray-500 cursor-pointer"
                                            size={20}
                                        />
                                    ) : (
                                        <FiEyeOff
                                            className="absolute right-3 top-9.5 text-gray-500 cursor-pointer"
                                            size={20}
                                        />
                                    )}
                                </button>
                                <div className="flex flex-col gap-1 mt-1 ml-2">
                                    {errors.password?.[0] && (
                                        <p
                                            className={`text-xs font-medium text-red-500 tracking-wide`}
                                        >
                                            <span className="mr-2">
                                                {errors.password?.[0] && (
                                                    <FaTimesCircle className="inline" />
                                                )}
                                            </span>
                                            {errors.password?.[0]}
                                        </p>
                                    )}

                                    {errors.password?.[1] && (
                                        <p
                                            className={`text-xs text-red-500 font-medium tracking-wide`}
                                        >
                                            <span className="mr-2">
                                                {errors.password?.[1] && (
                                                    <FaTimesCircle className="inline" />
                                                )}
                                            </span>
                                            {errors.password?.[1]}
                                        </p>
                                    )}

                                    {errors.password?.[2] && (
                                        <p
                                            className={`text-xs text-red-500 font-medium tracking-wide`}
                                        >
                                            <span className="mr-2">
                                                {errors.password?.[2] && (
                                                    <FaTimesCircle className="inline" />
                                                )}
                                            </span>
                                            {errors.password?.[2]}
                                        </p>
                                    )}

                                    {errors.password?.[3] && (
                                        <p
                                            className={`text-xs text-red-500 font-medium tracking-wide`}
                                        >
                                            <span className="mr-2">
                                                {errors.password?.[3] && (
                                                    <FaTimesCircle className="inline" />
                                                )}
                                            </span>
                                            {errors.password?.[3]}
                                        </p>
                                    )}

                                    {errors.password?.[4] && (
                                        <p
                                            className={`text-xs text-red-500 font-medium tracking-wide`}
                                        >
                                            <span className="mr-2">
                                                {errors.password?.[4] && (
                                                    <FaTimesCircle className="inline" />
                                                )}
                                            </span>
                                            {errors.password?.[4]}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="w-85/100 min-[380px]:w-8/10 min-[440px]:w-7/10">
                                <button
                                    disabled={formSubmitted}
                                    onClick={login}
                                    className="w-full px-5 py-2 rounded-xl cursor-pointer bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-200 disabled:opacity-30"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="flex gap-1">
                                <p>{`Don't have an account?`} </p>
                                <p>
                                    <Link
                                        to="/signup"
                                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
