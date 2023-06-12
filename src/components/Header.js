import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, email, handleLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={ logo } alt="логотип сайта." />
      <div className="header__nav">
        { loggedIn ? 
          <p className="header__user-email">{ email }</p> : null }
        { loggedIn ? (
          <button 
            onClick={ handleLogout } 
            type="button" 
            className="header__logout-button button">
              Выйти
          </button>
        ) : (
          <>
            { location.pathname === "/sign-up" ? (
                <Link to='/sign-in' className="header__link">Войти</Link>
              ) : (
                <Link to='/sign-up' className="header__link">Регистрация</Link>
              ) 
            }
          </>
        )}
      </div>
    </header>
  );
}

export default Header;