import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaShoppingBag, FaHeart, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth-context';
import { useCartContext } from '../../context/cart-context';
import { useWishListContext } from '../../context/wishlist-context';

const TopHeader = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const { cart } = useCartContext();
  const { items } = useWishListContext();

  const [userDropdown, setUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const handleProfileClick = () => {
    toggleUserDropdown();
  };

  const handleLogoutClick = () => {
    logout();
    toggleUserDropdown();
  };

  return (
    <HeaderWrapper>
      <header className="header">
        <div className="top">
          <div className="container">
            <div className="header__top">
              <div className="header__top__social">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=61550851665100" ><FaFacebook /></a>
                {/* <a target="_blank" href="#"><FaTwitter /></a> */}
                <a target="_blank" href="https://www.instagram.com/arkayalighting/"><FaInstagram /></a>
                {/* <a target="_blank" href="#"><FaLinkedin /></a> */}
              </div>
              <div className="header__top__contact">
                <p>We Bright Your Space</p>

                <div className="header__login">
                  {
                    isAuthenticated ? (
                      <>
                        <div className="header__icons">
                          <Link to="/user/wishlist">
                            <FaHeart className='heart' />
                            <span className="cart-count">{items?.length}</span>
                          </Link>

                          <Link to="/user/cart">
                            <FaShoppingBag className='cart-bag' />
                            <span className="cart-count">{cart?.length}</span>
                          </Link>
                        </div>
                        <div className="header-auth">
                          <span onClick={toggleUserDropdown}>
                            {user?.name?.length < 10 ? user?.name?.toUpperCase() : user?.name?.slice(0, 10).toUpperCase()}
                            <FaChevronDown />
                          </span>

                          {userDropdown && (
                            <ul className="user-dropdown">
                              <li>
                                <Link to="/user" onClick={handleProfileClick}>Account</Link>
                              </li>
                              <li>
                                <Link to="/" onClick={handleLogoutClick}>Logout</Link>
                              </li>
                            </ul>
                          )}</div>
                      </>
                    ) : (
                      <Link to="/login">
                        <FaUser />
                        <span>Login</span>
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </HeaderWrapper>
  );
}

export default TopHeader;

const HeaderWrapper = styled.section`

.header {
    font-family: 'Poppins', sans-serif !important;
}

.top {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.header__top {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px 20px;
}

.header__top__contact {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 450px) {
        flex-direction: column;
        gap: 2rem;
    }
}

.header__top__contact p {
    margin-right: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    color: #333;

    @media (max-width: 450px) {
        margin-right: 0;
    }
}

.header__top__social {
    display: flex;
    align-items: center;
    gap: 1.2rem;
}

.header__top__social svg {
    margin-right: 10px;
    cursor: pointer;
    color: #333;
    font-size: 18px;
}

.header__login {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.header__login .header-auth {
    
    position: relative;
}

.header__login .header-auth span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    font-size: 16px;
    cursor: pointer;
}

.header__login a {
    display: flex;
    gap: 0.3rem;
    position: relative;
    cursor: pointer;
    color: #000;
}

.header__login a svg {
    color: #000;
    font-size: 15px;
}

.header__login a span {
    color: #000;
    font-size: 14px;
}

.user-dropdown {
    position: absolute;
    background: #f6f8fa;
    border-radius: 1rem;
    line-height: 45px;
    top: 25px;
    left: 0;
    background-color: #fff;
    list-style: none;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    width: 100px;
    z-index: 100;
}

.user-dropdown li:hover {
  background: #ebeff3;
  border-radius: 1rem;
}

.user-dropdown li a {
    width: 100%;
    display: block;
    padding: 0 0 0 15px;
    font-weight: 400;
    border-radius: 0px;
    color: #000;
    font-size: 1.3rem;
}

.user-dropdown li a:hover {
  color: #ffc221;
}

.header__icons {
    margin-top:5px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header__icons a svg {
    margin-right: 15px;
    font-size: 15px;
    cursor: pointer;
}

.header__icons a {
    position: relative;
}

.heart {
    color: rgb(182, 173, 173);
}

.heart:hover {
    color: rgb(192, 39, 39);
}

.cart-bag {
    color: #000;
}

.cart-bag:hover {
    color: #ffc221;
}

.cart-count {
    background-color: #ffc221;
    color: #fff;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 10px !important;
    position: absolute;
    top: -10px;
    right: 0px;
}

@media (max-width: 991px) {
    .header__top__social {
        display: none;
    }

    .header__top__contact {
        width: 100%;
        justify-content: space-between;
    }

    .header__top__contact p,
    .header__top__contact span {
        font-size: 15px;
        font-weight: 700;
    }

    .header__icons a svg,
    .header__login svg {
        font-size: 15px;
    }

    .cart-count {
        padding: 2px 5px;
        font-size: 10px !important;
    }

    .user-dropdown li a {
        font-size: 12px;
    }
}
`