import React, { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaShoppingBag,
  FaUser,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import styled from 'styled-components';
import menuData from "../../JSONData/ProductListData.json"

// Sample Menu Data (Only Titles)
// const menuData = [
//   {
//     title: 'Lighting Fixtures',
//     childrens: [
//       { title: 'Architecture' },
//       { title: 'Entertainments' },
//       { title: 'Led Pixels' },
//       { title: 'Decorative' },
//       { title: 'TheaterStudioTelevision' },
//     ],
//   },
//   {
//     title: 'Video Displays',
//     childrens: [
//       { title: 'Indoor Series' },
//       { title: 'Outdoor Series' },
//     ],
//   },
//   {
//     title: 'Controllers Distribution & Interfaces',
//     childrens: [
//       { title: 'Led Controllers' },
//       { title: 'Dmx Controllers' },
//       { title: 'Signal Distributions & Power Supplies' },
//       { title: 'Decorders & Amplifiers' },
//       { title: 'Processors' },
//     ],
//   },
//   {
//     title: 'Rigging',
//     childrens: [
//       { title: 'Trusses' },
//       { title: 'Clamps' },
//       { title: 'Alluminium Profile' },
//       { title: 'Silicon Profile' },
//       { title: 'Stage Lighting' },
//       { title: 'Studio Lighting' },
//     ],
//   },
//   {
//     title: 'Spaers & Accessories',
//     childrens: [
//       { title: 'Connectors' },
//     ],
//   },
// ];

const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Tracks off-canvas menu state
  const [dropdownOpen, setDropdownOpen] = useState({}); // Tracks dropdown states

  // Toggle off-canvas menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle dropdown for individual menus
  const toggleDropdown = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle state
    }));
  };

  return (
    <>
      <MobileNavbarWrapper>
        <header className="header">
          {/* Top Bar */}
          <div className="header-top">
            <p>Find a Store | Help | Join Us | Sign In</p>
          </div>

          {/* Main Navigation */}
          <nav className="header-nav">
            <div className="logo">
              <a href="/">
                <img src="/images/arkaya-logo-transformed.png" alt="Logo" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Off-Canvas Menu */}
            <div className={`off-canvas-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <div className="off-canvas-header">
                <h2>Menu</h2>
                <FaTimes className="close-icon" onClick={toggleMobileMenu} />
              </div>

              <ul className="off-canvas-links">
                {menuData.map((menu, index) => (
                  <li key={index}>
                    <div
                      className="dropdown-header"
                      onClick={() => toggleDropdown(menu.title)}
                    >
                      {menu.title}
                      {dropdownOpen[menu.title] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <ul
                      className={`dropdown ${dropdownOpen[menu.title] ? 'open' : ''}`}
                    >
                      {menu.childrens.map((item, idx) => (
                        <li key={idx}>
                          <a
                            href={`/${item.title
                              .replace(/\s+/g, '-')
                              .toLowerCase()}`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>
      </MobileNavbarWrapper>
    </>
  );
};

export default MobileNavbar;

// Styled Components
const MobileNavbarWrapper = styled.section`
  /* Header Top */
  .header-top {
    display: flex;
    justify-content: center;
    background: #f5f5f5;
    padding: 8px;
    font-size: 12px;
    color: #333;
  }

  /* Navigation Bar */
  .header-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Logo */
  .logo img {
    height: 40px;
  }

  /* Mobile Menu Icon */
  .mobile-menu-icon {
    display: block;
    font-size: 24px;
    cursor: pointer;
  }

  /* Off-Canvas Menu */
  .off-canvas-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100%;
    background: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1000;
    transition: right 0.3s ease;
  }

  .off-canvas-menu.open {
    right: 0;
  }

  .off-canvas-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .close-icon {
    cursor: pointer;
  }

  .off-canvas-links {
    list-style: none;
    padding: 0;
  }

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    padding: 10px 0;
    cursor: pointer;
  }

  .dropdown {
    display: none;
    flex-direction: column;
    padding-left: 15px;
  }

  .dropdown.open {
    display: flex;
  }

  .dropdown li {
    padding: 8px 0;
  }

  .dropdown a {
    text-decoration: none;
    color: #111;
    font-weight: 500;
    font-size: 14px;
  }
`;

