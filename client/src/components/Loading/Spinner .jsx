import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
    return (
        <>
            <Wrapper>
                <div className="spinner"></div>
            </Wrapper>
        </>
    )
};

export default Spinner;

const Wrapper = styled.section`
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #fff; /* Outer border color */
  border-top: 2px solid transparent; /* Transparent top for spinner effect */
  border-radius: 50%; /* Makes it circular */
  animation: spin 0.6s linear infinite; /* Rotate animation */
}

@keyframes spin {
  0% {
    transform: rotate(0deg); /* Start position */
  }
  100% {
    transform: rotate(360deg); /* Full rotation */
  }
}

`

