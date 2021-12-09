import React from 'react';
import styled from 'styled-components';
import profileImg from 'assets/images/profile.png';
import { ReactComponent as GithubIcon } from 'assets/icons/github.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as MailIcon } from 'assets/icons/mail.svg';

const Profile = () => {
  return (
    <>
      <StyledProfile>
        <img src={profileImg} alt="profile" />
        <StyledInfo>
          <div>100Gyeon</div>
          <div>한 줄 소개</div>
        </StyledInfo>
      </StyledProfile>
      <StyledIconWrapper>
        <GithubIcon />
        <TwitterIcon />
        <FacebookIcon />
        <HomeIcon />
        <MailIcon />
      </StyledIconWrapper>
    </>
  );
};

export default Profile;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: 2px solid rgb(233, 236, 239);
  padding-bottom: 2rem;
  margin-bottom: 1.5rem;

  & > img {
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;

  & > div:first-child {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
  }

  & > div:last-child {
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    color: rgb(73, 80, 87);
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;

  & svg {
    cursor: pointer;
    fill: rgb(173, 181, 189);
    margin-right: 1rem;
  }

  & svg:hover {
    fill: rgb(77, 77, 77);
  }
`;
