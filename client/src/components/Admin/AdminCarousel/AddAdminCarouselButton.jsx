import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../../styles/Button';

const AddAdminCarouselButton = () => {

    return (
        <>
            <AddAdminCarouselButtonWrapper>
                <div className="add-product-container">
                <h1 className="admin-title">Admin Carousel</h1>
                    <Link className="add-product-btn" to="/admin/addcarousel">
                        <Button>Add Carousel</Button>
                    </Link>
                </div>
            </AddAdminCarouselButtonWrapper>
        </>
    )
}

export default AddAdminCarouselButton

const AddAdminCarouselButtonWrapper = styled.section`
  .add-product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: ${({ theme }) => theme.colors.bg || "#f9f9f9"};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 5rem;
  }

  .admin-title {
    font-size: 2.5rem; /* Increased size */
    font-weight: bold;
    text-align: center;
    background-color: #f6f8fa;
    padding: 2rem;
  }

  .add-product-btn {
    display: inline-block;
    text-decoration: none;
    margin-left: auto;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .add-product-container {
      flex-direction: column;
      align-items: stretch;
    }

    Button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;
