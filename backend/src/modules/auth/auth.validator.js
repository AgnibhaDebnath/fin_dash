import { z } from "zod"

const UserSchema = z.object(
    {
        fullName: z.string()
            .min(3, "Name must be at least 3 characters")
            .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    }
)

const LoginSchema = z.object(
    {
        email: z.string().email("Please enter a valid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    }
)
    
const signupValidator = (req, res, next) => {
   
    
   
    const result = UserSchema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).josn({
            errors:result.error.flatten().fieldErrors
        })
    }
    next();
}

const loginValidator = (req,res,next) => {
    const result = LoginSchema.safeParse(res.body);
    if (!result) {
        return res.status(400).json({
           errors:result.error.flatten().fieldErrors
        })
    }
    next();
}

export { signupValidator,loginValidator};