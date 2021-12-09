import React from 'react';
import styled from 'styled-components';

interface ImgWrapperProps {
  ratio: string;
  children: React.ReactNode;
}

const ImgWrapper = ({ ratio, children }: ImgWrapperProps) => {
  return <StyledImgWrapper ratio={ratio}>{children}</StyledImgWrapper>;
};

export default ImgWrapper;

const StyledImgWrapper = styled.div<{ ratio: string }>`
  padding-top: ${({ ratio }) => ratio};
  position: relative;
  margin-bottom: 1rem;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
