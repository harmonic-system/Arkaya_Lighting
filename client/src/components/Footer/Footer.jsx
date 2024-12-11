import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <footer>
          <div className="footer">
            <div className="container">
                <ul className="social">
                  <li><a target="_blank" href="https://www.facebook.com/profile.php?id=61550851665100" ><FaFacebook /></a></li>
                  {/* <li><a target="_blank" href="#"><FaTwitter /></a></li> */}
                  <li><a target="_blank" href="https://www.instagram.com/arkayalighting/"><FaInstagram /></a></li>
                  {/* <li><a target="_blank" href="#"><FaLinkedin /></a></li> */}
                </ul>
              <div className="grid grid-four-column">
                <div className="contact">
                  <h3>conatct us</h3>
                  <span>142, Main Patparganj Road,<br />Mayur Vihar Phase 1,<br /> New Delhi<br /><a href="mailto:arkayalighting@gmail.com" className="text-light">arkayalighting@gmail.com</a><br /><a href="tel:+919654612012" className="text-light">+91 9654612012</a></span>
                </div>
                <div className="contact">
                  <h3>Helpfull LINKS</h3>
                  <ul className="lik">
                    <li> <Link to="/discover">Discover us</Link></li>
                    <li> <Link to="/shippingandreturn">Shipping & Return</Link></li>
                    <li> <Link to="/privacypolicy">Privacy policy</Link></li>
                    <li> <Link to="/term&condition">Term & Condition</Link></li>
                    <li> <Link to="/faqs">FAQs</Link></li>
                    <li> <Link to="/contact">Contact us</Link></li>
                  </ul>
                </div>
                <div className="contact">
                  <h3>Resources</h3>
                  <ul className="lik">
                    <li> <Link to="/software">Software</Link></li>
                    <li> <Link to="/howtobuy">How to Buy</Link></li>
                    <li> <Link to="/datasheet">Data Sheet</Link></li>
                    <li> <Link to="/solutionsupport">Solution Support</Link></li>
                    {/* <li> <Link to="/contact">Technical support</Link></li> */}
                  </ul>
                </div>
                <div className="contact">
                  <h3>Arkaya Lighting</h3>
                  <span>Arkaya Lighting is a dynamic company specializing in the trading and distribution of cutting-edge lighting and video equipment. Renowned for their innovative solutions, Arkaya seamlessly blends technology and design, catering to diverse industries. With a commitment to excellence, they illuminate spaces and elevate experiences through their high-quality products and services.</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </FooterWrapper>
    </>
  )
}

export default Footer

const FooterWrapper = styled.section`
.footer {
	background: #1b1b1b;
	padding-top: 70px;
}

ul.social {
	display: flex;
	// flex-wrap: wrap;
	justify-content: center;
	margin: 0 auto;
}

ul.social li {
	display: inline-block;
	padding: 0px 10px;
}

ul.social li a {
	color: #fff;
	width: 50px;
	height: 50px;
	float: left;
	text-align: center;
	line-height: 50px;
	border-radius: 100%;
	font-size: 18px;
  display: flex;
	justify-content: center;
	align-items: center;
}

ul.social li a:hover {
	color: #fff;
	width: 50px;
	height: 50px;
	background: #181201;
	float: left;
	text-align: center;
	line-height: 50px;
	border-radius: 100%;
	font-size: 18px;

  & svg{
    fill: #ffc221;
  }
}

@media (max-width: 1110px){
  .grid-four-column {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 420px){
  .grid-four-column {
    grid-template-columns: repeat(1, 1fr);
  }
}

.contact {
	margin-top: 50px;
}

.contact h3 {
	color: #fff;
	font-weight: 500;
	font-size: 1.8rem;
	/* line-height: 30px; */
	padding-bottom: 30px;
	text-transform: uppercase;
}

.contact span {
	color: #fff;
	font-size: 1.3rem;
	line-height: 27px;
}

.contact a {
	color: #fff;
	font-size: 1.3rem;
	line-height: 27px;

  &:hover{
  color: #ffc221;
  }
}

ul.lik li a {
	color: #fff;
	font-size: 1.2rem;
	line-height: 27px;
}

ul.lik li a:hover {
	color: #ffc221;
}

.copyright {
	background-color: #ffc221;
	padding: 20px 0px;
	margin-top: 70px;
}

.copyright p {
	color: #023023;
	font-size: 18px;
	line-height: 22px;
	text-align: center;
}

.copyright a:hover {
	color: #fff;
}
`