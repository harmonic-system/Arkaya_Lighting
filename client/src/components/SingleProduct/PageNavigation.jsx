import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";

const PageNavigation = ({ title }) => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="container ">
        <div className="page-navigation-container">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <div className="name">
            <NavLink to="/home">Home</NavLink>/<span>{title?.length > 50 ? title?.slice(0, 49) + "..." : title}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PageNavigation;

const Wrapper = styled.section`
  .page-navigation-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 42px 15px 16px;
    gap: 10px;
    background: linear-gradient(180deg, #fff, #eaeaea);
    border-radius: 0 0 15px 15px;

    .name {
      font-size: 1.5rem;
      color: #333;
      display: flex;
      align-items: flex-start;
      gap: 5px;

      span {
        font-weight: bold;
        color: #007bff;
      }

      a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
      }
    }

    Button {
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: bold;
      border: 1px solid #fcc221;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #333; /* Default text color */

      &:hover {
        background-color: #fcc221;
        border-color: #fcc221;
        color: #fff;
      }
    }

    @media (max-width: 525px) {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 10px;
      gap:2rem;

      Button {
        width: 100%;
        padding: 15px;
        font-size: 1.1rem;
      }

      .name {
        font-size: 1.8rem;
        flex-grow: 0;
        text-align: left;
        width: 100%;
        align-items: flex-start;

        span {
          font-weight: normal;
        }
      }
    }
  }
`;



