import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from "react-icons/cg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Dropdown icons
import { useCategoryContext } from "../../context/category-context";

// Logo path based on routes
const getLogoPath = () => {
  if (window.location.pathname === "/") {
    return "images/arkaya-logo-transformed.png";
  } else if (window.location.pathname.startsWith("/admin")) {
    return "../images/arkaya-logo-transformed.png";
  } else {
    return "../../images/arkaya-logo-transformed.png";
  }
};

// Fallback image handling
function handleImageError(imgElement) {
  const fallback = document.createElement("div");
  fallback.textContent = imgElement.alt;
  fallback.style.color = "black";
  fallback.style.fontSize = "20px";
  fallback.style.fontWeight = "900";

  imgElement.parentElement.replaceChild(fallback, imgElement);
}

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState({}); // Dropdown visibility state
  const { setCategoryinlocalStorage } = useCategoryContext();

  // Close mobile menu
  const closeMenu = () => setMenuOpen(false);

  // Set category in localStorage and close the menu
  const handleCategoryClick = (category) => {
    setCategoryinlocalStorage(category);
    closeMenu();
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle specific dropdown
    }));
  };

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
                <Link to="/home" onClick={closeMenu}>
                  HOME
                </Link>
              </li>

              {/* Products Mega Menu Start */}
              <li>
                <Link className="desktop-item">PRODUCTS</Link>
                <input type="checkbox" id="showMega" />
                <label htmlFor="showMega" className="mobile-item">
                  PRODUCTS
                </label>
                <div className="mega-box">
                  <div className="content">
                    {/* LIGHTING FIXTURE */}
                    <hr/>
                    <div className="pro">
                      <header onClick={() => toggleDropdown(0)}>
                        LIGHTING FIXTURE
                        {dropdownOpen[0] ? <FiChevronUp /> : <FiChevronDown />}
                      </header>
                      <hr />
                      <ul
                        className={`mega-links ${dropdownOpen[0] ? "show" : ""
                          }`}
                      >
                        <li>
                          <Link to="/architecture" onClick={closeMenu}>
                            Architecture
                          </Link>
                        </li>
                        <li>
                          <Link to="/entertainment" onClick={closeMenu}>
                            Entertainment
                          </Link>
                        </li>
                        <li>
                          <Link to="/ledpixels" onClick={closeMenu}>
                            LED Pixels
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/decorative" onClick={closeMenu}>
                            Decorative
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to="/theaterstudiotelevision"
                            onClick={closeMenu}
                          >
                            Theater, Studio, Television
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <hr />

                    {/* VIDEO DISPLAYS */}
                    <div className="pro">
                      <header onClick={() => toggleDropdown(1)}>
                        Video Displays
                        {dropdownOpen[1] ? <FiChevronUp /> : <FiChevronDown />}
                      </header>
                      <hr />
                      <ul
                        className={`mega-links ${dropdownOpen[1] ? "show" : ""
                          }`}
                      >
                        <li>
                          <Link
                            to="/products"
                            onClick={() =>
                              handleCategoryClick("Indoor Video Displays")
                            }
                          >
                            Indoor Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            onClick={() =>
                              handleCategoryClick("Outdoor Video Displays")
                            }
                          >
                            Outdoor Series
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <hr />

                    {/* Controllers Distribution & Interfaces */}
                    <div className="pro">
                      <header onClick={() => toggleDropdown(2)}>
                        Controllers Distribution & Interfaces
                        {dropdownOpen[2] ? <FiChevronUp /> : <FiChevronDown />}
                      </header>
                      <hr />
                      <ul
                        className={`mega-links ${dropdownOpen[2] ? "show" : ""
                          }`}
                      >
                        <li><Link to="/products" onClick={() => handleCategoryClick("Led Controllers")}>LED Controllers</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("Dmx Controllers")}>DMX Controllers</Link></li>
                        <li><Link to="/signaldistributionandpowersupply" onClick={closeMenu}>Signal Distribution & Power Supply</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("Decorder & Amplifiers")}>Decorders & Amplifiers</Link></li>
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("Processors")}>Processors</Link></li> */}
                      </ul>
                    </div>
                    <hr />

                    {/* Rigging */}
                    <div className="pro">
                      <header onClick={() => toggleDropdown(3)}>
                        Rigging
                        {dropdownOpen[3] ? <FiChevronUp /> : <FiChevronDown />}
                      </header>
                      <hr />
                      <ul
                        className={`mega-links ${dropdownOpen[3] ? "show" : ""
                          }`}
                      >
                        <li><Link to="/products" onClick={() => handleCategoryClick("Truss")}>Truss</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("Clamps")}>Clamps</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("Alluminium Profiles")}>Alluminium Profile</Link></li>
                        <li><Link to="/products" onClick={() => handleCategoryClick("Silicon Profiles")}>Silicon Profile</Link></li>
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("Stage Lightings")}>Stage Lighting Systems</Link></li> */}
                        {/* <li><Link to="/products" onClick={() => handleCategoryClick("Studio Lightings")}>Studio Lighting Systems</Link></li> */}
                      </ul>
                    </div>
                    <hr />

                    {/* Spaers & Accessories */}
                    <div className="pro">
                      <header onClick={() => toggleDropdown(4)}>
                        Spaers & Accessories
                        {dropdownOpen[4] ? <FiChevronUp /> : <FiChevronDown />}
                      </header>
                      <hr />
                      <ul
                        className={`mega-links ${dropdownOpen[4] ? "show" : ""
                          }`}
                      >
                        <li><Link to="/products" onClick={() => handleCategoryClick("Connectors")}>Connectors</Link></li>
                      </ul>
                    </div>
                    <hr />

                  </div>
                </div>
              </li>

              {/* Products Mega Menu End */}

              <li>
                <Link to="/technologyPatner" onClick={closeMenu}>
                  TECHNOLOGY PARTNERS
                </Link>
              </li>

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
                  {/* <li><Link to="/datasheet" onClick={() => setMenuOpen(false)}>DataSheet</Link></li> */}
                  {/* <li><Link to="/solutionsupport" onClick={() => setMenuOpen(false)}>Solution Support</Link></li> */}
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
    font-family: Avenir, sans-serif;
  }

  border-bottom: 1px solid #ddd;

  nav {
    z-index: 99999999;
    width: 100%;
    height: 100px;
    padding: 20px;
    background-color: #f6f8fa;
  }

  nav .wrapper {
    position: relative;
    padding: 0 30px;
    height: 100%;
    line-height: 70px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      padding: 0;
      align-items: center;
    }
  }

  .wrapper .top-logo img {
    animation: logoAnimation 1s ease-out forwards;
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

  .drop-menu li:hover {
    background: #ebeff3;
    border-radius: 1rem;
  }

  .nav-links li:hover .drop-menu,
  .nav-links li:hover .mega-box {
    transition: all 0.3s ease;
    top: 50px;
    opacity: 1;
    visibility: visible;
  }

  .drop-menu li a {
    width: 100%;
    display: block;
    padding: 0 0 0 15px;
    font-weight: 400;
    border-radius: 0;
    color: #000;
    font-size: 1.3rem;
  }

  .drop-menu li:hover {
    background: #ebeff3;
    border-radius: 1rem;
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

  .content .pro header svg {
    display: none;
  }

  .pro .mega-links {
    margin-top: 1rem;
  }

  .pro .mega-links li a {
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

  @media screen and (min-width: 768px) and (max-width: 1099px) {
    .content .pro header {
      font-size: 1.1rem !important;
      font-weight: 700;
    }

    .pro .mega-links li a {
      font-size: 1.2rem !important;
    }
  }

  @media screen and (max-width: 1100px) {
    .wrapper .btn {
      display: block;
      margin-top: 10px;
    }

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

    #menu-btn:checked ~ .nav-links {
      left: 0%;
    }

    #menu-btn:checked ~ .btn.menu-btn {
      display: none;
    }

    #close-btn:checked ~ .btn.menu-btn {
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

    .nav-links .drop-menu {
      position: static;
      opacity: 1;
      top: 65px;
      visibility: visible;
      padding-left: 20px;
      width: 100%;
      max-height: 0;
      overflow: hidden;
      box-shadow: none;
      transition: all 0.3s ease;
    }

    .drop-menu li a {
      border-radius: 5px;
      font-size: 1.2rem;
    }

    #showDrop:checked ~ .drop-menu,
    #showMega:checked ~ .mega-box {
      max-height: 100%;
    }

    .mega-box {
      position: static;
      top: 65px;
      opacity: 1;
      visibility: visible;
      padding: 0 20px;
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .mega-box .content {
      box-shadow: none;
      flex-direction: column;
      padding: 20px 20px 0 20px;
    }

    .mega-box .content hr {
      display: none;
    }

    .mega-box .content .pro {
      width: 100%;
      margin-bottom: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .content .pro header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem 1rem;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 700;
      background: #ebeff3;
      border-radius: 5px;
      margin-left: -30px;
    }

    .pro header svg {
      display: block !important;
      font-size: 1.8rem !important;
    }

    .content .pro .mega-links {
      border-left: 0;
      padding-left: 15px;
      margin-left: -50px !important;
    }

    .pro .mega-links li {
      margin: 0;
      padding: 0;
    }

    .pro .mega-links li:hover {
    background: #ebeff3;
  }

  .mega-links {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .mega-links.show {
    max-height: 300px;
    opacity: 1;
  }
}

nav input[type="radio"],
nav input[type="checkbox"] {
  display: none;
}

.nav-links.open {
  left: 0;
}

`
