import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (newUser) => {
    const token = jwt.sign(
        {
            userID: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );
    return token;
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
export { generateToken, verifyToken };
