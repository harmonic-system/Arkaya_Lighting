import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { IoIosPricetag } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useProductContext } from "../context/product-context";
import PageNavigation from "../components/SingleProduct/PageNavigation";
import { Container } from "../styles/Container";
import MyImage from "../components/SingleProduct/MyImage";
import LoadingPage from "../components/Loading/Loading";
import WhatsappChat from "../components/SingleProduct/WhatsappChat";
import FormatPrice from "../Helper/FormatPrice";
import QueryBox from "../components/Products/QueryBox";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart-context";
import { useAuthContext } from "../context/auth-context";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';
import ProductSpecificationDownload from "../components/SingleProduct/ProductSpecificationDownload";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const navigate = useNavigate();

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseProductQuantity = () => {
    setProductQuantity(productQuantity - 1);
  };

  const handleAddToCart = (userId, productId, quantity) => {
    if (user) {
      addToCart(userId, productId, quantity);
    } else {
      navigate("/login");
      toast("Please Login");
    }
  };

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  if (isSingleLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>{singleProduct?.productname ? `${singleProduct.productname} - Arkaya Lighting || Category - ${singleProduct.productCategory}` : 'Arkaya Lighting'}</title>
        <meta
          name="description"
          content={`Discover ${singleProduct?.productname || 'our product'}, with detailed specifications and features to suit your needs.`}
        />
        <meta
          name="keywords"
          content={`${singleProduct?.productname || 'lighting product'}, ${singleProduct?.productCategory || 'lighting solutions'}, energy-efficient lighting, premium lighting, lighting features, specifications, smart lighting, LED lighting`}
        />
        <meta
          property="og:image"
          content={singleProduct?.productfile?.url || ''}
        />
        <meta
          property="og:title"
          content={singleProduct?.productname || 'Arkaya Lighting'}
        />
        <meta
          property="og:description"
          content={`Discover ${singleProduct?.productname || 'our product'}, with detailed specifications and features to suit your needs.`}
        />
      </Helmet>

      <PageNavigation title={singleProduct?.productname} />
      <Wrapper>
        <Container className="container">
          <div className="grid grid-two-column">
            {/* product Images  */}
            <div className="product_images">
              <MyImage imgs={singleProduct?.productfile?.url} productname={singleProduct?.productname} />
            </div>

            {/* product dAta  */}
            <div className="product-data">
              <h2>{singleProduct?.productname}</h2>

              {singleProduct?.des?.description && (
                <p className="main-description">
                  {singleProduct.des.description}
                </p>
              )}

              <table className="description-table">
                <tbody>
                  {singleProduct?.des &&
                    Object.entries(singleProduct.des)
                      .filter(([key]) => key !== "description")
                      .map(([key, value], index) => (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {
                singleProduct?.price ?
                  <p className="product-data-price">MRP: <FormatPrice price={singleProduct?.price} /></p>
                  :
                  <QueryBox productId={singleProduct?._id} productName={singleProduct?.productname} sku={singleProduct?.sku} />
              }

              <div className="product-data-warranty">
                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>Fast Delivery</p>
                </div>

                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>After Sales Service</p>
                </div>

                <div className="product-warranty-data">
                  <IoIosPricetag className="warranty-icon" />
                  <p>Affordable Price </p>
                </div>

                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>Best Quality </p>
                </div>
              </div>

              <div className="product-data-info">
                {/* <p>ID : <span> {singleProduct?._id} </span></p> */}
                {singleProduct?.model ? <p>Model :<span> {singleProduct?.model} </span></p> : ""}
                {singleProduct?.sku ? <p>SKU :<span> {singleProduct?.sku} </span></p> : ""}
              </div>
              <hr />

              <div className="quantity-buttons">
                <Button
                  onClick={() => decreaseProductQuantity()}
                  disabled={productQuantity <= 1}
                  className={productQuantity <= 1 ? 'disabled-button' : ''}>
                  <FaMinus />
                </Button>
                <p>{productQuantity}</p>
                <Button onClick={() => increaseProductQuantity()}>
                  <FiPlus />
                </Button>
              </div>
              <Button onClick={() => handleAddToCart(user?._id, singleProduct?._id, productQuantity)}>Add To Cart</Button>

              <WhatsappChat name={singleProduct?.productname} img={singleProduct?.productfile?.url} sku={singleProduct?.sku} model={singleProduct?.model} />
              {user && user?.isAdmin && (
                <ProductSpecificationDownload singleProduct={singleProduct} />
              )}
            </div>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default SingleProduct;

const Wrapper = styled.section`
  /* General Styles */
  .container {
    padding: 8rem 2rem;
  }

  font-family: 'Roboto', sans-serif;
  color: #444; /* Dark Gray for text */

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  /* Product Images */
  .product_images {
    display: flex;
    justify-content: center;
    align-items: start;
  }

  /* Product Data Section */
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    .main-description {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      line-height: 1.6;
    }

    /* Description Table */
    .description-table {
      width: 100%;
      margin: 1rem 0;
      font-size: 1.3rem;
      border-collapse: collapse;

      td {
        padding: 12px;
        border: 1px solid #eaeaea;
        text-align: left;
      }

      tr:nth-child(even) {
        background: #f5f5f5;
      }

      tr:hover {
        background: #f0f0f0; /* Highlight row on hover */
      }
    }

    /* Price Styling */
    .product-data-price {
      font-weight: 700;
      font-size: 2rem;
      color: #ffc221;
    }

    /* Warranty Section */
    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid #ccc;
      padding-bottom: 1rem;
      margin-top: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4.5rem;
          height: 4.5rem;
          padding: 1rem;
        }

        p {
          font-size: 1.2rem;
          color: #444;
          margin-top: 0.5rem;
        }
      }
    }

    /* Product Info Section */
    .product-data-info {
      p {
        font-size: 1.5rem;
        font-weight: 600;
        span {
          font-weight: 500;
        }
      }
    }

    hr {
      width: 100%;
      margin: 1.5rem 0;
      border: 0.5px solid #ddd;
    }

    /* Quantity Buttons */
    .quantity-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      Button {
        padding: 0.8rem 1.6rem;
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffc221;
        // background-color: #ff8c00;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      Button:hover {
        background-color: #ffdd73; 
        // background-color: #e07b00;
      }

      .disabled-button {
        opacity: 0.5;
        pointer-events: none;
      }

      p {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }

    /* Add to Cart Button */
    Button {
      background-color: #fcc221; /* Dark Orange */
      color: white;
      border: none;
      padding: 0.8rem 1.6rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    Button:hover {
      background-color: #ffdd73;
      color:gray;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .product-data {
      gap: 1.5rem;
      padding: 1rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    .product-data-price {
      font-size: 1.8rem;
    }

    .description-table td {
      padding: 10px;
      font-size: 1.2rem;
    }

    .product-warranty-data p {
      font-size: 1rem;
    }

    .quantity-buttons {
      gap: 1rem;
    }
  }
`;



