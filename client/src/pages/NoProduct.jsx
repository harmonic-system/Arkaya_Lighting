import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { Link } from 'react-router-dom';

const NoProduct = () => {
    return (
        <NoProductsContainer>
            <Message>No Products Available</Message>
            <SubMessage>We couldn't find any products at the moment. Please check back later!</SubMessage>
            <Link to="/"><Button>Go to Home</Button></Link>
        </NoProductsContainer>
    );
};

export default NoProduct;

const NoProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f9f9f9;
  color: #333;
  padding: 5rem;
  border-radius: 10px;
`;

const Message = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SubMessage = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #555;
`;
