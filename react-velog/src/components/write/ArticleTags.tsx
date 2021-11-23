import React from 'react';
import styled from 'styled-components';

const ArticleTags = ({ articleData, setArticleData }) => {
  const tags = articleData.tags;
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // input 내용 -> tag로 추가
      // 불변성 유지를 위해 아래처럼 작성
      const tempData = { ...articleData };
      tempData.tags = [...tempData.tags, e.target.value];
      setArticleData(tempData);

      e.target.value = '';
    }
  };
  return (
    <StyledTag>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
      <input
        type="text"
        onKeyPress={handleKeyPress}
        placeholder="태그를 입력하세요."
      />
    </StyledTag>
  );
};

export default ArticleTags;

const StyledTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > span {
    background: rgb(241, 243, 245);
    color: rgb(12, 166, 120);
    padding: 0 1rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    border-radius: 1rem;
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
  }
  & > input {
    outline: 0;
    border: 0;
    font-size: 1rem;
    height: 2rem;
    margin-bottom: 0.75rem;
  }
`;
