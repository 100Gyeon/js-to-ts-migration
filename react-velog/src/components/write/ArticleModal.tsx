import React, { useState } from 'react';
import styled from 'styled-components';
import { imageClient } from 'libs/api';
import { ReactComponent as DefaultThumbnail } from 'assets/icons/thumbnail.svg';
import { dataHandlerType } from './types';

interface ModalProps {
  title: string;
  summary: string;
  thumbnail: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDataChange: dataHandlerType;
  createArticle: () => Promise<void>;
}

const ArticleModal = ({
  title,
  summary,
  thumbnail,
  setIsModalOpen,
  onDataChange,
  createArticle,
}: ModalProps) => {
  const maxLength = 150;
  const [count, setCount] = useState(summary.length);
  const [color, setColor] = useState(
    count < maxLength ? 'rgb(134, 142, 150)' : 'rgb(250, 82, 82)',
  );
  const [previewImage, setPreviewImage] = useState(<DefaultThumbnail />);

  // 150자 체크
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const previewContent = e.target.value;
    const lengthCheckRegEx = new RegExp('^.{' + maxLength + ',}$');
    if (lengthCheckRegEx.test(previewContent)) {
      e.target.value = previewContent.substr(0, maxLength);
    }
    setCount(e.target.value.length);

    previewContent.length >= maxLength
      ? setColor('rgb(250, 82, 82)')
      : setColor('rgb(134, 142, 150)');

    onDataChange('summary', e.target.value);
  };

  // 이미지 업로드 구현
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files === null) return;
    const imageFile = e.target.files[0];
    formData.append('file', imageFile);

    // 서버에 이미지 보내고(post), 정제된 이미지 url 받아오기
    const imageResponse = await imageClient.post('', formData); // baseURL 수정할 게 없으니까 비워둠 (api.js 참고)
    const imageUrl = imageResponse.data.url; // 이 url을 articleData의 thumbnail에 넣어서 post
    onDataChange('thumbnail', imageUrl);

    // 썸네일 바꾸기
    imageUrl && setPreviewImage(imageUrl);
  };

  return (
    <>
      <StyledModalBackground />
      <StyledModalWrapper>
        <StyledLeft>
          <h3>포스트 미리보기</h3>
          <StyledImgInput>
            {thumbnail ? <img src={thumbnail} alt="썸네일" /> : previewImage}
            <label htmlFor="thumbnail">썸네일 업로드</label>
            <input type="file" id="thumbnail" onChange={handleImageChange} />
          </StyledImgInput>
          <h4>{title}</h4>
          <textarea
            value={summary}
            onChange={handleChange}
            placeholder="당신의 포스트를 짧게 소개해 보세요."
          ></textarea>
          <div style={{ color }}>{count}/150</div>
        </StyledLeft>
        <StyledLine />
        <StyledRight>
          <button onClick={() => setIsModalOpen(false)}>취소</button>
          <button onClick={createArticle}>출간하기</button>
        </StyledRight>
      </StyledModalWrapper>
    </>
  );
};

export default ArticleModal;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(248, 249, 250);
  z-index: 1;
`;

const StyledModalWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 60%;
`;

const StyledLeft = styled.div`
  width: 50%;

  & > h3 {
    font-size: 1.3125rem;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  & > h4 {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 1rem;
  }

  & > textarea {
    resize: none;
    width: calc(100% - 2rem);
    border: none;
    outline: none;
    box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
    line-height: 1.5;
    font-size: 0.875rem;
    height: 7.375rem;
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    font-family: inherit;
  }

  & > div:last-child {
    text-align: right;
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }
`;

const StyledImgInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(233, 236, 239);
  padding: 1rem;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  & > label {
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.25rem 2rem;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 8px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgb(32, 201, 151);
    background: white;
    &:hover {
      background: rgb(248, 249, 250);
    }
  }

  & > input {
    display: none;
  }
`;

const StyledLine = styled.div`
  width: 2px;
  min-height: 100%;
  background: rgb(233, 236, 239);
  margin-left: 2rem;
  margin-right: 2rem;
`;

const StyledRight = styled.div`
  width: 50%;
  display: flex;
  align-items: end;
  justify-content: end;

  & > button {
    color: white;
    border-radius: 4px;
    padding: 0px 1.125rem;
    height: 2.5rem;
    font-size: 1.125rem;
    font-weight: 600;
  }

  & > button:first-child {
    margin-right: 0.875rem;
    background: rgb(134, 142, 150);
    &:hover {
      background: rgb(173, 181, 189);
    }
  }

  & > button:last-child {
    background: rgb(18, 184, 134);
    &:hover {
      background: rgb(32, 201, 151);
    }
  }
`;
