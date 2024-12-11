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
                    <p className="description-box-element">{key}:</p>
                    <p className="description-box-text">{value.length > 90 ? `${value.slice(0, 90)}...` : value}</p>
                  </div>
                ) : null;
              })
            }
            {price ? <FormatPrice price={price} /> : <QueryBox productId={_id} productName={productname} sku={sku} />}
            <NavLink to={`/singleproduct/${_id}`} className="btn-main">
              <Button className="btn">Read More</Button>
            </NavLink>
          </div>
        </div>
      </ListViewProductWrapper>
    </>
  )
}

export default ListViewProduct

const ListViewProductWrapper = styled.section`
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
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin: 1.5rem 0;
      // margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
      border-radius:1rem;
    }

    figcaption {
      z-index:3;
    }
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid #ffc221;
      // border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffc221;
      // color: rgb(98 84 243);

      &:hover {
        background-color: #ffc221;
        // background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }

    .btn-main .btn:hover {
      color: #fff;
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
  }
`