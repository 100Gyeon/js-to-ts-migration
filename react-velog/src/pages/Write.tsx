import React, { useState } from 'react';
import ArticleTitle from 'components/write/ArticleTitle';
import ArticleTags from 'components/write/ArticleTags';
import ArticleBody from 'components/write/ArticleBody';
import ArticleFooter from 'components/write/ArticleFooter';
import ArticleModal from 'components/write/ArticleModal';
import styled from 'styled-components';

const Write = () => {
  // 필요한 데이터를 입력과 동시에 받아오고 (state로 관리)
  // 출간하기를 누르면 axios.post
  const [articleData, setArticleData] = useState({
    id: '', // articleData.length + 1
    title: '',
    body: '',
    summary: '',
    series: '',
    tags: [],
    thumbnail: '',
    date: '', // 오늘 날짜
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledWritePage>
      <ArticleTitle setArticleData={setArticleData} />
      <ArticleTags articleData={articleData} setArticleData={setArticleData} />
      <ArticleBody setArticleData={setArticleData} />
      <ArticleFooter setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <ArticleModal
          articleData={articleData}
          setArticleData={setArticleData}
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
