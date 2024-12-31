import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAdminContext } from '../../../context/admin-context';
import { useAuthContext } from '../../../context/auth-context';
import { IoClose } from "react-icons/io5";
import LoadingPage from '../../Loading/Loading';

const AdminFullViewProductDetails = ({ productId, closeModal }) => {
  const { token } = useAuthContext();
  const { isLoading, singleProduct, getSingalProduct } = useAdminContext();

  const [productData, setProductData] = useState({
    productfile: null,
    productname: "",
    model: "",
    sku: "",
    IndoorOutdoor: "",
    price: "",
    productCategory: "",
    featured: false,
    des: {},
    keywords: [],
  });

  useEffect(() => {
    if (token && productId) {
      getSingalProduct(productId);
    }
  }, [token, productId]);

  useEffect(() => {
    if (singleProduct) {
      setProductData({
        productfile: singleProduct?.productfile?.url,
        productname: singleProduct?.productname,
        model: singleProduct?.model,
        sku: singleProduct?.sku,
        IndoorOutdoor: singleProduct?.IndoorOutdoor,
        price: singleProduct?.price,
        productCategory: singleProduct?.productCategory,
        featured: singleProduct?.featured,
        des: { description: "", ...singleProduct?.des },
        keywords: singleProduct?.keywords,
        themeCategory: singleProduct?.themeCategory,
      });
    }
  }, [singleProduct]);

  if (isLoading) {
    return <LoadingPage />
  }


  return (
    <AdminFullViewProductDetailsWrapper>
      <div className="modal">
        <div className="modal-content">
          {/* Close Button */}
          <Button type="button" className="top-close-btn" onClick={closeModal} style={{ position: "sticky", top: "2rem", marginLeft: "auto" }} >
            <IoClose />
          </Button>

          <div className="product-container">
            {/* Product Image */}
            <div className="product-gallery">
              <img
                src={productData?.productfile}
                alt={productData.productname}
                className="main-image"
              />
            </div>

            {/* Product Details */}
            <div className="product-info">
              <h1 className="product-name">{productData.productname}</h1>
              <p className="product-category">
                Category: <span>{productData.productCategory}</span>
              </p>
              <p className="product-model">Model: {productData.model}</p>
              <p className="product-sku">SKU: {productData.sku}</p>
              {
                productData.price ? (
                  <p className="product-price">Price: ${productData.price}</p>
                ) : (
                  <p className="product-price">No Price</p>
                )
              }

              {/* Badges */}
              <div className="product-badges">
                {productData.featured ?
                  <span className="badge featured">Featured</span> : <span className="badge featured">Not a Featured Product</span>
                }
                <span
                  className={`badge ${productData.IndoorOutdoor === 'Indoor' ? 'indoor' : 'outdoor'
                    }`}
                >
                  Type: {productData.IndoorOutdoor || 'Not specified'}
                </span>
                <span
                  className='badge themeCategory'
                >
                  ThemeCategory: {productData.themeCategory || 'Not specified'}
                </span>
              </div>

              {/* Keywords */}
              <div className="product-keywords">
                <h4>Keywords:</h4>
                {productData?.keywords?.length > 0 ? (
                  productData.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p>No keywords available</p>
                )}
              </div>

              {/* Description */}
              <div className="product-description">
                {productData?.des && typeof productData.des === 'object' && Object.keys(productData.des).length > 0 ? (
                  Object.entries(productData.des).map(([key, value], index) => (
                    <p key={index}>
                      <strong style={{
                        textTransform: "capitalize",
                        marginBottom: "10px",
                        display: "inline-block"
                      }}>
                        {key}:
                      </strong> {value}
                    </p>
                  ))
                ) : (
                  <p>No description available.</p>
                )}
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <Link className='edit-btn-link' to={`/admin/editproduct/${singleProduct._id}`}>
                  <Button className='edit-btn'>
                    Edit
                  </Button>
                </Link>
                <Button className='close-btn' onClick={closeModal}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminFullViewProductDetailsWrapper>
  );
};

export default AdminFullViewProductDetails;

const AdminFullViewProductDetailsWrapper = styled.section`
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    justify-content: center;
    align-items: center;
    z-index: 10; 
    backdrop-filter: blur(5px); /* Blur effect for a modern look */
  }

  .modal-content {
    width: 90%;
    max-width: 1200px;
    max-height: 90%;
    background: #fff;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    position: relative;

    /* Animation */
    animation: fadeInFromCenter 0.5s ease-out;
  }

  @keyframes fadeInFromCenter {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Close Button */
  .top-close-btn {
  background: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
      background: #bbb;
  }
}

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    gap: 1rem;
  }

  /* Product Container */
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .product-gallery {
    flex: 1;
    max-width: 400px;
  }

  .main-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: contain !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .product-info {
    flex: 2;
    padding: 1rem;
  }

  .product-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }

  .product-category,
  .product-model,
  .product-sku,
  .product-price {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #555;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #007bff;
  }

  /* Badges */
  .badge {
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .badge.featured {
    background: #ffe7cc;
    color: #f57c00;
  }

  .badge.indoor {
    background: #e6f7ff;
    color: #1890ff;
  }

  .badge.outdoor {
    background: #fff1f0;
    color: #f5222d;
  }

  .badge.themeCategory {
    background: #fff1f0;
    color: green;
  }

  /* Keywords */
  .product-keywords {
    margin-top: 1rem;
  }

  .keyword {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background: #f4f4f4;
    border-radius: 8px;
    margin: 0.3rem;
    font-size: 0.85rem;
  }

  /* Description */
  .product-description {
    margin-top: 1.5rem;
    line-height: 1.6;
  }

  /* Buttons */
  .close-btn {
    background: #6c757d;
    color: #fff;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
  }

  .close-btn:hover {
    background: #5a6268;
  }

  .edit-btn {
    background: #007bff;
    color: #fff;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
  }

  .edit-btn:hover {
    background: #0056b3;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .product-container {
      flex-direction: column;
    }

    .modal-content {
      width: 95%;
      padding: 1rem;
    }

    .product-gallery,
    .product-info {
      max-width: 100%;
    }

    .modal-actions {
      flex-direction: column;
      align-items: center;
    }

    .close-btn,
    .edit-btn {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;
