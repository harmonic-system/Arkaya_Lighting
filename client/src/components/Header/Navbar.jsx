import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCategoryContext } from "../../context/category-context";

const getLogoPath = () => {
  if (window.location.pathname === "/") {
    return "images/arkaya-logo-transformed.png";
  } else if (window.location.pathname.startsWith("/admin")) {
    return "../images/arkaya-logo-transformed.png";
  } else {
    return "../../images/arkaya-logo-transformed.png";
  }
};


function handleImageError(imgElement) {
  const fallback = document.createElement('div');
  fallback.textContent = imgElement.alt;
  fallback.style.color = 'black';
  fallback.style.fontSize = '20px';
  fallback.style.fontWeight = '900';

  imgElement.parentElement.replaceChild(fallback, imgElement);
}

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false); // State to handle the mobile menu
  const { setCategoryinlocalStorage } = useCategoryContext()

  // Function to handle link click (closes menu)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setCategoryinlocalStorage(category);
    closeMenu();
  }

  return (
    <>
      <Wrapper>
        <nav>
          <div className="wrapper">
            <div className="top-logo">
              <Link to="/" onClick={closeMenu}>
                <img
                  src={getLogoPath()}
                  alt="Arkaya Lighting Logo"
                  onError={(e) => handleImageError(e.target)}
                  style={{ width: '170px', height: '70px', display: 'block' }}
                />
              </Link>
            </div>
            <input
              type="radio"
              name="slider"
              id="menu-btn"
              checked={menuOpen} // Binding state to the input
              onChange={() => setMenuOpen(!menuOpen)}
            />
            <input type="radio" name="slider" id="close-btn" />
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
              <label
                htmlFor="close-btn"
                className="btn close-btn text-light"
                onClick={() => setMenuOpen(false)}>
                <CgClose />
              </label>
              <li>
                <Link to="/" onClick={closeMenu}>
                  HOME
                </Link>
              </li>

              {/* Products Mega Menu Start */}
              <li>
                <Link className="desktop-item">PRODUCTS</Link>
                <input type="checkbox" id="showMega" />
                <label htmlFor="showMega" className="mobile-item">PRODUCTS</label>
                <div className="mega-box">
                  <div className="content">

                    <div className="pro">
                      <header>LIGHTING FIXTURE</header>
                      <hr />

                      <ul className="mega-links">
                        <li><Link to="/architecture" onClick={closeMenu}>Architecture</Link></li>
                        {/* <li><Link to="/architecture" onClick={closeMenu}>Architecture</Link></li> */}
                        <li><Link to="/entertainment" onClick={closeMenu}>Entertainment</Link></li>
                        <li><Link to="/ledpixels" onClick={closeMenu}>LED Pixels</Link></li>
                        <li><Link to="/decorative" onClick={closeMenu}>Decorative</Link></li>
                        <li><Link to="/theaterstudiotelevision" onClick={closeMenu}>Theater, Studio, Television</Link></li>
                      </ul>
                    </div>
                    <hr />

                    <div className="pro">
                      <header>Video Displays</header>
                      <hr />

                      <ul className="mega-links">
                        <li><Link to="/products" onClick={() => handleCategoryClick("indoors")}>Indoor Series</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("outdoors")}>Outdoor Series</Link></li>
                      </ul>
                    </div>
                    <hr />

                    <div className="pro">
                      <header>Controllers Distribution & Interfaces</header>
                      <hr />

                      <ul className="mega-links">
                        <li><Link to="/products" onClick={() => handleCategoryClick("ledcontrollers")}>LED Controllers</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("dmxcontrollers")}>DMX Controllers</Link></li>
                        <li><Link to="/signaldistributionandpowersupply" onClick={closeMenu}>Signal Distribution & Power Supply</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("decorderandamplifiers")}>Decorders & Amplifiers</Link></li>
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("processors")}>Processors</Link></li> */}
                      </ul>
                    </div>
                    <hr />

                    <div className="pro">
                      <header>Rigging</header>
                      <hr />

                      <ul className="mega-links">
                        <li><Link to="/products" onClick={() => handleCategoryClick("trusses")}>Truss</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("clamps")}>Clamps</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("alluminiumprofiles")}>Alluminium Profile</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("siliconprofiles")}>Silicon Profile</Link></li>
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("stagelightinges")}>Stage Lighting Systems</Link></li> */}
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("studiolightinges")}>Studio Lighting Systems</Link></li> */}
                      </ul>
                    </div>
                    <hr />

                    <div className="pro">
                      <header>Spaers & Accessories</header>
                      <hr />

                      <ul className="mega-links">
                        <li><Link to="/products" onClick={() => handleCategoryClick("connectors")}>Connectors</Link></li>
                      </ul>
                    </div>

                  </div>
                </div>
              </li>
              {/* Products Mega Menu End */}

              {/* <li>
                <Link to="/brandsPatner" onClick={closeMenu}>
                  BRANDS PARTNERS
                </Link>
              </li> */}

              <li>
                <Link to="/application" onClick={closeMenu}>
                  APPLICATION
                </Link>
              </li>

              <li>
                <Link className="desktop-item">RESOURCES</Link>
                <input type="checkbox" id="showDrop" />
                <label htmlFor="showDrop" className="mobile-item">
                  RESOURCES
                </label>
                <ul className="drop-menu">
                  <li>
                    <Link to="/software" onClick={() => setMenuOpen(false)}>
                      Software
                    </Link>
                  </li>
                  <li>
                    <Link to="/howtobuy" onClick={() => setMenuOpen(false)}>
                      How To Buy
                    </Link>
                  </li>
                  <li><Link to="/datasheet" onClick={() => setMenuOpen(false)}>DataSheet</Link></li>
                  <li><Link to="/solutionsupport" onClick={() => setMenuOpen(false)}>Solution Support</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/discover" onClick={closeMenu}>
                  DISCOVER US
                </Link>
              </li>

              <li>
                <Link to="/contact" onClick={closeMenu}>
                  CONTACT
                </Link>
              </li>
            </ul>

            <label
              htmlFor="menu-btn"
              className="btn menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}>
              <CgMenu />
            </label>
          </div>
        </nav>
      </Wrapper>
    </>
  );
};

