// import React, { useState, useEffect } from 'react';
// import "./Newnavbar.css";
// import { FaBars, FaChevronDown } from 'react-icons/fa';

// const Navbar = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // Toggle the mobile menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Toggle dropdown menus
//   const toggleDropdown = (index) => {
//     setActiveDropdown(activeDropdown === index ? null : index);
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 992);
//       setMenuOpen(false);
//       setActiveDropdown(null);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Menu Data
//   const menuItems = [
//     {
//       title: 'electronics',
//       categories: {
//         top: ['Phones', 'Smart TVs', 'Laptops', 'Cameras', 'Gaming'],
//         other: ['iPhones', 'Speakers', 'Samsung', 'Headphones', 'GPS Devices'],
//         highlight: 'Best gadgets for your home!',
//         image: '/assets/images/car.png',
//       },
//     },
//     {
//       title: 'fashion',
//       categories: {
//         top: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"],
//         other: ['Jewelry', 'Bags', 'Kids Fashion', 'Watches', 'Belts'],
//         highlight: 'Stay trendy and fashionable!',
//         image: '/assets/images/cloth.png',
//       },
//     },
//   ];

//   return (
//     <nav className="nav-bar-random">
//       <div className="nav-brand-container">
//         <a href="/" className="nav-brand">
//           <img src="/images/arkaya-logo-transformed.png" alt="Logo" />
//         </a>
//         {isMobile && (
//           <button className="nav-toggler-btn" onClick={toggleMenu}>
//             <FaBars />
//           </button>
//         )}
//       </div>

//       <div className={`nav-collapse ${menuOpen ? 'nav-open' : ''}`}>
//         <ul className="nav-list">
//           <li>
//             <a href="/" className="nav-link">Home</a>
//           </li>
//           {menuItems.map((item, index) => (
//             <li key={index} className="nav-item">
//               <a
//                 href="#"
//                 className="nav-link dropdown-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   isMobile && toggleDropdown(index);
//                 }}
//               >
//                 {item.title}
//                 <span className="nav-icon">
//                   <FaChevronDown />
//                 </span>
//               </a>
//               <div
//                 className={`dropdown-menu ${activeDropdown === index || !isMobile ? 'dropdown-show' : ''}`}
//               >
//                 <div className="dropdown-item">
//                   <h4>Top Categories</h4>
//                   <ul>
//                     {item.categories.top.map((category, idx) => (
//                       <li key={idx}><a href="#">{category}</a></li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="dropdown-item">
//                   <h4>Other Categories</h4>
//                   <ul>
//                     {item.categories.other.map((category, idx) => (
//                       <li key={idx}><a href="#">{category}</a></li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="dropdown-highlight">
//                   <h2>{item.categories.highlight}</h2>
//                   <button className="dropdown-btn">Shop Now</button>
//                 </div>
//                 <div className="dropdown-image">
//                   <img src={item.categories.image} alt="Product" />
//                 </div>
//               </div>
//             </li>
//           ))}
//           <li><a href="#" className="nav-link">Deals</a></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from 'react';
import "./Newnavbar.css";
import { FaBars, FaChevronDown } from 'react-icons/fa';
import menuItems from "../../JSONData/ProductListData.json"

// Navbar Component
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState({});

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle dropdown menus for each level
  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle dropdown
    }));
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      setMenuOpen(false); // Close menu on resize
      setActiveDropdown({});
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render dropdown recursively
  const renderDropdown = (items, parentKey = '') => (
    <ul className="dropdown-list">
      {items.map((item, index) => {
        const key = `${parentKey}-${index}`;
        const hasChildren = item.childrens && item.childrens.length > 0;

        return (
          <li key={key} className="dropdown-item">
            <a href={item.path || "#"} className="dropdown-link">
              {item.title}
            </a>
            {hasChildren && (
              <>
                <span
                  className="nav-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(key); // Toggle on click
                  }}
                >
                  <FaChevronDown />
                </span>
                <div
                  className={`dropdown-menu ${
                    activeDropdown[key] ? 'dropdown-show' : ''
                  }`}
                >
                  {renderDropdown(item.childrens, key)}
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="nav-bar-random">
      <div className="nav-brand-container">
        <a href="/" className="nav-brand">
          <img src="/images/arkaya-logo-transformed.png" alt="Logo" />
        </a>
        {isMobile && (
          <button className="nav-toggler-btn" onClick={toggleMenu}>
            <FaBars />
          </button>
        )}
      </div>

      <div className={`nav-collapse ${menuOpen ? 'nav-open' : ''}`}>
        <ul className="nav-list">
          <li>
            <a href="/" className="nav-link">Home</a>
          </li>
          {menuItems.map((item, index) => {
            const key = `main-${index}`;
            return (
              <li key={key} className="nav-item">
                <a
                  href="#"
                  className="nav-link dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    isMobile && toggleDropdown(key);
                  }}
                >
                  {item.title}
                  <span className="nav-icon">
                    <FaChevronDown />
                  </span>
                </a>
                <div
                  className={`dropdown-menu ${
                    activeDropdown[key] ? 'dropdown-show' : ''
                  }`}
                >
                  {renderDropdown(item.childrens, key)}
                </div>
              </li>
            );
          })}
          <li><a href="#" className="nav-link">Deals</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


