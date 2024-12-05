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

const Wrapper = styled.section`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.2rem;
  padding: 0 100px;

  Button {
   padding: 10px 15px;
   border: none;
   border-radius: 5px;
   font-size: 0.9rem;
   cursor: pointer;
  }

  .name {
   display: flex;
   justify-content: space-between;
   align-items: center;
  }

  a {
    font-size: 2.2rem;
  }

  span {
   margin-left: 10px;
   font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 20px
  }
`;

export default PageNavigation;
