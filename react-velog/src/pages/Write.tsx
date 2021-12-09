import React, { useState } from 'react';
import ArticleTitle from 'components/write/ArticleTitle';
import ArticleTags from 'components/write/ArticleTags';
import ArticleBody from 'components/write/ArticleBody';
import ArticleFooter from 'components/write/ArticleFooter';
import ArticleModal from 'components/write/ArticleModal';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { client } from 'libs/api';
import { ArticleResponse, ArticleType } from 'utils/article';

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article: ArticleResponse = location.state;

  const [articleData, setArticleData] = useState<ArticleType>(
    article ?? {
      title: '',
      body: '',
      summary: '',
      tags: [],
      thumbnail: '',
    },
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const createArticle = async () => {
    // 수정 중일 때 출간하기 누르면 update(patch)
    if (article) {
      await client.patch(`article/${article.id}`, articleData);
      navigate(`/article/${article.id}`, { state: articleData });
      return;
    }
    // 새 글 작성 중일 때 출간하기 누르면 post
    await client.post('/article', articleData);
    navigate('/');
  };

  const handleDataChange = (
    key: 'title' | 'body' | 'summary' | 'thumbnail',
    value: string,
  ) => {
    const tempArticleData = { ...articleData };
    tempArticleData[key] = value;
    setArticleData(tempArticleData);
  };

  const handleArrDataChange = (key: 'tags', value: string) => {
    const tempArticleData = { ...articleData };
    tempArticleData[key] = [...tempArticleData[key], value];
    setArticleData(tempArticleData);
  };

  const handleArrDataRemove = (key: 'tags', value: string) => {
    const tempArticleData = { ...articleData };
    tempArticleData[key] = tempArticleData[key].filter((el) => el !== value);
    setArticleData(tempArticleData);
  };

  return (
    <StyledWritePage>
      <ArticleTitle title={articleData.title} onDataChange={handleDataChange} />
      <ArticleTags
        tags={articleData.tags}
        onArrDataChange={handleArrDataChange}
        onArrDataRemove={handleArrDataRemove}
      />
      <ArticleBody body={articleData.body} onDataChange={handleDataChange} />
      <ArticleFooter setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <ArticleModal
          title={articleData.title}
          summary={articleData.summary}
          thumbnail={articleData.thumbnail}
          onDataChange={handleDataChange}
          createArticle={createArticle}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </StyledWritePage>
  );
};

export default Write;

const StyledWritePage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
