import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { CgMenu, CgClose } from "react-icons/cg";
import { useAuthContext } from '../../context/auth-context';
import { Button } from '../../styles/Button';
import { useCategoryContext } from '../../context/category-context';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthContext()
  const { setCategoryinlocalStorage } = useCategoryContext()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setCategoryinlocalStorage(category);
    closeMenu();
  }

  const handleLogout = () => {
    logout();
    setMenuIcon(false)
  }

  return (
    <>
      <Nav>
        <Wrapper>
          <Logo>
            <Link to="/" onClick={closeMenu}>
              <img src="./images/arkaya-logo-transformed.png" alt="Arkaya Logo" style={{ width: "180px", height: "70px" }} />
            </Link>
          </Logo>

          <MobileMenuIcon onClick={toggleMenu}>
            {isMenuOpen ? <CgClose className="menu-icon" /> : <CgMenu className="menu-icon" />}
          </MobileMenuIcon>

          <NavLinks $isOpen={isMenuOpen}>
            <li>
              <StyledLink to="/arkaya" onClick={closeMenu}>HOME</StyledLink>
            </li>
            {/* <li>
              <StyledLink to="/products" onClick={closeMenu}>PRODUCTS</StyledLink>
            </li> */}

            {/* Add Wrapper around Products for hover functionality */}
            <ProductsWrapper>
              <StyledLink to="#" className="desktop-item" onClick={toggleMenu}>PRODUCTS</StyledLink>
              <MegaMenu>
                <MegaContent>
                  <ProductSection>
                    <header>LIGHTING FIXTURE</header>
                    <hr />
                    <ul>
                      <li><StyledLink to="/temparchitecture" onClick={closeMenu}>Architecture</StyledLink></li>
                      <li><StyledLink to="/entertainment" onClick={closeMenu}>Entertainment</StyledLink></li>
                      <li><StyledLink to="/ledpixels" onClick={closeMenu}>LED Pixels</StyledLink></li>
                      <li><StyledLink to="/decorative" onClick={closeMenu}>Decorative</StyledLink></li>
                      {/* <li><StyledLink to="/theaterstudiotelevision" onClick={closeMenu}>Theater Studio & Television</StyledLink></li> */}
                    </ul>
                  </ProductSection>
                  <hr className='hr' />
                  <ProductSection>
                    <header>Video Displays</header>
                    <hr />
                    <ul>
                      <li><StyledLink to="/indoorseries" onClick={() => handleCategoryClick("indoors")}>Indoor Series</StyledLink></li>
                      <li><StyledLink to="/outdoorseries" onClick={() => handleCategoryClick("outdoors")}>Outdoor Series</StyledLink></li>
                    </ul>
                  </ProductSection>
                  <hr className='hr' />
                  <ProductSection>
                    <header>Controllers & Distribution</header>
                    <hr />
                    <ul>
                      <li><StyledLink to="/ledcontrollers" onClick={() => handleCategoryClick("ledcontrollers")}>LED Controllers</StyledLink></li>
                      <li><StyledLink to="/dmxcontrollers" onClick={() => handleCategoryClick("dmxcontrollers")}>DMX Controllers</StyledLink></li>
                      <li><StyledLink to="/signaldistributionandpowersupply" onClick={closeMenu}>Signal Distribution & Power Supply</StyledLink></li>
                      <li><StyledLink to="/decorderandamplifier" onClick={() => handleCategoryClick("decorderandamplifiers")}>Decorders & Amplifiers</StyledLink></li>
                      {/* <li><StyledLink to="/processor" onClick={() => handleCategoryClick("processors")}>Processors</StyledLink></li> */}
                    </ul>
                  </ProductSection>
                  <hr className='hr' />
                  <ProductSection>
                    <header>Rigging</header>
                    <hr />
                    <ul>
                      <li><StyledLink to="/truss" onClick={() => handleCategoryClick("trusses")}>Truss</StyledLink></li>
                      <li><StyledLink to="/clamps" onClick={() => handleCategoryClick("clamps")}>Clamps</StyledLink></li>
                      <li><StyledLink to="/alluminiumprofile" onClick={() => handleCategoryClick("alluminiumprofiles")}>Alluminium Profile</StyledLink></li>
                      <li><StyledLink to="/siliconprofile" onClick={() => handleCategoryClick("siliconprofiles")}>Silicon Profile</StyledLink></li>
                      {/* <li><StyledLink to="/stagelighting" onClick={() => handleCategoryClick("stagelightinges")}>Silicon Profile</StyledLink></li>
                      <li><StyledLink to="/studiolighting" onClick={() => handleCategoryClick("studiolightinges")}>Silicon Profile</StyledLink></li> */}
                    </ul>
                  </ProductSection>
                  <hr className='hr' />
                  <ProductSection>
                    <header>Spaers & Accessories</header>
                    <hr />
                    <ul>
                      <li><StyledLink to="/connectors" onClick={() => handleCategoryClick("connectors")}>Connectors</StyledLink></li>
                    </ul>
                  </ProductSection>
                </MegaContent>
              </MegaMenu>
            </ProductsWrapper>

            <li>
              <StyledLink to="/brandsPatner" onClick={closeMenu}>BRANDS PARTNERS</StyledLink>
            </li>
            <li>
              <StyledLink to="/application" onClick={closeMenu}>APPLICATION</StyledLink>
            </li>
            <li className="resources-dropdown">
              <StyledLink to="#" className="desktop-item">RESOURCES</StyledLink>
              <ul className="resources-dropdown-links">
                <li><StyledLink to="/software" onClick={() => setIsMenuOpen(false)}>Software</StyledLink> </li>
                <li><StyledLink to="/howtobuy" onClick={() => setIsMenuOpen(false)}>How To Buy</StyledLink> </li>
                <li><StyledLink to="/datasheet" onClick={() => setIsMenuOpen(false)}>DataSheet</StyledLink> </li>
                <li><StyledLink to="/solutionsupport" onClick={() => setIsMenuOpen(false)}>Solution Support</StyledLink></li>
              </ul>
            </li>
            {/* <li>
                            <StyledLink to="#" className="desktop-item" onClick={toggleMenu}>RESOURCES</StyledLink>
                            <DropdownMenu>
                                <li><StyledLink to="/software" onClick={closeMenu}>Software</StyledLink></li>
                                <li><StyledLink to="/howtobuy" onClick={closeMenu}>How To Buy</StyledLink></li>
                            </DropdownMenu>
                        </li> */}
            <li>
              <StyledLink to="/discover" onClick={closeMenu}>DISCOVER US</StyledLink>
            </li>
            <li>
              <StyledLink to="/contact" onClick={closeMenu}>CONTACT</StyledLink>
            </li>
            <li>
              {isAuthenticated ? (
                <>
                  {/* <StyledLink className="desktop-item" onClick={toggleMenu}>{user?.name?.toUpperCase()}</StyledLink>
                                    <DropdownMenu>
                                        <li><StyledLink to="/userprofile" onClick={closeMenu}>Profile</StyledLink></li>
                                        <li><StyledLink to="/" onClick={() => logout()}>Logout</StyledLink></li>
                                    </DropdownMenu> */}
                  <span className="user-dropdown">
                    <Button className="nav-button">{user?.name?.length < 10 ? user?.name?.toUpperCase() : user?.name?.slice(0, 10).toUpperCase()}</Button>
                    <ul className="dropdown-links">
                      <li><StyledLink to="/profile" onClick={() => setMenuIcon(false)}>Profile</StyledLink> </li>
                      <li><StyledLink to="/cart" onClick={() => setMenuIcon(false)}>CART</StyledLink> </li>
                      <li><StyledLink to="/" onClick={handleLogout}>Logout</StyledLink></li>
                    </ul>
                  </span>
                </>
              ) : (
                <StyledLink to="/login" onClick={closeMenu}><Button>LOGIN</Button></StyledLink>
              )}
            </li>
            {user?.isAdmin && <li><StyledLink to="/admin" onClick={closeMenu}>Admin Section</StyledLink></li>}
          </NavLinks>
        </Wrapper>
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  z-index: 99999999;
  width: 100%;
  height: 100px;
  background-color: #f6f8fa;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 0 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 20%;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap:1rem;

  @media screen and (max-width: 1240px) {
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    max-width: 350px;
    top: 0px;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    background: #242526;
    padding: 50px 10px;
    flex-direction: column;
    align-items: start;
    gap:5rem;
    transition: all 0.3s ease;
    z-index: 999999;
  }

  .resources-dropdown {
        position: relative;

        &:hover .resources-dropdown-links {
          display: block;
        }
      }

      .resources-dropdown-links{
        display:none;
        position: absolute;
        width: 200px;
        padding: 2rem 0;
        background-color: #f6f8fa;
        // background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        z-index: 1;
      }

      .resources-dropdown-links li{
        width: 100%;
        font-size: 1.2rem;
        padding: 1rem ;

        &:hover {
          background-color: #e9ecef;
          // background: rgba(0, 0, 0, 0.8);
        }
      }

      .resources-dropdown-links li a{
        display:block;
        width:100%;
        color: black;
        font-size:max(1.5rem,15px);
        font-weight: 500;
        font-family: sans-serif;

        &:hover {
          color: ${({ theme }) => theme.colors.helper};
        }
      }

  .user-dropdown{
        position: relative;

        &:hover .dropdown-links {
          display: block;
          z-index: 999999;
        }
      }

      .dropdown-links {
        display:none;
        position: absolute;
        width: 100%;
        padding: 2rem 0;
        background-color: #f6f8fa;
        border-radius: 10px;
      }

      .dropdown-links li{
        width: 100%;
        font-size: 1.4rem;
        padding: 1rem ;

        &:hover {
          background-color: #e9ecef;
        }
      }

      .dropdown-links li a{
        display:block;
        width:100%;
        color: black;
        font-size:max(1.5rem,15px);
        font-weight: 500;
        font-family: sans-serif;

        &:hover {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #ffc221;
  }

  @media screen and (max-width: 1240px) {
    color: #f2f2f2;
    font-size: 1.5rem;
    padding: 0 20px;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  font-size: 2rem;
  cursor: pointer;

  @media screen and (max-width: 1240px) {
    display: block;
  }
`;

const ProductsWrapper = styled.li`
//   position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const MegaMenu = styled.div`
  position: absolute;
  top: 60px; /* Adjust to the height of the navbar */
  left: 0;
  width: 100vw; /* Full viewport width */
  background-color: #242526;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 9999;

  @media screen and (max-width: 1240px) {
    top: 120px;
    width: 100%; /* On small screens, go back to normal width */
  }
`;

const MegaContent = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 25px 20px;
//   max-width: 1200px; /* You can limit the content width if needed */
  margin: 3rem auto; /* Center the mega menu content */
  
  @media screen and (max-width: 1240px) {
    flex-direction: column;
    padding: 10px 40px;
    margin: 1rem auto;
  }

  .hr{
  border: 1px solid #ffc221;}
`;

const ProductSection = styled.div`

  header {
    color: #f2f2f2;
    font-size: 1.8rem;
    font-weight: 500;
    margin: 20px 0;
  }

  ul {
    list-style: none;
  }

  li {
    padding: 10px 0;
    font-size: 1.2rem;
    display: flex;
    // justify-content: start;
    // flex-direction: column;
    // align-items: start;
  }

  hr {
    border: 1px solid #ffc221;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    font-family: 'Lato', sans-serif;
  }

  a:hover {
    color: #ffc221;
  }

  @media screen and (max-width: 1240px) {
    .hr {
        display: none !important;
    }

    a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
  }
  }
`;

