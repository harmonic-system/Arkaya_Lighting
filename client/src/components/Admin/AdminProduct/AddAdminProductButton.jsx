import React from 'react'
import styled from 'styled-components';
import { useCategoryContext } from '../../../context/category-context';
import { Link } from 'react-router-dom';
import { Button } from '../../../styles/Button';

const AddAdminProductButton = () => {
    const { updateFilterValue, model, sku } = useCategoryContext();

    return (
        <>
            <AddAdminProductButtonWrapper>
                <div className="add-product-container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            name="model"
                            placeholder="Enter Model"
                            value={model}
                            onChange={updateFilterValue}
                        />
                    </form>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            name="sku"
                            placeholder="Enter SKU"
                            value={sku}
                            onChange={updateFilterValue}
                        />
                    </form>
                    <Link className="add-product-btn" to="/admin/addproducts">
                        <Button>Add Product</Button>
                    </Link>
                </div>
            </AddAdminProductButtonWrapper>
        </>
    )
}

export default AddAdminProductButton

const AddAdminProductButtonWrapper = styled.section`
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

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  input {
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 220px;
    transition: all 0.3s ease-in-out;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  .add-product-btn {
    display: inline-block;
    text-decoration: none;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .add-product-container {
      flex-direction: column;
      align-items: stretch;
    }

    input {
      width: 100%;
    }

    Button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;
