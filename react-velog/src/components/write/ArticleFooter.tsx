import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { useHistory } from 'react-router-dom';

const ArticleFooter = ({ setIsModalOpen }) => {
  const history = useHistory();

  return (
    <StyledFooter>
      <button onClick={() => history.goBack()}>
        <ArrowIcon />
        <span>나가기</span>
      </button>
      <div>
        <button>임시저장</button>
        <button onClick={() => setIsModalOpen(true)}>출간하기</button>
      </div>
    </StyledFooter>
  );
};

export default ArticleFooter;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0.75rem;
  padding-top: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  box-shadow: 0px -3px 3px rgb(0 0 0 / 10%);

  & button {
    border-radius: 4px;
    padding: 0 1.25rem;
    height: 2.5rem;
    font-size: 1.125rem;
  }

  & > button {
    background: none;
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }

  & > button:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  & > button > span {
    margin-left: 0.5rem;
  }

  & > div > button {
    font-weight: 600;
  }

  & > div > button:first-child {
    margin-right: 0.75rem;
    background: rgb(233, 236, 239);
    color: rgb(73, 80, 87);
  }

  & > div > button:first-child:hover {
    background: rgb(241, 243, 245);
  }

  & > div > button:last-child {
    background: rgb(18, 184, 134);
    color: white;
    margin-right: 2rem;
  }

  & > div > button:last-child:hover {
    background: rgb(32, 201, 151);
  }
`;
