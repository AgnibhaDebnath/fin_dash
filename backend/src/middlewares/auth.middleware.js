import { verifyToken } from "../utils/jwt.js";
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const decoded = await verifyToken(token);

        req.user = {
            id: decoded.userID,
        };
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Token expired or invalid",
        });
    }
    next();
};
export default authenticate;
