const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const validate = require("../middleware/validate-middleware")
const { signupSchema, loginSchema, changePasswordSchema, forgetPasswordSchema, resetPasswordSchema } = require("../validators/auth-validator")
const {
    userController, loginController, registerController,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteAccount,
    updateprofile
} = require("../controllers/auth-controller")

const router = express.Router()

router.post("/signup", validate(signupSchema), registerController)

router.post("/login", validate(loginSchema), loginController)

router.get("/user", authMiddleware, userController)

router.post("/change-password", validate(changePasswordSchema), authMiddleware, changePassword);
router.post('/forgot-password',validate(forgetPasswordSchema), forgotPassword);
router.post('/reset-password/:token',validate(resetPasswordSchema), resetPassword);
router.delete('/delete-account', authMiddleware, deleteAccount);

router.patch("/update",authMiddleware, updateprofile)

module.exports = router


