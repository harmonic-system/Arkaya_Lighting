import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";

const PageNavigation = ({ title }) => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <div className="name">
        <NavLink to="/">Home</NavLink>/<span>{title?.length > 50 ? title?.slice(0, 49) + "..." : title}</span>
      </div>
    </Wrapper>
  );
};

export default PageNavigation;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 100px;
  gap: 10px;

  .name {
    font-size: 1.5rem;
    color: #333;
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }

  .name span {
    font-weight: bold;
    color: #007BFF;
  }

  .name a {
    text-decoration: none;
    color: #007BFF;
    font-weight: bold;
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
  }

  Button:hover {
    background-color: #fcc221; 
    border: 1px solid #fcc221; 
    color: #fff; 
  }

  @media (max-width: 525px) {
    flex-direction: column; 
    align-items: flex-start; 
    width: 100%;
    padding: 10px;

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
    }

    .name span {
      font-weight: normal; 
    }
  }
`;


