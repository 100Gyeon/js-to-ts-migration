import React from 'react';
import styled from 'styled-components';

const ArticleTitle = ({ setArticleData }) => {
  const handleChange = (e) => {
    setArticleData((articleData) => ({
      ...articleData,
      title: e.target.value,
    }));
  };
  return (
    <>
      <StyledTitle
        placeholder="제목을 입력하세요."
        onChange={handleChange}
      ></StyledTitle>
      <StyledBox />
    </>
  );
};

export default ArticleTitle;

const StyledTitle = styled.textarea`
  width: 100%;
  height: 2.75rem;
  line-height: 2.75rem;
  font-size: 2.75rem;
  outline: 0;
  border: 0;
  resize: none;
  margin-top: 2%;
  padding: 1rem 0;
  font-family: none;
  font-weight: 600;
  overflow-y: hidden;
`;

const StyledBox = styled.div`
  background: rgb(73, 80, 87);
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;
