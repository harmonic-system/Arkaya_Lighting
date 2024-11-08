import styled from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { Button } from "../styles/Button";
import { useState } from "react";
import { useAuthContext } from "../context/auth-context";
import { useContactContext } from "../context/contact-context";

const Contact = () => {

  const { user } = useAuthContext()
  const [userData, setUserData] = useState(true)
  const { loading, contactHandler, success } = useContactContext()

  const [contactUser, setContactUser] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: ""
  })

  if (user && userData) {
    setContactUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      organization: user.organization,
      message: ""
    })
    setUserData(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await contactHandler(contactUser)
      setContactUser({
        message: ""
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setContactUser({
      ...contactUser,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Wrapper>
      {/* <h2 className="common-heading">Contact page</h2> */}
      <div className="container">
        <div className="grid grid-two-column">
          <div className="contact-box">
            <a href=""><IoLocationSharp style={{ fontSize: "2rem", color: "#0074E1" }} /></a>
            <h3>Address</h3>
            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
          </div>
          <div className="grid grid-two-column">
            <div className="contact-box">
              <a href="mailto:sales@arkayalighting.com"><MdAlternateEmail style={{ fontSize: "2rem", color: "#0074E1" }} /></a>
              <h3>Email Us</h3>
              <p className="text-justify" >sales@arkayalighting.com</p>
            </div>
            <div className="contact-box">
              <a href="tel:+912255889966"><IoCall style={{ fontSize: "2rem", color: "#0074E1" }} /></a>
              <h3>Call Us</h3>
              <p className="text-justify" >+919654612012</p>
            </div>
          </div>
        </div>

        <div className="grid grid-two-column">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.91455641541671!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1664345115285!5m2!1sen!2sin"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

          </iframe>

          {/* <div className="container"> */}
          <div className="contact-form">
            {success ? <p className="text-center text-success fw-bold">Thanks For Contacting In Arkaya Lighting !!! Our Executive Will Contact You Soon.</p> : ""}
            <form className="contact-inputs" onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleChange}
                value={contactUser.name}
                placeholder="Name"
                name="name"
                required
                autoComplete="off"
              />

              <input
                type="email"
                onChange={handleChange}
                value={contactUser.email}
                name="email"
                placeholder="Email"
                autoComplete="off"
                required
              />

              <input
                type="text"
                onChange={handleChange}
                value={contactUser.phone}
                name="phone"
                placeholder="Phone"
                autoComplete="off"
                required
              />

              <input
                type="text"
                onChange={handleChange}
                value={contactUser.organization}
                name="organization"
                placeholder="Organization (Optional)"
                autoComplete="off"
              />

              <textarea
                name="message"
                onChange={handleChange}
                value={contactUser.message}
                cols="30"
                rows="10"
                required
                autoComplete="off"
                placeholder="Enter you message"></textarea>

              <Button type="submit">{loading ? "Please Wait..." : "Send"}</Button>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Wrapper>
  );
};

export default Contact;

const Wrapper = styled.section`

  .contact-box {
  padding: 30px 20px;
  /* box-shadow: #00000040 0px 0px 19px 0px; */
  /* box-shadow: black 0px 0px 19px 0px; */
  margin-bottom: 30px;
  text-align: center;
  background-color: #F6F8FA;
  border-radius: 1rem;
}

.contact-box p {
  font-size: 1.4rem;
}

    padding: 0rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        width: 100%;
        margin: auto;

        .text-success{
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          color:#38c8a8;
          margin-bottom: 3rem;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input {
            border-radius: 1rem
          }

          textarea {
            border-radius: 1rem;
            resize: none;
          }

          Button {
            // max-width: 50rem;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;
