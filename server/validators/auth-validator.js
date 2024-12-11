const { z } = require("zod");

// Creating an object schema for signup
const signupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(20, "Name can't exceed 20 characters"),
        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .max(30, "Email can't exceed 30 characters"),
        phone: z.string().trim().length(10, "Phone must be 10 characters"),
        organization: z.string().trim().optional(),
        password: z
            .string()
            .min(5, "Password must be at least 5 characters")
            .max(30, "Password can't exceed 30 characters")
            .regex(
                /(?=.*[A-Z])/,
                "Password must contain at least one uppercase letter"
            )
            .regex(/(?=.*\d)/, "Password must contain at least one number"),
        confirmPassword: z
            .string()
            .min(5, "Confirm Password must be at least 5 characters")
            .max(30, "Confirm Password can't exceed 30 characters"),
        term_condition: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords and Confirm Password does not match",
        path: ["confirmPassword"],
    });

module.exports = signupSchema;

// Creating an object schema for login
const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(30, "Email can't exceed 30 characters"),
    password: z
        .string()
        .min(5, "Password must be at least 5 characters")
        .max(30, "Password can't exceed 30 characters")
        .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/(?=.*\d)/, "Password must contain at least one number"),
});

// Creating an object schema for change Password
const changePasswordSchema = z
    .object({
        oldPassword: z.string().trim(),
        newPassword: z
            .string()
            .min(5, "Password must be at least 5 characters")
            .max(30, "Password can't exceed 30 characters")
            .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
            .regex(/(?=.*\d)/, "Password must contain at least one number"),
    })

// Creating an object schema for forget Password
const forgetPasswordSchema = z
    .object({
        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .max(30, "Email can't exceed 30 characters"),
    })

// Creating an object schema for reset Password
const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(5, "Password must be at least 5 characters")
            .max(30, "Password can't exceed 30 characters")
            .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
            .regex(/(?=.*\d)/, "Password must contain at least one number"),
    })

module.exports = { signupSchema, loginSchema, changePasswordSchema, forgetPasswordSchema, resetPasswordSchema };
