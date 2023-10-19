import React from 'react';
import { useNavigate } from 'react-router-dom';

import { unauthorisedApi } from '../utils/api';

function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSignInResult(isCorrect) {
        props.onSignInResult(isCorrect);
    }

    function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true)

        unauthorisedApi.signIn(email, password)
        .then(result => {
            localStorage.setItem('jwt', result.token);
            navigate("/");
            handleSignInResult(true);
        })
        .catch(error => {
            console.log(error);
            handleSignInResult(false);
        })
        .finally(() => {
            setIsLoading(false)
        });
    }

    return(
        <form className="login" name="login" onSubmit={handleSubmit} noValidate>
            <h1 className="login__title">Вход</h1>
            <input 
                className="login__input login__input_email" 
                type="mail" 
                id="signinEmail" 
                name="signinEmail" 
                placeholder="Email"
                value={email || ""}
                onChange={handleEmailChange} 
                required
            />
            <input 
                className="login__input login__input_password" 
                type="password" 
                id="signinPassword" 
                name="signinPassword" 
                placeholder="Пароль"
                value={password || ""}
                onChange={handlePasswordChange} 
                required
            />
            <input className="login__button login__button_sign-in highlight" type="submit" value={isLoading ? "Вход..." : "Войти"} />
        </form>
    )
}

export default Login;