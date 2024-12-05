import React from 'react';
import styled, { keyframes } from 'styled-components';

const ActionLoading = () => {
    return (
        <LoaderWrapper>
            <Spinner />
            <LoadingText>Loading, please wait...</LoadingText>
        </LoaderWrapper>
    );
};

export default ActionLoading;

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Wrapper for the whole page
const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #ffc221;
  color: #333;
  gap: 1rem;
  padding: 1rem;
`;

// Animated spinner style
const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
//   margin-bottom: 20px;
`;

// Loading text style
const LoadingText = styled.h2`
  font-size: 1rem;
  color: #555;
`;
