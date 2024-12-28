import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import items from '../../../JSONData/ProductListData.json';
import { useCategoryContext } from '../../../context/category-context';

const ProductLists = ({ isOpen, onClose }) => {
  const [openItems, setOpenItems] = useState([]);
  const { setCategoryinlocalStorage } = useCategoryContext();

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleClick = (category) => {
    setCategoryinlocalStorage(category);
    onClose();
  };

  const renderItems = (menuItems, parentIndex = '') => {
    return menuItems.map((item, index) => {
      const currentIndex = `${parentIndex}-${index}`;
      const isOpen = openItems.includes(currentIndex);

      return (
        <div key={currentIndex} className="menu-item">
          {item.childrens ? (
            <>
              <div
                className={`menu-title ${isOpen ? 'active' : ''}`}
                onClick={() => toggleItem(currentIndex)}
              >
                {item.title}
                <span className="toggle-icon">
                  {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              </div>
              {isOpen && (
                <div className="submenu">{renderItems(item.childrens, currentIndex)}</div>
              )}
            </>
          ) : (
            <Link
              to={item.path}
              className="menu-link"
              onClick={() => handleClick(item?.category)}
            >
              {item.title}
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {isOpen && <Backdrop onClick={onClose} />}

      <Canvas className={isOpen ? 'show' : ''}>
        <div className="header">
          <h4>Product List</h4>
          <button className="close-btn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="offcanva-content">{renderItems(items)}</div>
      </Canvas>
    </>
  );
};

export default ProductLists;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1040;
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100%;
  background: linear-gradient(135deg, #00aaff, #007bff); /* Modern gradient */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  padding-bottom:70px;

  &.show {
    left: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background-color: #005f99; /* Darker blue header */
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    h4 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .close-btn {
      background: red;
      border: none;
      font-size: 1.8rem;
      font-weight: bold;
      border-radius: 5px;
      display:flex;
      align-items: center;
      justify-content:center;
      padding: 0.5rem;
      margin-right: 1rem;
      cursor: pointer;
      color: #fff;
    }
  }

  .offcanva-content {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;

    .menu-item {
      margin-bottom: 0.5rem;

      .menu-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        font-size: 1.3rem; /* Larger font for parent */
        cursor: pointer;
        font-weight: bold;
        background-color: #f4f6f8; /* Light gray for parent */
        border-radius: 8px;
        color: #005f99;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: #e9ecef;
          color: #007bff;
        }

        &.active {
          background-color: #e0f2f1; /* Highlight active parent */
          color: #007bff;
        }
      }

      .submenu {
        padding-left: 1.2rem;
        margin-top: 0.5rem;

        .menu-link {
          display: block;
          padding: 0.8rem;
          font-size: 1.5rem; /* Larger font for children */
          text-decoration: none;
          color: #005f99;
          background-color: #f8f9fa; /* Light background for children */
          border-radius: 8px;
          margin-bottom: 0.3rem;
          transition: background-color 0.3s, color 0.3s;

          &:hover {
            background-color: #e0f2f1;
            color: #007bff;
          }
        }
      }

      .toggle-icon {
        font-size: 1.4rem;
        color: #005f99;
      }
    }
  }

  @media (max-width: 480px) {
    .header h4 {
      font-size: 1.4rem;
    }

    .offcanva-content {
      padding: 0.8rem;
    }
  }
`;
