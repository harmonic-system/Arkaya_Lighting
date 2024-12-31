import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Button } from '../../styles/Button';

const UserNavbar = () => {

  return (
    <>
      <Wrapper>
        <div>
          <div className="userLinks">
            <Link to="/user/profile" >
              <Button className='user-nav-buttons'>Profile</Button>
            </Link>
            {/* <Link to="/user/orders">
              <Button className='user-nav-buttons'>Order</Button>
            </Link> */}
            <Link to="/user/change-password" >
              <Button className='user-nav-buttons'>Change Password</Button>
            </Link>
            <Link to="/user/delete-account">
              <Button className='user-nav-buttons'>Delete Account</Button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default UserNavbar;

const Wrapper = styled.section`

.userLinks{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 200px) and (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .user-nav-buttons {
   font-size: 13px;
  }
}

/* Offcanvas Styling */
.offcanvas {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease;
  z-index: 1045;
  overflow-y: auto;
}

.offcanvas.show {
  left: 0;
}

.offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;

  .offcanvas-title{
   font-size: 2rem;
  }

  .btn-close {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
}

.offcanvas-body {
  padding: 1rem;
}

.offcanvas-backdrop.show {
  opacity: 1;
}

`

