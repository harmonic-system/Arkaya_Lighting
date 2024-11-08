const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const validate = require("../middleware/validate-middleware")
const { signupSchema, loginSchema } = require("../validators/auth-validator")
const { userController, loginController, registerController } = require("../controllers/auth-controller")

const router = express.Router()

// router.route("/signup").post(validate(signupSchema), registerController)
router.route("/signup").post(registerController)

// router.route("/login").post(validate(loginSchema), loginController)
router.route("/login").post(loginController)

router.route("/user").get(authMiddleware, userController)

// router.route("/edit/:id").post(authMiddleware, editprofile)

module.exports = router


