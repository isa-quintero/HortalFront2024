import React from 'react';
import styled from 'styled-components';
import logo from '../assets/hortalsoft.png';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import CartButtons from './CartButtons';
import { useOffersContext } from '../context/offers_context';
import { useUserContext } from '../context/user_context';
import { links, associationLinks, customerLinks, farmerLinks } from '../utils/constants';

const Nav = () => {
  const { openSidebar } = useOffersContext();
  const { myUser } = useUserContext();
  const location = useLocation();

  let linksToShow;
  if (myUser?.role === 'CUSTOMER') {
    linksToShow = customerLinks;
  } else if (myUser?.role === 'FARMER') {
    linksToShow = farmerLinks;
  } else if (myUser?.role === 'ASSOCIATION') {
    linksToShow = associationLinks;
  } else {
    linksToShow = links;
  }

  const isRegisterPage = location.pathname === '/register';

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='Hortalsoft' />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        {!isRegisterPage && (
          <ul className='nav-links'>
            {linksToShow.map((link) => {
              const { id, text, url } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
            {myUser && myUser.role === 'CUSTOMER' && (
              <li>
                <Link to='/checkout'>facturación</Link>
              </li>
            )}
          </ul>
        )}
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
