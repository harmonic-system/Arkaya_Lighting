const bcrypt = require("bcryptjs")
const Auth = require("../models/auth-model")

const registerController = async (req, res) => {
    const { name, email, phone, organization, password, confirmPassword, term_condition } = req.body
    // console.log(name, email, phone, organization, password, confirmPassword, term_condition)

    try {

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Password and Confirm Password must be same' })
        }

        if (!term_condition) {
            return res.status(400).json({ success: false, message: 'You must agree to the terms and conditions' })
        }
        // Check if user already exists

        const existedUser = await Auth.findOne({ email: email.toLowerCase() })

        if (existedUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }

        // Encrypt password

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt)

        // Create a new user
        const userCreated = new Auth({ name: name.toLowerCase(), email: email.toLowerCase(), phone, organization, password: hashPassword, term_condition })

        await userCreated.save()

        const newUser = await Auth.findById(userCreated._id).select('-password -term_condition')

        return res.status(200).json({ success: true, message: "Registration SuccessFul", token: await newUser.generateToken() })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password);

    try {
        // Find User Exist Or Not
        const userExists = await Auth.findOne({ email: email.toLowerCase() })

        if (!userExists) {
            return res.status(400).json({ success: false, message: 'User does not exist' })
        }

        // Check User Password Is Correct Or Not
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        const userLoggedIn = await Auth.findById(userExists._id).select("-password -term_condition")
        return res.status(200).json({ success: true, message: "Login SuccessFul", token: userLoggedIn.generateToken() })

    } catch (error) {
        return res.status(400).json({ success: false, message: error })
    }
}

const userController = async (req, res) => {
    const user = req.user
    try {
        return res.status(200).json({ data: user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = { registerController, loginController, userController }