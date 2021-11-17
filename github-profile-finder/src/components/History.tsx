import React from 'react';
import styled from 'styled-components';

interface IHistoryProps {
  userList: string[];
  setUserList: React.Dispatch<React.SetStateAction<string[]>>;
  getUserInfo: (user: string) => Promise<void>;
}

const History = ({ userList, setUserList, getUserInfo }: IHistoryProps) => {
  const showProfile = (user: string) => {
    getUserInfo(user);
  };

  const deleteHistory = (user: string) => {
    const filteredList = userList.filter((element: string) => element !== user);
    setUserList(filteredList);
    localStorage.setItem('userList', JSON.stringify(filteredList));
  };

  return (
    <UserList>
      {userList &&
        userList.map((user: string) => (
          <li key={user}>
            <span onClick={() => showProfile(user)}>{user}</span>
            <button onClick={() => deleteHistory(user)}>X</button>
          </li>
        ))}
    </UserList>
  );
};

export default History;

const UserList = styled.ul`
  color: white;

  li {
    width: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background-color: rgb(44, 48, 53);
    border-radius: 10px;
    margin-top: 3px;
  }

  span {
    cursor: pointer;
    word-break: break-all;
    line-height: 1.3;
    margin-right: 5px;
  }

  button {
    color: white;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    color: gold;
  }
`;
