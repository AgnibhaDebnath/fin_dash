import { signupService, loginService, getCurrentUserData } from "./auth.service.js";
import dotenv from "dotenv";

dotenv.config();

const signupController = async (req, res) => {
    try {
        const user = await signupService(req.body);
        if (!user.success) {
            return res.status(409).json({
                message: "An account with this email already exists.",
            });
        }
        res.cookie("token", user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: "Account created successfully.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't create acount. Please try again later.",
        });
    }
};

const loginController = async (req, res) => {
    try {
        const result = await loginService(req.body);
        if (!result.success) {
            return res.status(401).json({
                success: false,
                message: result.message,
            });
        }

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't log in. Please try again later.",
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await getCurrentUserData(req.user.id);

        res.status(201).json({
            success: true,
            user,
        });
    } catch (err) {
        console.log(err);
    }
};

const logoutController = (res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.log(err);
    }
};

export { signupController, loginController, getCurrentUser, logoutController };
