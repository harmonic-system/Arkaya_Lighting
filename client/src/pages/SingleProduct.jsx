import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { IoIosPricetag } from "react-icons/io";
import { useProductContext } from "../context/product-context";
import PageNavigation from "../components/SingleProduct/PageNavigation";
import { Container } from "../styles/Container";
import MyImage from "../components/SingleProduct/MyImage";
import { Button } from "../styles/Button";
import LoadingPage from "../components/Loading/Loading";
import { FaWhatsapp } from 'react-icons/fa';
import WhatsappChat from "../components/Products/WhatsappChat";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id);
  }, []);

  if (isSingleLoading) {
    return <LoadingPage />
  }

  return (

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
            {singleProduct?.description?.des ? <p>{singleProduct?.description?.des}</p> : ""}
            {singleProduct?.description?.moduleSize ? <p>{singleProduct?.description?.moduleSize}</p> : ""}
            {singleProduct?.description?.pixelPitch ? <p>{singleProduct?.description?.pixelPitch}</p> : ""}
            {singleProduct?.description?.pixelDensity ? <p>{singleProduct?.description?.pixelDensity}</p> : ""}
            {singleProduct?.description?.configuration ? <p>{singleProduct?.description?.configuration}</p> : ""}
            {singleProduct?.description?.mode ? <p>{singleProduct?.description?.mode}</p> : ""}
            {singleProduct?.description?.resolution ? <p>{singleProduct?.description?.resolution}</p> : ""}
            {singleProduct?.description?.driveType ? <p>{singleProduct?.description?.driveType}</p> : ""}
            {singleProduct?.description?.refFreq ? <p>{singleProduct?.description?.refFreq}</p> : ""}
            {singleProduct?.description?.scanMode ? <p>{singleProduct?.description?.scanMode}</p> : ""}
            {singleProduct?.description?.portType ? <p>{singleProduct?.description?.portType}</p> : ""}
            {singleProduct?.description?.brightness ? <p>{singleProduct?.description?.brightness}</p> : ""}
            {singleProduct?.description?.renFix ? <p>{singleProduct?.description?.renFix}</p> : ""}
            {singleProduct?.description?.spec1 ? <p>{singleProduct?.description?.spec1}</p> : ""}
            {singleProduct?.description?.spec2 ? <p>{singleProduct?.description?.spec2}</p> : ""}
            {singleProduct?.description?.spec3 ? <p>{singleProduct?.description?.spec3}</p> : ""}
            {singleProduct?.description?.spec4 ? <p>{singleProduct?.description?.spec4}</p> : ""}
            {singleProduct?.description?.spec5 ? <p>{singleProduct?.description?.spec5}</p> : ""}
            {singleProduct?.description?.spec6 ? <p>{singleProduct?.description?.spec6}</p> : ""}
            {singleProduct?.description?.spec7 ? <p>{singleProduct?.description?.spec7}</p> : ""}
            {singleProduct?.description?.spec8 ? <p>{singleProduct?.description?.spec8}</p> : ""}
            {singleProduct?.description?.spec9 ? <p>{singleProduct?.description?.spec9}</p> : ""}
            {singleProduct?.description?.spec10 ? <p>{singleProduct?.description?.spec10}</p> : ""}
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
              {/* <p>
                Available:
                <span> {singleProduct?.stock > 0 ? "In Stock" : "Not Available"}</span>
              </p> */}
              <p>
                ID : <span> {singleProduct?._id} </span>
              </p>
              {singleProduct?.description?.model ? <p>Model :<span> {singleProduct?.model} </span></p> : ""}
              {singleProduct?.sku ? <p>SKU :<span> {singleProduct?.sku} </span></p> : ""}
            </div>
            <hr />
            {/* {stock > 0 && <AddToCart product={singleProduct} />} */}
            <WhatsappChat name={singleProduct?.productname} img={singleProduct?.productfile?.url} sku={singleProduct?.sku} />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

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
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }

  // Button a{
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // gap:1rem;
  // }
`;

export default SingleProduct;
