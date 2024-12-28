import React, { useState, useEffect } from 'react';
import "./Newnavbar.css";

const SubMenu = ({ title, categories, description, imgSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Toggle submenu
  const toggleSubMenu = () => setIsOpen(!isOpen);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close submenu automatically on large screens
  useEffect(() => {
    if (windowWidth > 992) setIsOpen(false);
  }, [windowWidth]);

  return (
    <li>
      <a href="#" className="menu-link" onClick={toggleSubMenu}>
        {title}
        <span className="drop-icon">
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </span>
      </a>
      {(isOpen || windowWidth > 992) && (
        <div className="sub-menu">
          {categories.map((category, index) => (
            <div className="sub-menu-item" key={index}>
              <h4>{category.title}</h4>
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="sub-menu-item">
            <h2>{description}</h2>
            <button type="button" className="btn">shop here</button>
          </div>
          <div className="sub-menu-item">
            <img src={imgSrc} alt="product image" />
          </div>
        </div>
      )}
    </li>
  );
};

export default SubMenu;



