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
          <Link to="/admin/user" className="btn btn-primary" role="button" >
            <Button>User</Button>
          </Link>
          <Button onClick={() => setIsOpen(true)}>Products</Button>
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

