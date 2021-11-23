import React from 'react';
import styled from 'styled-components';

const ArticleCard = ({ article }) => {
  const { title, summary, tags, thumbnail, date } = article;
  return (
    <StyledCard>
      {thumbnail && <img src={thumbnail} alt="thumbnail" />}
      <h3>{title}</h3>
      <h4>{summary}</h4>
      <StyledTag>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </StyledTag>
      <div>{date}</div>
    </StyledCard>
  );
};

export default ArticleCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  line-height: 1.5;
  border-bottom: 1px solid rgb(233, 236, 239);
  margin: 0 auto;

  & > img {
    object-fit: cover;
    height: 20rem;
    margin-bottom: 1rem;
  }

  & > h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(33, 37, 41);
    word-break: keep-all;
  }

  & > h4 {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: rgb(73, 80, 87);
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  & > div {
    color: rgb(134, 142, 150);
    font-size: 0.875rem;
  }
`;

const StyledTag = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > span {
    background: rgb(241, 243, 245);
    color: rgb(12, 166, 120);
    padding: 0 1rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    border-radius: 1rem;
    margin-right: 0.875rem;
  }
`;
