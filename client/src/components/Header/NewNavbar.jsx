// import React, { useState, useEffect } from 'react';
// import { FaBars, FaChevronDown } from 'react-icons/fa';
// import styled from 'styled-components';

// const NewNavbar = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   const [isOpen, setIsOpen] = useState(false);
//   const [subMenuOpen, setSubMenuOpen] = useState({});

//   // Toggle Navbar for mobile
//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle submenu toggle
//   const toggleSubMenu = (index) => {
//     setSubMenuOpen((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   // Handle resizing
//   useEffect(() => {
//     const handleResize = () => {
//       const isMobileView = window.innerWidth <= 992;
//       setIsMobile(isMobileView);

//       if (!isMobileView) {
//         setIsOpen(false); // Reset menu for desktop view
//         setSubMenuOpen({}); // Close submenus
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       <NewNavbarWrapper>
//         <div className="container">
//           <nav className="navbar">
//             <div className="brand-and-icon">
//               <a href="/" className="navbar-brand">
//                 <img src="/images/arkaya-logo-transformed.png" alt="Logo" />
//               </a>
//               {isMobile && (
//                 <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
//                   <FaBars />
//                 </button>
//               )}
//             </div>

//             <div className={`navbar-collapse ${isOpen ? 'open' : ''}`}>
//               <ul className="navbar-nav">
//                 <li><a href="#">Home</a></li>

//                 <li>
//                   <a href="#" className="menu-link" onClick={() => toggleSubMenu(1)}>
//                     Electronics
//                     <span className="drop-icon"><FaChevronDown /></span>
//                   </a>
//                   <div className={`sub-menu ${subMenuOpen[1] ? 'open' : ''}`}>
//                     <div className="sub-menu-item">
//                       <h4>Top Categories</h4>
//                       <ul>
//                         <li><a href="#">Cell Phones & Accessories</a></li>
//                         <li><a href="#">Smart TV</a></li>
//                         <li><a href="#">Computers & Laptops</a></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </li>

//                 <li>
//                   <a href="#" className="menu-link" onClick={() => toggleSubMenu(2)}>
//                     Fashion
//                     <span className="drop-icon"><FaChevronDown /></span>
//                   </a>
//                   <div className={`sub-menu ${subMenuOpen[2] ? 'open' : ''}`}>
//                     <div className="sub-menu-item">
//                       <h4>Categories</h4>
//                       <ul>
//                         <li><a href="#">Men's Clothing</a></li>
//                         <li><a href="#">Women's Clothing</a></li>
//                         <li><a href="#">Shoes</a></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </li>

//                 <li><a href="#">Deals</a></li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </NewNavbarWrapper>
//     </>
//   );
// };

// export default NewNavbar;


// const NewNavbarWrapper = styled.section`
// /* General Styles */
// * {
//   box-sizing: border-box;
//   padding: 0;
//   margin: 0;
//   font-family: 'Roboto', sans-serif;
// }
// body {
//   line-height: 1.4;
// }
// .navbar {
//   background: #fafafa;
//   padding: 0 1rem;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 10;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #ddd;
// }
// .brand-and-icon {
//   display: flex;
//   justify-content: space-between;
//   padding: 1rem 0;
//   border:1px solid red;
// }
// .navbar-brand {
//   font-size: 1.8rem;
//   font-weight: 700;
// }

// .navbar-brand img {
//     height: 40px;
// }

// .navbar-toggler {
//   background: transparent;
//   border: none;
//   font-size: 1.8rem;
//   cursor: pointer;
//   padding: 0.2rem 0.5rem;
// }
// .navbar-collapse {
//   display: none;
// }
// .navbar-collapse.open {
//   display: block;
// }
// .navbar-nav {
//   list-style: none;
//   display:flex;
//   gap: 2rem;
//   align-items: center;
// }
// .navbar-nav > li > a {
//   text-transform: uppercase;
//   font-size: 1.1rem;
//   padding: 0.6rem 0;
//   margin: 0.2rem 0;
//   display: block;
// }
// .drop-icon {
//   float: right;
// }
// .sub-menu {
//   display: none;
//   padding-left: 1rem;
// }
// .sub-menu.open {
//   display: block;
// }
// .sub-menu-item h4 {
//   margin: 0.5rem 0;
// }
// .sub-menu-item ul {
//   list-style: none;
// }
// .sub-menu-item ul li a {
//   padding: 0.2rem 0;
//   display: block;
// }
// @media (min-width: 992px) {
//   .navbar {
//     display: flex;
//     align-items: center;
//     padding: 0 5rem;
//   }
//   .navbar-toggler {
//     display: none;
//   }
//   .navbar-collapse {
//     display: flex;
//   }
//   .navbar-nav {
//     display: flex;
//   }
//   .sub-menu {
//     position: absolute;
//     display: none;
//     background: #f8f8f8;
//     padding: 1rem;
//   }
//   .navbar-nav > li:hover .sub-menu {
//     display: block;
//   }
// }

