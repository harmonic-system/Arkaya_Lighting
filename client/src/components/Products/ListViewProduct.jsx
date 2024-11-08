import React from 'react'
import { Button } from '../../styles/Button';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FormatPrice from '../../Helper/FormatPrice';
import QueryBox from './QueryBox';

const ListViewProduct = ({ curElem }) => {

  const { _id, productname, productfile, description, price, sku } = curElem;


  return (
    <>
      <ListViewProductWrapper>
        <div className="card grid grid-two-column">
          <figure>
            <img src={productfile.url} alt={productname} />
          </figure>

          <div className="card-data">
            <h3>{productname?.length < 30 ? productname : productname?.slice(0, 30) + "..."}</h3>
            {/* <p>
              <FormatPrice price={price} />
            </p> */}
            {/* <p className="card-data--price">{<FormatPrice price={price} />}</p> */}
            {description?.des ? <p>{description?.des?.slice(0, 90)}...</p> : "..."}
            {description?.spec1 ? <p>{description?.spec1?.slice(0, 90)}...</p> : "..."}
            {description?.moduleSize ? <p>{description?.moduleSize}</p> : "..."}
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
  }
`