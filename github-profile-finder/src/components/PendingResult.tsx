import React from 'react';
import styled from 'styled-components';

const PendingResult = () => {
  return <Root></Root>;
};

export default PendingResult;

const Root = styled.div`
  margin-top: 16px;
  border: 8px solid #f3f3f3;
  border-top: 8px solid gold;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(3600deg);
    }
  }
`;
