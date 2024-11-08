const jwt = require("jsonwebtoken")
const { Schema, model } = require("mongoose")

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true
    },
    organization: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    term_condition: {
        type: Boolean,
        required: true
    },
    address: {
        type: [Object],
        default: []
    }
}, {
    timestamps: true
})

//   To Generate Token

authSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign({
            userId: this._id.toString(),
            email: this.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })
        return token
    } catch (error) {
        throw new Error("Error generating token");
    }
}

const Auth = new model("Auth", authSchema)

module.exports = Auth