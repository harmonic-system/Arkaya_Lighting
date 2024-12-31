import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Button } from '../../styles/Button';
import ProductLists from './AdminProductLists/ProductLists';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <div>
        <div className="adminLinks">
          <Link to="/admin/user">
            <Button>User</Button>
          </Link>
          <Button onClick={() => setIsOpen(true)}>Products</Button>
          <Link to="/admin/carousel">
            <Button>Carousel</Button>
          </Link>
          <Link to="/admin/application">
            <Button>Application</Button>
          </Link>
          <Link to="/admin/contact">
            <Button>Contact</Button>
          </Link>
          <Link to="/admin/query">
            <Button>Enquiry</Button>
          </Link>
          <Link to="/admin/newsletter">
            <Button>NewsLetter</Button>
          </Link>
          <Link to="/admin/technologyPatner">
            <Button>Tech - Patn</Button>
          </Link>
          <Link to="/admin/themeCategory">
            <Button>Theme Category</Button>
          </Link>

          <ProductLists isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
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
`

