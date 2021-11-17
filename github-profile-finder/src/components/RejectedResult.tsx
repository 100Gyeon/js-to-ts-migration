import React from 'react';
import styled from 'styled-components';

const RejectedResult = () => {
  return <Root>사용자가 없습니다.</Root>;
};

export default RejectedResult;

const Root = styled.div`
  margin-top: 16px;
  color: white;
`;