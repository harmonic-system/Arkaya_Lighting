import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import QueryBox from "./QueryBox";
import { FaHeart } from 'react-icons/fa';
import { useWishListContext } from "../../context/wishlist-context";
import { useAuthContext } from "../../context/auth-context";
import toast from "react-hot-toast";
import styled from "styled-components";

const GridViewProduct = (curElem) => {
  const { _id, productname, productfile, model, price, sku } = curElem;
  const { addToWishList } = useWishListContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleAddToWishlist = (productId) => {
    if (user) {
      addToWishList(productId)
    } else {
      navigate("/login")
      toast("Please Login")
    }
  }

  return (
    <>
      <GridViewProductWrapper>
        <div className="card">
          <NavLink to={`/singleproduct/${_id}`}>
            <figure>
              <img src={productfile.url} alt={productname} />
              <figcaption className="caption" onClick={() => { handleAddToWishlist(_id) }}>{<FaHeart />}</figcaption>
            </figure>

          </NavLink>
          <div className="card-data">
            <div className="card-data-name">
              {/* <h3>{productname}</h3> */}
              <h3>{productname?.length < 100 ? productname : productname?.slice(0, 100) + "..."}</h3>
            </div>
            <div className="card-data-flex">
              {
                price ? <p className="card-data--price">{<FormatPrice price={price} />}</p>
                  :
                  <section className="card-data--query">
                    <QueryBox productId={_id} productName={productname} sku={sku} />
                  </section>
              }
            </div>
          </div>
        </div>
      </GridViewProductWrapper>
    </>
  );
};

export default GridViewProduct;

const GridViewProductWrapper = styled.section`
  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
  }

  figure {
    width: 100%;
    height: 20rem; /* Fixed height for uniformity */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      transition: width 0.4s ease;
    }

    &:hover::after {
      width: 100%;
    }

    &:hover img {
      transform: scale(1.4);
    }

    img {
      max-width: 90%;
      height: 100%;
      object-fit: cover; /* Ensure proper image scaling */
      transition: all 0.4s ease;
    }

    .caption {
      z-index: 3;

      svg {
        color: #ff4d4d; /* Heart color */
        font-size: 1.5rem;
      }
    }
  }

  .card-data {
    padding: 1.5rem;

    .card-data-name h3 {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.text};
      font-weight: 600;
      text-transform: capitalize;
      height: 50px;
      word-break: break-all;
      overflow: hidden; 
      text-overflow: ellipsis; 
      width: 100%;
    }

    .card-data-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      flex-wrap: wrap; /* Allows wrapping for smaller screens */
      gap: 0.8rem;
      height: 50px;

      .card-data--price {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.helper};
        font-weight: bold;
        text-align:left;
        width: 100%; 
      }

      .card-data--query {
        width: 100%; 
        display: flex;
        justify-content:flex-end;
        padding: 0.5rem;
        background-color: ${({ theme }) => theme.colors.lightBg}; 
      }
    }
  }

  Button {
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffc221;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ffdd73;
      color: gray;
    }
  }

  @media (max-width: 768px) {
    .card-data-flex {
      flex-direction: column; /* Stacks items vertically */
      align-items: flex-start; /* Aligns content to the left */
      gap: 0.5rem;
    }

    figure {
      height: 15rem; /* Adjust image height for smaller screens */
    }

    .card-data-name h3 {
      font-size: 0.9rem; /* Slightly smaller font size for mobile screens */
    }
  }

  @media (max-width: 549px) {
    .card-data-flex {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    .card-data--query {
      text-align: right;
    }
  }
`;
