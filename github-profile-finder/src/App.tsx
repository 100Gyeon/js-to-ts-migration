import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import styled from 'styled-components';
import axios from 'axios';

export interface IUserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface IUserInfo {
  status: "idle" | "pending" | "resolved" | "rejected";
  data?: IUserData;
}

function App() {
  const [userInfo, setUserInfo] = useState<IUserInfo>({ data: undefined, status: 'idle' });

  const getUserInfo = async (user: string) => {
    setUserInfo((currentUserInfo) => ({
      ...currentUserInfo,
      status: 'pending',
    }));

    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}`);
      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo,
        data,
        status: 'resolved',
      }));
    } catch (error) {
      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo,
        data: undefined,
        status: 'rejected',
      }));
      console.log(error);
    }
  };

  return (
    <Root>
      <Header />
      <SearchBar getUserInfo={getUserInfo} />
      <Result userInfo={userInfo} setUserInfo={setUserInfo} />
    </Root>
  );
}

export default App;

const Root = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1b1d21;
`;
