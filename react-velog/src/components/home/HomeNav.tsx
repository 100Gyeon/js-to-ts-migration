import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HomeNav = () => {
  const [line, setLine] = useState(true);
  const location = useLocation();

  const handleClick = (e) => {
    switch (e.target.id) {
      case 'articles':
        setLine(true);
        break;
      case 'series':
        setLine(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setLine(true);
        break;
      case '/series':
        setLine(false);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <StyledNav line={line}>
      <Link to="/" onClick={handleClick} id="articles">
        글
      </Link>
      <Link to="/series" onClick={handleClick} id="series">
        시리즈
      </Link>
    </StyledNav>
  );
};

export default HomeNav;

const StyledNav = styled.div`
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  display: flex;
  justify-content: center;

  & > a {
    text-decoration: none;
    font-size: 1.325rem;
    width: 8rem;
    height: 3rem;
    color: rgb(73, 80, 87);
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > a:first-child {
    ${({ line }) => {
      const effect =
        'color: rgb(32, 201, 151); border-bottom: 3px solid rgb(32, 201, 151); transition: 0.3s ease-in-out 0s;';
      return line ? `${effect}` : null;
    }}
  }

  & > a:last-child {
    ${({ line }) => {
      const effect =
        'color: rgb(32, 201, 151); border-bottom: 3px solid rgb(32, 201, 151); transition: 0.3s ease-in-out 0s;';
      return !line ? `${effect}` : null;
    }}
  }
`;
