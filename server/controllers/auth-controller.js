const bcrypt = require("bcryptjs")
const Auth = require("../models/auth-model")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const DeletedAuth = require("../models/DeletedAuth-model");
const Cart = require("../models/cart-model");
const WishList = require("../models/wishlist-model");
const Address = require("../models/address-model");

const registerController = async (req, res) => {
    const { name, email, phone, organization, password, term_condition } = req.body
    // console.log(name, email, phone, organization, password, confirmPassword, term_condition)

    try {

        if (!term_condition) {
            return res.status(400).json({ success: false, message: 'You must agree to the terms and conditions' })
        }
        // Check if user already exists

        const existedUser = await Auth.findOne({ email: email.toLowerCase() })

        if (existedUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }

        const deletedUser = await DeletedAuth.findOne({ email: email.toLowerCase() })

        if (deletedUser) {
            await DeletedAuth.deleteOne({ email: email.toLowerCase() });
        }

        // Encrypt password

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt)

        // Create a new user
        const userCreated = new Auth({ name: name.toLowerCase(), email: email.toLowerCase(), phone, organization, password: hashPassword, term_condition })

        await userCreated.save()

        const newUser = await Auth.findById(userCreated._id).select('-password -term_condition')

        const cart = new Cart({ userId: userCreated._id, items: [] });
        await cart.save();

        const wishlist = new WishList({ userId: userCreated._id, items: [] });
        await wishlist.save();

        return res.status(200).json({ success: true, message: "Registration SuccessFul", token: await newUser.generateToken() })

    } catch (error) {
        // console.log(error);
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

        let cart = await Cart.findOne({ userId: userExists._id });

        if (!cart) {
            cart = new Cart({ userId: userExists._id, items: [] });
            await cart.save();
        }

        let wishlist = await WishList.findOne({ userId: userExists._id });

        if (!wishlist) {
            wishlist = new WishList({ userId: userExists._id, items: [] });
            await wishlist.save();
        }

        return res.status(200).json({ success: true, message: "Login SuccessFul", token: userLoggedIn.generateToken() })

    } catch (error) {
        // console.log(error);

        return res.status(400).json({ success: false, message: error })
    }
}

const userController = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({ data: user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateprofile = async (req, res) => {
    const { name, email, phone, organization } = req.body;

    // console.log(name, email, phone, organization);

    try {
        // Find the user by their ID
        const user = await Auth.findById(req.user._id).select("-password -term_condition");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.organization = organization || user.organization;

        // Save the updated user
        await user.save();

        // console.log("new-user", user);

        const updated = await Auth.findById(req.user._id).select("-password -term_condition");


        res.status(200).json({ message: "Profile Updated Successfully", data: updated });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await Auth.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);

        // Update password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Auth.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        user.resetToken = token;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "arkayalighting@gmail.com",
                pass: "qztiixbfbwqrskja"
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/user/reset-password/${token}`;
        const mailOptions = {
            from: "arkayalighting@gmail.com",
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "A link to set a new password will be sent to your email address." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await Auth.findById(decoded.id);

        if (!user || user.resetToken !== token || user.tokenExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt)

        user.password = hashPassword;
        user.resetToken = undefined;
        user.tokenExpiry = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        // Get the user from the request (attached by authMiddleware)
        const user = await Auth.findById(req.user._id)
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Step 1: Save user data to the DeletedAccount model
        const deletedAccount = new DeletedAuth({
            name: user.name,
            email: user.email,
            phone: user.phone,
            organization: user.organization,
            password: user.password,
            isAdmin: user.isAdmin,
            role: user.role,
            term_condition: user.term_condition,
            address: user.address
        });

        // Save the deleted account data
        await deletedAccount.save();

        await Cart.deleteMany({ userId: user._id }); // Delete user's cart items
        await WishList.deleteMany({ userId: user._id }); // Delete user's wishlist items
        await Address.deleteMany({ userId: user._id }); // Delete user's saved addresses

        // Step 2: Delete the user's account from the Auth model (user model)
        await user.deleteOne(); // delete the current user document from the database

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "arkayalighting@gmail.com",
                pass: "qztiixbfbwqrskja"
            },
        });

        const mailOptions = {
            from: "arkayalighting@gmail.com",
            to: user.email,
            subject: 'Account Deletion Confirmation',
            text: `Dear ${user.name},\n\nWe are sorry to see you go. Your account has been successfully deleted along with all associated data. If this was a mistake or you wish to rejoin, feel free to contact us.\n\nBest regards,\nArkayaLighting`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ message: 'Your account has been successfully deleted.' });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: err.message });
    }

}


module.exports = {
    registerController, loginController, userController, updateprofile, changePassword, forgotPassword, resetPassword, deleteAccount
}