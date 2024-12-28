import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterWrapper>
      <footer>
        <div className="footer">
          <div className="container">
            <ul className="social">
              <li><a target="_blank" href="https://www.facebook.com/profile.php?id=61550851665100" ><FaFacebook /></a></li>
              <li><a target="_blank" href="#"><FaTwitter /></a></li>
              <li><a target="_blank" href="https://www.instagram.com/arkayalighting/"><FaInstagram /></a></li>
              <li><a target="_blank" href="#"><FaLinkedin /></a></li>
            </ul>
            <div className="grid grid-four-column">
              <div className="contact">
                <h3>Contact Us</h3>
                <span>
                  142, Main Patparganj Road,<br />
                  Mayur Vihar Phase 1,<br />
                  New Delhi<br />
                  <a href="mailto:arkayalighting@gmail.com" className="text-light">
                    arkayalighting@gmail.com
                  </a>
                  <br />
                  <a href="tel:+919654612012" className="text-light">
                    +91 9654612012
                  </a>
                </span>
              </div>
              <div className="contact">
                <h3>Helpful Links</h3>
                <ul className="lik">
                  <li>
                    <Link to="/discover">Discover Us</Link>
                  </li>
                  <li>
                    <Link to="/shippingandreturn">Shipping & Return</Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/term&condition">Terms & Condition</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="contact">
                <h3>Resources</h3>
                <ul className="lik">
                  <li>
                    <Link to="/software">Software</Link>
                  </li>
                  <li>
                    <Link to="/howtobuy">How to Buy</Link>
                  </li>
                  {/* <li>
                    <Link to="/datasheet">Data Sheet</Link>
                  </li> */}
                  {/* <li>
                    <Link to="/solutionsupport">Solution Support</Link>
                  </li> */}
                </ul>
              </div>
              <div className="contact">
                <h3>Arkaya Lighting</h3>
                <span>
                  Arkaya Lighting is a dynamic company specializing in the
                  trading and distribution of cutting-edge lighting and video
                  equipment. Renowned for their innovative solutions, Arkaya
                  seamlessly blends technology and design, catering to diverse
                  industries. With a commitment to excellence, they illuminate
                  spaces and elevate experiences through their high-quality
                  products and services.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-2">
          <p>
            "Thank you for lighting up our journey with your trust and support.
            At Arkaya Lighting, your satisfaction is our brightest achievement.
            Here's to creating more beautiful moments together!"
          </p>
          <FaHeart className="heart-icon" />
        </div>
      </footer>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.section`
  .footer {
    background: #1b1b1b;
    padding-top: 50px;
  }

  ul.social {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  ul.social li a {
    color: #fff;
    width: 40px;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }

  ul.social li a:hover {
    background: #181201;
    color: #ffc221;
  }

  .grid-four-column {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .contact {
    margin-bottom:50px;
  }

  .contact h3 {
    color: #fff;
    font-weight: 500;
    font-size: 1.8rem;
    padding-bottom: 20px;
    text-transform: uppercase;
  }

  .contact span,
  .contact a {
    color: #fff;
    font-size: 1.3rem;
    line-height: 27px;
  }

  .contact a:hover {
    color: #ffc221;
  }

  ul.lik li a {
    color: #fff;
    font-size: 1.2rem;
    line-height: 27px;
  }

  ul.lik li a:hover {
    color: #ffc221;
  }

  .footer-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
    background: #1b1b1b;
    font-family: Arial, sans-serif;
    color: #fff;
    padding-bottom: 100px;
  }

  .footer-2 p {
    font-size: 1.2rem;
    line-height: 1.5;
    max-width: 90%;
    color:#fff;
  }

  .heart-icon {
    color: red;
    font-size: 1.5rem;
    z-index: 1;
    animation: heartbeat 1.5s infinite;
  }

  @keyframes heartbeat {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  /* Media Queries */
  // @media (max-width: 768px) {
  @media (max-width: 1110px) {
    .grid-four-column {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .footer-2 p {
      font-size: 1rem;
      line-height: 1.3;
    }

    .heart-icon {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 420px) {
    .grid-four-column {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .contact h3 {
      font-size: 1.4rem;
    }

    .contact span,
    .contact a {
      font-size: 1.1rem;
    }

    .footer-2 {
      padding: 10px;
      padding-bottom:100px;
    }

    .footer-2 p {
      font-size: 1rem;
    }

    .heart-icon {
      font-size: 1.2rem;
    }
  }
`;
