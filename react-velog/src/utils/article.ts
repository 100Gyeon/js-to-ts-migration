export interface ArticleResponse {
  id: string;
  title: string;
  body: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  date: string;
}

export type ArticleType = Omit<ArticleResponse, 'id' | 'date'>;
