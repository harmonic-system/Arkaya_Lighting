import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <NavLink to="/">Home</NavLink>/<span>{title?.length > 50 ? title?.slice(0, 49) + "..." : title}</span>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding: 0 100px;

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
