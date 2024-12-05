import React from "react";
import styled from "styled-components";
const MyImage = ({ imgs }) => {

  return (
    <>
      <Wrapper>
        <img
          src={imgs}
          alt=""
          className="box-image--style"
        />
      </Wrapper>
    </>

  )
}
export default MyImage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  
  .box-image--style{
   width: 100%;
   height: 100%;
   object-fit: contain;
   border-radius:1rem;
   cursor: pointer;
   box-shadow: ${({ theme }) => theme.colors.shadow};
   transition: transform 0.3s ease;
   &:hover {
     transform: scale(1.05);
   }}
`