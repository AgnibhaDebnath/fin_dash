import React, { useState, useEffect, useRef } from "react";

import { z } from "zod";
import { Link } from "react-router";
import { FaRegCircle } from "react-icons/fa6";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { useApiError } from "@/hooks/useApiError";
import useAuth from "../hooks/useAuth";
const Signup = () => {
    const { checkAuth } = useAuth();
    const handleApiError = useApiError();
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const timerRef = useRef(null);

    const UserSchema = z.object({
        fullName: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    });

    const handleCreateAccount = async (e) => {
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
            const res = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
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
                const error = new Error(data.message || "Something went wrong");
                error.status = res.status;
                throw error;
            }
            const { message } = data;
            toast.success(message);

            timerRef.current = setTimeout(async () => {
                await checkAuth();
            }, 2000);

            setFormData({ fullName: "", email: "", password: "" });
        } catch (err) {
            handleApiError(err);
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

    const passwordRules = {
        length: z.string().min(8),
        uppercase: z.string().regex(/[A-Z]/),
        lowercase: z.string().regex(/[a-z]/),
        number: z.string().regex(/[0-9]/),
        special: z.string().regex(/[^A-Za-z0-9]/),
    };
    const passwordStatus = {
        length: passwordRules.length.safeParse(formData.password).success,
        uppercase: passwordRules.uppercase.safeParse(formData.password).success,
        lowercase: passwordRules.lowercase.safeParse(formData.password).success,
        number: passwordRules.number.safeParse(formData.password).success,
        special: passwordRules.special.safeParse(formData.password).success,
    };
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
                        <li className="flex items-center gap-3 text-lg">
                            <FiCheckCircle className="text-green-500 text-xl" />
                            Track income & expenses
                        </li>

                        <li className="flex items-center gap-3 text-lg">
                            <FiCheckCircle className="text-green-500 text-xl" />
                            Manage every transaction
                        </li>

                        <li className="flex items-center gap-3 text-lg">
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
                            <h1 className="text-3xl font-bold">Create Account</h1>
                        </div>

                        <p className="my-5 text-gray-500 ">Start tracking your expenses today</p>
                        <form className="flex flex-col gap-5 w-full items-center">
                            <div className="w-85/100 min-[380px]:w-8/10 min-[440px]:w-7/10">
                                <label htmlFor="name" className="font-semibold mb-1 block">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({ ...prev, fullName: value }));
                                        if (errors.fullName) {
                                            const result =
                                                UserSchema.shape.fullName.safeParse(value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                fullName: result.success
                                                    ? undefined
                                                    : [result.error.issues[0].message],
                                            }));
                                        }
                                    }}
                                    value={formData.fullName}
                                    id="name"
                                    className={`border w-full px-4 py-1.5 rounded-xl pb-2 ${errors.fullName ? "border-red-500" : "border-gray-300"}  font-medium text-gray-600 focus:ring-1 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600`}
                                    type="text"
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="text-xs  ml-2 mt-0.5 font-medium text-red-500">
                                        {errors.fullName[0]}
                                    </p>
                                )}
                            </div>
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
                                    <p className="text-xs  ml-2 mt-0.5 font-medium text-red-500">
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
                                    <p
                                        className={`text-xs ${passwordStatus.length ? "text-green-500" : errors.password?.[0] ? "text-red-500" : "text-gray-400"} font-medium`}
                                    >
                                        <span className="mr-2">
                                            {passwordStatus.length ? (
                                                <FaCheckCircle className="text-green-500 inline" />
                                            ) : errors.password?.[0] ? (
                                                <FaTimesCircle className="inline" />
                                            ) : (
                                                <FaRegCircle
                                                    className="inline"
                                                    size={8}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                        Minimum 8 characters
                                    </p>
                                    <p
                                        className={`text-xs ${passwordStatus.uppercase ? "text-green-500" : errors.password?.[1] ? "text-red-500" : "text-gray-500"} font-medium`}
                                    >
                                        <span className="mr-2">
                                            {passwordStatus.uppercase ? (
                                                <FaCheckCircle className="text-green-500 inline" />
                                            ) : errors.password?.[1] ? (
                                                <FaTimesCircle className="inline" />
                                            ) : (
                                                <FaRegCircle
                                                    className="inline"
                                                    size={8}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                        At least one uppercase letter
                                    </p>
                                    <p
                                        className={`text-xs ${passwordStatus.lowercase ? "text-green-500" : errors.password?.[2] ? "text-red-500" : "text-gray-500"} font-medium`}
                                    >
                                        <span className="mr-2">
                                            {passwordStatus.lowercase ? (
                                                <FaCheckCircle className="text-green-500 inline" />
                                            ) : errors.password?.[2] ? (
                                                <FaTimesCircle className="inline" />
                                            ) : (
                                                <FaRegCircle
                                                    className="inline"
                                                    size={8}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                        At least one lowercase letter
                                    </p>
                                    <p
                                        className={`text-xs ${passwordStatus.number ? "text-green-500" : errors.password?.[3] ? "text-red-500" : "text-gray-500"} font-medium`}
                                    >
                                        <span className="mr-2">
                                            {passwordStatus.number ? (
                                                <FaCheckCircle className="text-green-500 inline" />
                                            ) : errors.password?.[3] ? (
                                                <FaTimesCircle className="inline" />
                                            ) : (
                                                <FaRegCircle
                                                    className="inline"
                                                    size={8}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                        At least one number
                                    </p>
                                    <p
                                        className={`text-xs ${passwordStatus.special ? "text-green-500" : errors.password?.[4] ? "text-red-500" : "text-gray-500"} font-medium`}
                                    >
                                        <span className="mr-2">
                                            {passwordStatus.special ? (
                                                <FaCheckCircle className="text-green-500 inline" />
                                            ) : errors.password?.[4] ? (
                                                <FaTimesCircle className="inline" />
                                            ) : (
                                                <FaRegCircle
                                                    className="inline"
                                                    size={8}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                        At least one special character
                                    </p>
                                </div>
                            </div>
                            <div className="w-85/100 min-[380px]:w-8/10 min-[440px]:w-7/10">
                                <button
                                    disabled={formSubmitted}
                                    onClick={handleCreateAccount}
                                    className="w-full px-5 py-2 rounded-xl cursor-pointer bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-200 disabled:opacity-30"
                                >
                                    Create Account
                                </button>
                            </div>
                            <div className="flex gap-1">
                                <p>Already have an account?</p>
                                <p>
                                    <Link
                                        to="/login"
                                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                        Login
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

export default Signup;
