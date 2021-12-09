import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Header from 'components/common/Header';
import Profile from 'components/home/Profile';
import ArticleOptions from 'components/article/ArticleOptions';
import ImgWrapper from 'components/common/ImgWrapper';
import { StyledTag } from 'components/home/ArticleCard';
import { ArticleResponse } from 'utils/article';

const Article = () => {
  const location = useLocation();
  const article: ArticleResponse = location.state;
  const { title, body, thumbnail, date, tags } = article;

  return (
    <StyledArticle>
      <Header />
      <StyledContainer>
        <h1>{title}</h1>
        <ArticleOptions article={article} />
        <StyledArticleInfo>
          <span>백지연</span>
          <span>·</span>
          <span>{date}</span>
        </StyledArticleInfo>
        <StyledTag>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </StyledTag>
        {thumbnail && (
          <ImgWrapper ratio="50%">
            <StyledImg src={thumbnail} alt="thumbnail"></StyledImg>
          </ImgWrapper>
        )}
        <StyledBody>{body}</StyledBody>
        <Profile />
      </StyledContainer>
    </StyledArticle>
  );
};

export default Article;

const StyledArticle = styled.div`
  margin-bottom: 6rem;
`;

const StyledContainer = styled.div`
  width: 48rem;
  margin: 0 auto;
  & > h1 {
    font-size: 3rem;
    font-weight: 800;
    color: rgb(52, 58, 64);
    margin-bottom: 2rem;
    word-break: keep-all;
  }
`;

const StyledBody = styled.div`
  margin: 2rem 0;
  font-size: 1.125rem;
  line-height: 1.7;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const StyledArticleInfo = styled.div`
  margin-bottom: 0.875rem;
  & > span:first-child {
    font-weight: 600;
  }
  & > span + span {
    margin-left: 0.5rem;
  }
`;

const StyledImg = styled.img`
  width: 75% !important;
  height: auto !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
`;
