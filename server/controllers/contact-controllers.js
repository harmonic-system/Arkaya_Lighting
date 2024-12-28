const Contact = require("../models/contact-models")
const NewsLetter = require("../models/newsLetter-models")
const ProductQuery = require("../models/productQuery-models")
const nodemailer = require("nodemailer");

const contactPageController = async (req, res) => {
  try {
    const { name, email, phone, organization, message } = req.body
    // console.log(name, email, phone, organization, message);


    const contactSend = await new Contact({ name: name.toLowerCase(), email: email.toLowerCase(), phone, organization, message })

    const newContact = await contactSend.save()

    if (newContact) {
      return res.status(200).json({ message: "Message Send" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong !!! Please Try Again Later" })
  }
}

const productQuery = async (req, res) => {
  const { name, email, phone, organization, query, productCode, productName, productSku } = req.body
  // console.log(name, email, phone, organization, query, productCode, productName, productSku);

  try {
    const QueryRaise = await new ProductQuery({ productCode, productName, productSku, name, email, phone, organization, query })

    const QuerySend = await QueryRaise.save()

    if (QuerySend) {
      return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you shortly." })
      // return res.status(200).json({ message: "Enquiry Send" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Enquiry Not Send !!! Please Try Again Later" })
  }
}

const newsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    const existednewsletter = await NewsLetter.findOne({ newsletteremail: email.toLowerCase() })

    if (existednewsletter) {
      return res.status(409).json({ message: "Already Subscribed" })
    }

    const newNewsletter = await new NewsLetter({ newsletteremail: email.toLowerCase().trim() })

    await newNewsletter.save()

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
          user: "no-reply@arkayalighting.com",
          pass: "no-replyArkaya@1008", 
      },
  });

    let mailOption = {
      from: "no-reply@arkayalighting.com",
      to: email,
      subject: "Welcome to Arkaya Lighting Newsletter",
      html: `
      <h3>Dear ${email}</h3> 
      <p>We are thrilled to welcome you to the arkayalighting newsletter community!</p>
      <br>
       <p>Thank you for subscribing and choosing to stay updated with us.</p>
       <br>
       <p>At arkayalighting, we are dedicated to providing you with valuable insights, updates, and exclusive offers that we believe will enhance your experience with us. Whether it's the latest industry trends, tips and tricks, or special promotions, we aim to keep you informed and engaged.</p>
       <br>
       <p>We value your trust in us and look forward to sharing meaningful content that aligns with your interests. Your subscription allows us to stay connected and ensures you receive firsthand information on everything arkayalighting has to offer.</p>
       <br>
       <p>If you have any questions, feedback, or specific topics you'd like us to cover, please don't hesitate to reach out.</p> 
       <p> We are here to serve you.</p>
       <p>Once again, thank you for joining us on this journey. We are excited to have you onboard!</p>
       <p><b>Regards -</b> Arkaya Lighting</p>
       `
    }

    transporter.sendMail(mailOption, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed To Subscribe" })
      }
      else {
        return res.status(200).json({ message: "Thanks For Subscribing" })
      }
    })

    mailOption = {
      from: "no-reply@arkayalighting.com",
      to: "arkayalighting@gmail.com",
      subject: "New Subscriber",
      html: `
      <p>${email} is our new subscriber</p>
      `
    }

    transporter.sendMail(mailOption, (error) => {
      if (error) {
        // console.log(error, "to admin")
        return res.status(500).json({ message: "Failed To Subscribe" })
      }
      else {
        // console.log("New Subscriber Email Sent")
        return res.status(200).json({ message: "Thanks For Subscribing" })
      }
    })

  } catch (error) {
    return res.status(500).json({ message: "Failed To Subscribe" })
  }
}

module.exports = { contactPageController, productQuery, newsLetter }

