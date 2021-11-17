import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import History from './History';

interface ISearchBarProps {
  getUserInfo: (user: string) => Promise<void>;
}

const SearchBar = ({ getUserInfo }: ISearchBarProps) => {
  const [user, setUser] = useState('');
  const [userList, setUserList] = useState<string[]>([]);
  const maxHistory = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    getUserInfo(user);
    if (!userList.includes(user)) {
      // history에 최대 3개까지만 저장
      let tempList;
      tempList =
        userList.length >= maxHistory
          ? [...userList, user].slice(-3)
          : [...userList, user];
      setUserList(tempList);
      localStorage.setItem('userList', JSON.stringify(tempList));
    }
    setUser('');
  };

  useEffect(() => {
    const storageItem = localStorage.getItem('userList');
    const storageList = storageItem ? JSON.parse(storageItem) : [];
    setUserList(storageList);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          value={user}
          onChange={handleChange}
          type="text"
          placeholder="Github 프로필을 검색해 보세요."
        />
      </form>
      <History
        userList={userList}
        setUserList={setUserList}
        getUserInfo={getUserInfo}
      />
    </>
  );
};

export default SearchBar;

const Input = styled.input`
  width: 320px;
  height: 57px;
  padding: 16px;
  color: rgb(229, 230, 231);
  background-color: rgb(36, 39, 43);
  outline: none;
  border: 8px solid rgb(105, 105, 105, 0.5);
  border-radius: 20px;
`;