// `



import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

const NewNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isOpen, setIsOpen] = useState(false); // Main Navbar Toggle
  const [activeMenus, setActiveMenus] = useState({}); // Submenu Toggles

  // Sample Menu Data
  const menuData = [
    {
      title: "Lighting Fixtures",
      childrens: [
        {
          title: "Architecture",
          childrens: [
            { title: "Flood Lights", path: "/admin/products" },
            { title: "UnderWater Lights", path: "/admin/products" }
          ]
        },
        {
          title: "Entertainments",
          childrens: [
            { title: "Moving Head Series Lamp", path: "/admin/products" },
            { title: "Effects Lights", path: "/admin/products" }
          ]
        }
      ]
    },
    {
      title: "Video Displays",
      childrens: [
        { title: "Indoor Series", path: "/admin/products" },
        { title: "Outdoor Series", path: "/admin/products" }
      ]
    }
  ];

  // Toggle Mobile Navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  // Toggle Submenus for Mobile
  const toggleSubMenu = (key) => {
    setActiveMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Detect Screen Size Change
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 992;
      setIsMobile(isMobileView);

      if (!isMobileView) {
        setIsOpen(false);
        setActiveMenus({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recursive Menu Renderer
  const renderMenu = (items, level = 0) => {
    return (
      <ul className={`menu-level-${level}`}>
        {items.map((item, index) => {
          const key = `${item.title}-${level}-${index}`;
          const hasChildren = item.childrens && item.childrens.length > 0;

          return (
            <li key={key} className={`menu-item level-${level}`}>
              <a
                href={item.path || '#'}
                className="menu-link"
                onClick={(e) => {
                  if (isMobile && hasChildren) {
                    e.preventDefault();
                    toggleSubMenu(key);
                  }
                }}
              >
                {item.title}
                {hasChildren && <FaChevronDown className="drop-icon" />}
              </a>

              {hasChildren && (
                <div
                  className={`sub-menu ${
                    activeMenus[key] || (!isMobile ? 'desktop-open' : '')
                  }`}
                >
                  {renderMenu(item.childrens, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <NewNavbarWrapper>
      <div className="container">
        <nav className="navbar">
          <div className="brand-and-icon">
            <a href="/" className="navbar-brand">
              <img src="/images/arkaya-logo-transformed.png" alt="Logo" />
            </a>
            {isMobile && (
              <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
                <FaBars />
              </button>
            )}
          </div>

          <div className={`navbar-collapse ${isOpen ? 'open' : ''}`}>
            {renderMenu(menuData)}
          </div>
        </nav>
      </div>
    </NewNavbarWrapper>
  );
};

export default NewNavbar;

// Styles
const NewNavbarWrapper = styled.section`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  .navbar {
    background: #fafafa;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }

  .navbar-brand img {
    height: 40px;
  }

  .navbar-toggler {
    background: transparent;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .navbar-collapse {
    display: none;
  }

  .navbar-collapse.open {
    display: block;
  }

  .menu-level-0 {
    list-style: none;
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .menu-link {
    text-transform: uppercase;
    font-size: 1.1rem;
    padding: 0.6rem 0;
    display: block;
  }

  .drop-icon {
    margin-left: 0.5rem;
  }

  .sub-menu {
    display: none;
    position: absolute;
    background: #f8f8f8;
    padding: 1rem;
    z-index: 5;
  }

  .sub-menu.desktop-open {
    display: block;
  }

  .sub-menu.open {
    display: block;
  }

  .menu-item {
    position: relative;
  }

  @media (min-width: 992px) {
    .navbar-collapse {
      display: flex !important;
    }

    .sub-menu {
      display: none;
    }

    .menu-item:hover > .sub-menu {
      display: block;
    }
  }
`;
