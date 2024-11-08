import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Button } from '../../styles/Button';
import { CgClose } from "react-icons/cg";
import ProductLists from './AdminProductLists/ProductLists';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffcanvas = () => setIsOpen(!isOpen);
  const closeOffcanvas = () => setIsOpen(false);

  return (
    <Wrapper>
      <div>
        <div className="adminLinks">
          <Link to="/admin/user" className="btn btn-primary" role="button" >
            <Button>User</Button>
          </Link>
          <Button className="btn btn-primary" type="button" onClick={toggleOffcanvas}>
            Products
          </Button>
          <Link to="/admin/carousel" className="btn btn-primary" role="button">
            <Button>Carousel</Button>
          </Link>
          <Link to="/admin/application" className="btn btn-primary" role="button" >
            <Button>Application</Button>
          </Link>
          <Link to="/admin/contact" className="btn btn-primary" role="button">
            <Button>Contact</Button>
          </Link>
          <Link to="/admin/query" className="btn btn-primary" role="button">
            <Button>Querry</Button>
          </Link>
          <Link to="/admin/newsletter" className="btn btn-primary" role="button">
            <Button>NewsLetter</Button>
          </Link>
        </div>

        {/* Offcanvas Container */}
        <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex="-1">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Product Lists</h5>
            <Button type="button" className="btn-close" onClick={closeOffcanvas}><CgClose /></Button>
          </div>
          <div className="offcanvas-body">
            <ProductLists setIsOpen={setIsOpen} />
          </div>
        </div>

        {/* Backdrop */}
        {isOpen && <div className="offcanvas-backdrop show" onClick={closeOffcanvas}></div>}
      </div>
    </Wrapper>
  );
};

export default AdminNavbar;

const Wrapper = styled.section`

.adminLinks{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 200px) and (max-width: 768px) {
     flex-direction: row;
     flex-wrap: wrap;
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

