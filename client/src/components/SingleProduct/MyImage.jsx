import React from "react";
import styled from "styled-components";

const MyImage = ({ imgs, productname }) => {
  return (
    <Wrapper>
      <img src={imgs} alt={`${productname}-Image`} className="product-image" />
    </Wrapper>
  );
};

export default MyImage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  .product-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`;
