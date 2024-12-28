import React from 'react'
import { Button } from '../../styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormatPrice from '../../Helper/FormatPrice';
import QueryBox from './QueryBox';
import { useWishListContext } from '../../context/wishlist-context';
import { useAuthContext } from '../../context/auth-context';
import { FaHeart } from 'react-icons/fa';

const ListViewProduct = ({ curElem }) => {

  const { _id, productname, productfile, des, price, sku } = curElem;

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
      <ListViewProductWrapper>
        <div className="card grid grid-two-column">
          <figure>
            <img src={productfile.url} alt={productname} />
            <figcaption className="caption" onClick={() => { handleAddToWishlist(_id) }}>{<FaHeart />}</figcaption>
          </figure>
          <div className="card-data">
            <h3>{productname?.length < 30 ? productname : `${productname?.slice(0, 30)}...`}</h3>

            {des &&
              Object.keys(des).slice(0, 1).map((key) => {
                const value = des[key];
                return value ? (
                  <div
                    className={`description-box ${key === "description" ? "column-layout" : "row-layout"}`}
                    key={key}
                  >
                    <p className="description-box-text">{value.length > 90 ? `${value.slice(0, 90)}...` : value}</p>
                  </div>
                ) : null;
              })
            }
            {price ? <FormatPrice price={price} /> : <QueryBox productId={_id} productName={productname} sku={sku} />}
            <NavLink to={`/singleproduct/${_id}`} className="btn-main">
              <button className="btn">Read More</button>
            </NavLink>
          </div>
        </div>
      </ListViewProductWrapper>
    </>
  )
}

export default ListViewProduct

const ListViewProductWrapper = styled.section`

  /* Figure Styling */
  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      transition: all 0.2s linear;
      cursor: pointer;
      border-radius: 1rem;
    }

    &:hover::after {
      width: 100%;
    }

    &:hover img {
      transform: scale(1.4);
    }

    img {
      max-width: 90%;
      margin: 1.5rem 0;
      height: 20rem;
      transition: all 0.2s linear;
      border-radius: 1rem;
    }

    figcaption {
      z-index: 3;

      svg {
        color: #ff4d4d; /* Heart color */
        font-size: 1.5rem;
      }
    }
  }

  /* Card Styling */
  .card {
    border: 0.1rem solid rgba(170, 170, 170, 0.4);
    border-radius: 1rem;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    /* Button Styling */
    .btn {
      margin: 2rem 0;
      background-color: rgba(0, 0, 0, 0%);
      border: 0.1rem solid #ffc221;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffc221;
      transition: all 0.3s ease;

      &:hover {
        background-color: #ffc221;
        color: #fff;
      }

      a {
        color: rgb(98, 84, 243);
        font-size: 1.4rem;
      }
    }

    .btn-main .btn:hover {
      color: #fff;
    }
  }

  /* Description Box */
  .description-box {
    display: flex;
    padding: 10px;
    border-radius: 5px;

    &.column-layout {
      flex-direction: column;
    }

    &.row-layout {
      flex-direction: row;
      align-items: flex-start;
    }

    .description-box-text {
      flex: 1;
    }
  }

  /* General Button Styling */
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
`;
