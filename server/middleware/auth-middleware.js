const jwt = require("jsonwebtoken");
const Auth = require("../models/auth-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(500).json({ message: "Unauthorizes Token !! Token Not Provided" })
  }

  const jwtToken = token.replace("Bearer", " ").trim()

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
    
    const userData = await Auth.findOne({ email: isVerified?.email }).select("-password -term_condition")
    
    req.user = userData    

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid!!" })
  }
}

module.exports = authMiddleware




