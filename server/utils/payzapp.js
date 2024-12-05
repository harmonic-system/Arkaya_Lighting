const axios = require("axios");
const crypto = require("crypto");

const PAYZAPP_API_URL = "http://localhost:4000/api/v1/transactions";
// const PAYZAPP_API_URL = "https://api.payzapp.com";

const initiatePaymentUtils = async (transactionId, amount) => {
    const payload = {
        transactionId,
        amount,
        callbackUrl: "http://localhost:4000/api/v1/transactions/verify",
    };    

    const signature = crypto.createHmac("sha256", process.env.PAYZAPP_SECRET_KEY)
        .update(JSON.stringify(payload))
        .digest("hex");

    const response = await axios.post(`${PAYZAPP_API_URL}/initiate`, payload, {
        headers: {
            "Authorization": `Bearer ${process.env.PAYZAPP_API_KEY}`,
            "X-Signature": signature,
        },
    });

    return response.data;
};

const verifyPaymentUtils = (transactionId, signature) => {
    const expectedSignature = crypto.createHmac("sha256", process.env.PAYZAPP_SECRET_KEY)
        .update(transactionId)
        .digest("hex");

    return expectedSignature === signature;
};

module.exports = { initiatePaymentUtils, verifyPaymentUtils };
