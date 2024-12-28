import React, { useState } from 'react';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import menuData from "../../JSONData/ProductListData.json"

// Sample Menu Data (Only Titles)
// const menuData = [
//     {
//         title: 'Lighting Fixtures',
//         childrens: [
//             { title: 'Architecture' },
//             { title: 'Entertainments' },
//             { title: 'Led Pixels' },
//             { title: 'Decorative' },
//             { title: 'TheaterStudioTelevision' },
//         ],
//     },
//     {
//         title: 'Video Displays',
//         childrens: [
//             { title: 'Indoor Series' },
//             { title: 'Outdoor Series' },
//         ],
//     },
//     {
//         title: 'Controllers Distribution & Interfaces',
//         childrens: [
//             { title: 'Led Controllers' },
//             { title: 'Dmx Controllers' },
//             { title: 'Signal Distributions & Power Supplies' },
//             { title: 'Decorders & Amplifiers' },
//             { title: 'Processors' },
//         ],
//     },
//     {
//         title: 'Rigging',
//         childrens: [
//             { title: 'Trusses' },
//             { title: 'Clamps' },
//             { title: 'Alluminium Profile' },
//             { title: 'Silicon Profile' },
//             { title: 'Stage Lighting' },
//             { title: 'Studio Lighting' },
//         ],
//     },
//     {
//         title: 'Spaers & Accessories',
//         childrens: [
//             { title: 'Connectors' },
//         ],
//     },
// ];

const DesktopNavbar = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Tracks active mega menu (Desktop)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Tracks mobile menu state
    const [dropdownOpen, setDropdownOpen] = useState(null); // Tracks dropdown in mobile view

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Toggle dropdown in mobile view
    const toggleDropdown = (menu) => {
        setDropdownOpen(dropdownOpen === menu ? null : menu);
    };

    // Toggle mega menu for large screens
    const toggleMegaMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <>
            <DesktopNavbarWrapper>
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

                        {/* Navigation Links */}
                        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                            {menuData.map((menu, index) => (
                                <li
                                    key={index}
                                    onMouseEnter={() => toggleMegaMenu(menu.title)}
                                    onMouseLeave={() => toggleMegaMenu(null)}
                                >
                                    <a href={`/${menu.title.replace(/\s+/g, '-').toLowerCase()}`} onClick={(e) => e.preventDefault()}>
                                        {menu.title}
                                    </a>

                                    {/* Mega Menu for Desktop */}
                                    {activeMenu === menu.title && (
                                        <div className="mega-menu">
                                            <div className="mega-menu-content">
                                                {menu.childrens.map((item, idx) => (
                                                    <div key={idx} className="mega-menu-item">
                                                        <a href={`/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>{item.title}</a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Icons */}
                        <div className="header-icons">
                            <FaSearch className="icon" />
                            <FaShoppingBag className="icon" />
                            <FaUser className="icon" />
                        </div>
                    </nav>
                </header>
            </DesktopNavbarWrapper>
        </>
    );
};

export default DesktopNavbar;

// Styled Components
const DesktopNavbarWrapper = styled.section`
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
    position: relative;
  }

  /* Logo */
  .logo img {
    height: 40px;
  }

  /* Navigation Links */
  .nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  .nav-links li {
    // position: relative;
    padding: 10px 0;
  }

  .nav-links a {
    text-decoration: none;
    color: #111;
    font-weight: 600;
    font-size: 14px;
  }

  /* Mega Menu */
  .mega-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100vw;
    background: #ffffff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .mega-menu-content {
    display: flex;
    gap: 20px;
  }

  /* Dropdown Menu for Mobile */
  .dropdown {
    display: none;
    flex-direction: column;
    padding: 10px;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .dropdown.open {
    display: flex;
  }

  .dropdown li {
    padding: 10px 0;
  }

  /* Icons */
  .header-icons {
    display: flex;
    gap: 15px;
  }

  .icon {
    font-size: 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .nav-links.open {
      display: block;
    }
  }
`;
