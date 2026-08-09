import express from "express"
import { signupController ,loginController,getCurrentUser} from "./auth.controller.js";
import { signupValidator,loginValidator} from "./auth.validator.js";
import authenticate from "../../middlewares/auth.middleware.js";
import { logoutController } from "./auth.controller.js";
const authRoutes = express.Router();


authRoutes.post("/signup",signupValidator,signupController);
authRoutes.post("/login", loginValidator, loginController);
authRoutes.get("/me", authenticate, getCurrentUser);
authRoutes.post("/logout",logoutController)
export default authRoutes;