import React from 'react';
import { client } from 'libs/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArticleResponse } from 'utils/article';

interface OptionsProps {
  article: ArticleResponse;
}

const ArticleOptions = ({ article }: OptionsProps) => {
  const navigate = useNavigate();
  const handleArticleDelete = async () => {
    await client.delete(`article/${article.id}`);
    navigate('/');
  };
  const handleNavigateEditPage = () => {
    navigate(`/article/edit/${article.id}`, { state: article });
  };
  return (
    <StyledOptions>
      <button>통계</button>
      <button onClick={handleNavigateEditPage}>수정</button>
      <button onClick={handleArticleDelete}>삭제</button>
    </StyledOptions>
  );
};

export default ArticleOptions;

const StyledOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1.25rem;
  & > button {
    padding: 0px;
    outline: none;
    border: none;
    background: none;
    font-size: 1rem;
    cursor: pointer;
    color: rgb(134, 142, 150);
    &:hover {
      color: rgb(33, 37, 41);
    }
  }
  & > button + button {
    margin-left: 0.5rem;
  }
`;