export default Navbar;

const Wrapper = styled.section`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

border-bottom: 1px solid #ddd;

nav {
  z-index: 99999999;
  width: 100%;
  height: 100px;
  padding:20px;
  // background-color: #e1e4e8;
  // background-color: #ebeff3;
  background-color: #f6f8fa;
}

nav .wrapper {
  position: relative;
  /* max-width: 1300px; */
  padding: 0px 30px;
  height: 100%;
  line-height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 0px 0px;
    align-items: center;
  }
}

.wrapper .top-logo {
  height: 100%;
  position: relative;
  display: inline-block;
}

.wrapper .top-logo a {
  color: #f2f2f2;
}

@keyframes logoAnimation {
  0% {
    transform: translateY(-50px); /* Start from above */
    opacity: 0; /* Invisible initially */
  }
  50% {
    transform: translateY(15px); /* Slight bounce down */
    opacity: 1; /* Make it visible */
  }
  100% {
    transform: translateY(0); /* Set to the final position */
  }
}

.wrapper .top-logo img {
  animation: logoAnimation 1s ease-out forwards; /* Apply the animation */
}

.wrapper .top-logo a img:not([src])::after {
  content: attr(alt);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
}

.wrapper .nav-links {
  display: inline-flex;
}

.nav-links li {
  list-style: none;
}

.nav-links li a {
  color: black;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 9px 15px;
  border-radius: 5px;
  height: 100%;
  transition: all 0.3s ease;
}

.nav-links li a:hover {
  color: #ffc221;
}

.nav-links .mobile-item {
  display: none;
}

.nav-links .drop-menu {
  position: absolute;
  background: #f6f8fa;
  border-radius: 1rem;
  width: 180px;
  line-height: 45px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  z-index: 9999999;
}

.nav-links .drop-menu-profile {
  position: absolute;
  background: #f6f8fa;
  border-radius: 1rem;
  width: 100px;
  line-height: 45px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  z-index: 9999999;
}

.drop-menu li:hover,
.drop-menu-profile li:hover {
  background: #ebeff3;
  border-radius: 1rem;
}

.nav-links li:hover .drop-menu,
.nav-links li:hover .drop-menu-profile,
.nav-links li:hover .mega-box {
  transition: all 0.3s ease;
  top: 50px;
  opacity: 1;
  visibility: visible;
}

.drop-menu-profile li a ,
.drop-menu li a {
  width: 100%;
  display: block;
  padding: 0 0 0 15px;
  font-weight: 400;
  border-radius: 0px;
  color: #000;
  font-size: 1.3rem;
}

.mega-box {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 30px;
  top: 50px;
  opacity: 0;
  visibility: hidden;
  z-index: 9999999;
}

.mega-box .content {
  border-radius: 1rem;
  background: #f6f8fa;
  padding: 25px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.mega-box .content hr {
  border: 2px solid #ffc221;
}

.mega-box .content .pro {
  line-height: 45px;
}

.content .pro header {
  color: #000;
  font-size: 1.3rem;
  font-weight: 700;
}

.pro .mega-links li {
  padding: 0 20px;
}

.pro .mega-links li a {
  padding: 0px;
  padding: 0 20px;
  color: #000;
  font-size: 1.3rem;
  display: block;
}

.pro .mega-links li a:hover {
  color: #ffc221;
  background: #ebeff3;
}

.wrapper .btn {
  color: black;
  font-size: 20px;
  cursor: pointer;
  display: none;
}

.wrapper .btn.close-btn {
  position: absolute;
  right: 30px;
  top: 10px;
}

.profile {
  margin: 0;
  padding: 0;
  background: #242526;
}

.profile li a {
  margin: 0;
  padding: 0;
  padding-left: 20px;
  line-height: 3 !important;
  font-family: 'Poppins', sans-serif !important;
}

.profile li a:hover {
  color: #ffc221 !important;
}

@media screen and (max-width: 1080px) {
  .wrapper .btn {
    display: block;
    margin-top: 10px;
  }

  // .wrapper .top-logo {
  //   width: 200px;
  //   height: 100%;
  // }

  .wrapper .nav-links {
    position: fixed;
    height: 100vh;
    width: 100%;
    max-width: 350px;
    top: 0;
    left: -100%;
    background: #f6f8fa;
    display: block;
    padding: 50px 10px;
    line-height: 50px;
    overflow-y: auto;
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.18);
    transition: all 0.3s ease;
    z-index: 5;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  // ::-webkit-scrollbar-track {
  //   background: #242526;
  // }

  ::-webkit-scrollbar-thumb {
    background: #3A3B3C;
  }

  #menu-btn:checked~.nav-links {
    left: 0%;
  }

  #menu-btn:checked~.btn.menu-btn {
    display: none;
  }

  #close-btn:checked~.btn.menu-btn {
    display: block;
  }

  .nav-links li {
    margin: 15px 10px;
  }

  .nav-links li a {
    padding: 0 20px;
    display: block;
    font-size: 1.5rem !important;
    color: #000;
  }

  .nav-links li a:hover {
    background: #ebeff3;
  }

  .nav-links .drop-menu-profile ,
  .nav-links .drop-menu {
    position: static;
    opacity: 1;
    top: 65px;
    visibility: visible;
    padding-left: 20px;
    width: 100%;
    max-height: 0px;
    overflow: hidden;
    box-shadow: none;
    transition: all 0.3s ease;
  }

  #showDrop:checked~.drop-menu,
  #showMega:checked~.mega-box {
    max-height: 100%;
  }

  #showDrop-profile:checked~.drop-menu-profile{
    max-height: 100%;
  }

  .nav-links .desktop-item {
    display: none;
  }

  .nav-links .mobile-item {
    display: block;
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;
    padding-left: 20px;
    cursor: pointer;
    border-radius: 5px;
    z-index: 999999;
    transition: all 0.3s ease;
  }

  .nav-links .mobile-item:hover {
    background: #ebeff3;
    color: #ffc221;
  }

  .drop-menu li {
    margin: 0;
  }

  .drop-menu-profile li {
    margin: 0;
  }

  .drop-menu li a {
    border-radius: 5px;
    font-size: 1.2rem;
  }

  .drop-menu-profile li a {
    border-radius: 5px;
    font-size: 1.2rem;
  }

  .mega-box {
    position: static;
    top: 65px;
    opacity: 1;
    visibility: visible;
    padding: 0 20px;
    max-height: 0px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .mega-box .content {
    box-shadow: none;
    flex-direction: column;
    padding: 20px 20px 0 20px;
  }

  .mega-box .content hr{
   display: none;
  }

  .mega-box .content .pro {
    width: 100%;
    margin-bottom: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .mega-box .content .pro:nth-child(1),
  .mega-box .content .pro:nth-child(2) {
    border-top: 0px;
  }

  .content .pro .mega-links {
    border-left: 0px;
    padding-left: 15px;
    margin-left: -40px !important;
  }

  .pro .mega-links li {
    margin: 0;
    padding: 0;
  }

  .content .pro header {
    font-size: 1.5rem;
    margin-left:-20px;
  }
}

nav input[type="radio"],
nav input[type="checkbox"] {
  display: none;
}

@media screen and (max-width: 720px) {
  // .wrapper .top-logo {
  //   width: 200px;
  //   height: 100%;
  // }
}

@media screen and (min-width: 1080px) {
  // .wrapper .top-logo {
  //   width: 200px;
  //   height: 100%;
  // }
    
}

.nav-links.open {
  left: 0;
}
`


