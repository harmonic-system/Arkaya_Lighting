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
  const { addToCart } = useCartContext()
  const { user } = useAuthContext()
  const { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(1)
  const navigate = useNavigate()

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1)
  }

  const decreaseProductQuantity = () => {
    setProductQuantity(productQuantity - 1)
  }

  const handleAddToCart = (userId, productId, quantity) => {
    if (user) {
      addToCart(userId, productId, quantity)
    } else {
      navigate("/login")
      toast("Please Login")
    }
  }

  useEffect(() => {
    getSingleProduct(id);
  }, []);

  if (isSingleLoading) {
    return <LoadingPage />
  }

  return (
    <>
      <Helmet>
        <title>{singleProduct?.productname ? `${singleProduct.productname} - Arkaya Lighting || Category - ${singleProduct.productCategory}` : 'Arkaya Lighting'}</title>
        <meta name="description" content={`Learn more about ${singleProduct?.productname || 'this product'}, view detailed specifications.`} />
        <meta property="og:image" content={singleProduct?.productfile?.url || ''} />
        <meta property="og:title" content={singleProduct?.productname || 'Arkaya Lighting'} />
        <meta property="og:description" content={`Learn more about ${singleProduct?.productname || 'this product'}, view detailed specifications.`} />
      </Helmet>


      <Wrapper>
        <PageNavigation title={singleProduct?.productname} />
        <Container className="container">
          <div className="grid grid-two-column">
            {/* product Images  */}
            <div className="product_images">
              <MyImage imgs={singleProduct?.productfile?.url} />
            </div>

            {/* product dAta  */}
            <div className="product-data">
              <h2>{singleProduct?.productname}</h2>

              {singleProduct?.des &&
                Object.keys(singleProduct.des).map((element, index) => {
                  const value = singleProduct.des[element];
                  return value ? (
                    <div
                      className={`description-box ${element === 'description' ? 'column-layout' : 'row-layout'}`}
                      key={index}
                    >
                      <p className="description-box-element">{element}:</p>
                      <p className="description-box-text">{value}</p>
                    </div>
                  ) : null; // Skip rendering if the value is empty, null, or undefined
                })
              }

              {
                singleProduct?.price ?
                  <p className="product-data-price">MRP:<FormatPrice price={singleProduct?.price} /></p>
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
                <p>
                  ID : <span> {singleProduct?._id} </span>
                </p>
                {singleProduct?.model ? <p>Model :<span> {singleProduct?.model} </span></p> : ""}
                {singleProduct?.sku ? <p>SKU :<span> {singleProduct?.sku} </span></p> : ""}
              </div>
              <hr />
              {/* {
                singleProduct?.price ?
                  <>
                    <div className="quantity-buttons">
                      <Button
                        onClick={() => decreaseProductQuantity()}
                        disabled={productQuantity <= 1}
                        className={productQuantity <= 1 ? 'disabled-button' : ''}><FaMinus /></Button>
                      <p>{productQuantity}</p>
                      <Button onClick={() => increaseProductQuantity()}>
                        <FiPlus />
                      </Button>
                    </div>
                    <Button onClick={() => handleAddToCart(user?._id, singleProduct?._id, productQuantity)}>Add To Cart</Button>
                  </>
                  :
                  ""
              } */}

              <div className="quantity-buttons">
                <Button
                  onClick={() => decreaseProductQuantity()}
                  disabled={productQuantity <= 1}
                  className={productQuantity <= 1 ? 'disabled-button' : ''}><FaMinus /></Button>
                <p>{productQuantity}</p>
                <Button onClick={() => increaseProductQuantity()}>
                  <FiPlus />
                </Button>
              </div>
              <Button onClick={() => handleAddToCart(user?._id, singleProduct?._id, productQuantity)}>Add To Cart</Button>


              <WhatsappChat name={singleProduct?.productname} img={singleProduct?.productfile?.url} sku={singleProduct?.sku} />
              {
                user && user?.isAdmin && (
                  <ProductSpecificationDownload singleProduct={singleProduct} />
                )
              }
            </div>
          </div>
        </Container >
      </Wrapper >
    </>
  );
};

export default SingleProduct;

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    justify-content: center;
    align-items: start;
    // align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    h2 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    .description-box {
      display: flex;
      padding: 10px;
      // margin-bottom: 10px;
      border-radius: 5px;
    }

    .description-box.column-layout {
      flex-direction: column;
    }

    .description-box.row-layout {
      flex-direction: row;
      align-items: center; /* Ensures alignment for row layout */
    }

    .description-box-element {
      text-transform: uppercase;
      font-weight: bold;
      margin-right: 10px;
    }

    .description-box-text {
      flex: 1; /* Ensures the text occupies remaining space in row layout */
    }

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding: 0 2.4rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;

    .container {
      padding: 2rem 0;
    }
  }

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
    }

    .disabled-button {
    opacity: 0.5;
    pointer-events: none;
  }
}
`;


