import React, { useState, useEffect } from 'react';
import { client } from 'libs/api';
import ArticleCard from './ArticleCard';
import { ArticleResponse } from 'utils/article';

const ArticlesContainer = () => {
  const [articleData, setArticleData] = useState<ArticleResponse[]>([]);

  const getArticleData = async () => {
    const { data } = await client.get('/article');
    setArticleData(data.reverse());
  };

  useEffect(() => {
    getArticleData();
  }, []);

  return (
    <div>
      {articleData.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesContainer;
