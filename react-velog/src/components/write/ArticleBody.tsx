import React from 'react';
import styled from 'styled-components';

const ArticleBody = ({ setArticleData }) => {
  const handleChange = (e) => {
    setArticleData((articleData) => ({
      ...articleData,
      body: e.target.value,
    }));
  };
  return (
    <StyledBody
      onChange={handleChange}
      placeholder="당신의 이야기를 적어주세요."
    ></StyledBody>
  );
};

export default ArticleBody;

const StyledBody = styled.textarea`
  outline: 0;
  border: 0;
  resize: none;
  font-family: none;
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.5;
  color: rgb(52, 58, 64);
  flex-grow: 1;
`;
