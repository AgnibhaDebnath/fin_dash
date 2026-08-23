import User from "./user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/jwt.js";
import { comparePassword } from "../../utils/comparePassword.js";

const signupService = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        return {
            success: false,
        };
    }
    const hashedPassword = await hashPassword(userData.password);

    const newUser = await User.create({
        ...userData,
        password: hashedPassword,
    });

    const token = generateToken(newUser);
    return {
        success: true,
        token,
    };
};

const loginService = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        return { success: false, message: "Invalid email or password." };
    }
    const isMatch = await comparePassword(userData.password, user.password);

    if (!isMatch) {
        return { success: false, message: "Invalid email or password." };
    }
    const token = generateToken(user);
    return {
        success: true,
        token,
    };
};

const getCurrentUserData = async (id) => {
    return await User.findById(id).select("-password -__v -createdAt -updatedAt");
};

export { signupService, loginService, getCurrentUserData };
