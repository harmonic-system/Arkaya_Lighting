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
            <div className="card-data-flex">
              <h3>{productname?.length < 20 ? productname : productname?.slice(0, 15) + "..."}</h3>
              {price ? <p className="card-data--price">{<FormatPrice price={price} />}</p> : <QueryBox productId={_id} productName={productname} sku={sku} />}
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

    .card-data-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;

      h3 {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.text};
        font-weight: 600;
        text-transform: capitalize;
      }

      .card-data--price {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.helper};
        font-weight: bold;
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
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }

    figure {
      height: 15rem;
    }
  }

  @media (max-width: 549px) {
    .card-data-flex {
      flex-direction: row;
    }
  }
`;
