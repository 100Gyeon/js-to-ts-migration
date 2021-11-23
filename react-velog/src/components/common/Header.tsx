import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as VelogIcon } from '../../assets/icons/velog.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import profileImg from '../../assets/images/profile.png';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLeft>
        <VelogIcon width="30" height="30" />
        <div>JiYeon.log</div>
      </StyledLeft>
      <StyledRight>
        <SearchIcon />
        <Link to="/write">
          <button>새 글 작성</button>
        </Link>
        <img src={profileImg} alt="profile" />
        <MoreIcon />
      </StyledRight>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2%;
  margin-bottom: 5rem;
`;

const StyledLeft = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-left: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;

  & svg:first-child {
    margin-right: 1.5rem;
  }

  & button {
    border-radius: 15px;
    background-color: white;
    border: 1px solid black;
    padding: 0 1rem;
    height: 2rem;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0px 0px 3px black;
    margin-right: 1.25rem;
  }

  & button:hover {
    background-color: black;
    color: white;
  }

  & > img {
    height: 2.5rem;
    width: 2.5rem;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 8px;
    border-radius: 50%;
    object-fit: cover;
  }

  & svg:last-child {
    font-size: 1.5rem;
    margin-left: 0.25rem;
    fill: rgb(134, 142, 150);
  }
`;
