import React from 'react';
import PendingResult from './PendingResult';
import Card from './Card';
import RejectedResult from './RejectedResult';
import { IUserInfo } from 'App';

interface IResultProps {
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

const Result = ({ userInfo, setUserInfo }: IResultProps) => {
  switch (userInfo.status) {
    case 'pending':
      return <PendingResult />;
    case 'resolved':
      return <Card userInfo={userInfo.data} setUserInfo={setUserInfo} />;
    case 'rejected':
      return <RejectedResult />;
    case 'idle':
    default:
      return <></>;
  }
};

export default Result;
