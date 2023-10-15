import React from 'react';
import { useNavigate } from 'react-router-dom';

import headerLogo from "../images/header_logo.svg";

function Header(props) {
    const navigate = useNavigate();

    function getNavigateText() {
        const pathname = window.location.pathname;

        if (pathname === "/sign-in") {
            return "Регистрация"
        } else  if (pathname === "/sign-up") {
            return "Войти"
        } else {
            return "Выйти";
        }
    }

    function handleNavigation() {
        const pathname = window.location.pathname;

        if (pathname === "/sign-in") {
            navigate("/sign-up", {replace: true});
        } else if (pathname === "/sign-up") {
            navigate("/sign-in", {replace: true});
        } else {
            localStorage.removeItem("jwt");
            navigate("/sign-in", {replace: true});
        }
    }

    function isSignIn() {
        return localStorage.getItem("jwt");
    }

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип"></img>
            <div className='header__user'>
                { 
                    isSignIn() && <p className="header__email">{props.email}</p>
                }
                <span className={`header__button ${isSignIn ? "header__button_exit" : ""} highlight`} onClick={handleNavigation}>{getNavigateText()}</span>
            </div>
        </header>
    )
}

export default Header;