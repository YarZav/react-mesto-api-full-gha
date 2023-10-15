import React from 'react';
import { useNavigate } from 'react-router-dom';

import { authorisationApi } from '../utils/api';

function Register(props) {
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

    function handleSignUpResult(isCorrect) {
        props.onSignUpResult(isCorrect);
    }

    function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true)

        authorisationApi.signUp(email, password)
        .then(result => {
            navigate("/sign-in");
            handleSignUpResult(true);
        })
        .catch(error => {
            console.log(error);
            handleSignUpResult(false);
        })
        .finally(() => {
            setIsLoading(false)
        });
    }

    function handleSignIn(event) {
        event.preventDefault();

        navigate("/sign-in");
    }

    return(
        <form className="login" name="login" onSubmit={handleSubmit} noValidate>
            <h1 className="login__title">Регистраиця</h1>
            <input 
                className="login__input login__input_email" 
                type="mail" 
                id="signupEmail" 
                name="signupEmail" 
                placeholder="Email"
                value={email || ""}
                onChange={handleEmailChange} 
                required
            />
            <input 
                className="login__input login__input_password" 
                type="password" 
                id="signupPassword" 
                name="signupPassword" 
                placeholder="Пароль"
                value={password || ""}
                onChange={handlePasswordChange} 
                required
            />
            <input className="login__button highlight" type="submit" value={isLoading ? " Регистрация..." : "Зарегистрироваться"} />
            <input className="login__sign-in highlight" type="button" value="Уже зарегистрированы? Войти" onClick={handleSignIn} />
        </form>
    )
}

export default Register;