import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingPage = () => {
  return (
    <LoaderWrapper>
      <Spinner>
        <Dot $delay="0s" />
        <Dot $delay="0.2s" />
        <Dot $delay="0.4s" />
      </Spinner>
      <LoadingText>Loading, please wait...</LoadingText>
    </LoaderWrapper>
  );
};

export default LoadingPage;

// Wrapper for the whole page
const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e9ecef);
  color: #333;
  z-index: 10;
`;

// Dot animation keyframes
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

// Spinner container
const Spinner = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// Individual animated dots
const Dot = styled.div`
  width: 15px;
  height: 15px;
  background-color: #ffc221;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${({ $delay }) => $delay};
`;

// Loading text style
const LoadingText = styled.h2`
  font-size: 1.3rem;
  color: #555;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 10px;
`;


