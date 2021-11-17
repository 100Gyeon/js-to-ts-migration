import { IUserData, IUserInfo } from 'App';
import React from 'react';
import styled from 'styled-components';

interface ICardProps {
  userInfo?: IUserData;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

const Card = ({ userInfo, setUserInfo }: ICardProps) => {
  if(!userInfo) return null;

  const {
    avatar_url,
    name,
    login,
    bio,
    html_url,
    followers,
    following,
    public_repos,
  } = userInfo;

  return (
    <Root>
      <button onClick={() => setUserInfo({ data: undefined, status: 'idle' })}>
        닫기
      </button>
      <img src={avatar_url} alt="프로필 이미지" />
      <h3>{name}</h3>
      <h4>{login}</h4>
      <p>{bio}</p>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        Visit Github
      </a>
      <UL>
        <li>
          <strong>Followers</strong>
          {followers}
        </li>
        <li>
          <strong>Following</strong>
          {following}
        </li>
        <li>
          <strong>Repos</strong>
          {public_repos}
        </li>
      </UL>
    </Root>
  );
};

export default Card;

const Root = styled.article`
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  background-color: rgb(44, 48, 53);
  width: 390px;
  border-radius: 20px;
  position: relative;
  animation: slideDown 400ms ease-in 0s 1 normal forwards;

  @keyframes slideDown {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  & > button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 50px;
    height: 30px;
    background-color: rgb(36, 39, 43);
    color: white;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  & > button:hover {
    color: gold;
  }

  & > img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-top: 30px;
  }

  & > h3 {
    font-size: 24px;
    margin-top: 24px;
    font-weight: bold;
  }

  & > h4 {
    font-size: 14px;
    margin-top: 5px;
  }

  & > p {
    padding: 20px 45px;
    text-align: center;
  }

  & > a {
    text-decoration: none;
    color: gold;
    border: 1px solid gold;
    border-radius: 8px;
    padding: 8px;
    &:hover {
      background-color: gold;
      color: rgb(44, 48, 53);
    }
  }
`;

const UL = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 25px;

  & > li {
    width: 130px;
    height: 59px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    background-color: rgb(36, 39, 43);
    border-left: 2px solid rgb(44, 48, 53);
    border-right: 2px solid rgb(44, 48, 53);

    &:nth-child(1) {
      border-left: none;
      border-bottom-left-radius: 20px;
    }

    &:nth-child(3) {
      border-right: none;
      border-bottom-right-radius: 20px;
    }

    & > strong {
      font-weight: bold;
    }
  }
`;
