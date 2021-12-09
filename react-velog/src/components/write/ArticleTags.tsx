import React from 'react';
import styled from 'styled-components';
import { StyledTag } from 'components/home/ArticleCard';
import { arrayHandlerType } from './types';

interface TagProps {
  tags: string[];
  onArrDataChange: arrayHandlerType;
  onArrDataRemove: arrayHandlerType;
}

const ArticleTags = ({ tags, onArrDataChange, onArrDataRemove }: TagProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.key === 'Enter') {
      if (e.target.value === '' || tags.includes(e.target.value)) {
        e.target.value = '';
        return;
      }
      onArrDataChange('tags', e.target.value);
      e.target.value = '';
    }
  };
  return (
    <StyledRoot>
      <StyledTag>
        {tags &&
          tags.map((tag) => (
            <span key={tag} onClick={(e) => onArrDataRemove('tags', tag)}>
              {tag}
            </span>
          ))}
      </StyledTag>
      <input
        type="text"
        onKeyPress={handleKeyPress}
        placeholder="태그를 입력하세요."
      />
    </StyledRoot>
  );
};

export default ArticleTags;

const StyledRoot = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > input {
    outline: 0;
    border: 0;
    font-size: 1rem;
    height: 2rem;
    margin-bottom: 0.75rem;
  }
`;
