import React from 'react';

import signUpCorrect from "../images/signup-correct.svg";
import signUpError from "../images/signup-error.svg";

function InfoTooltip(props) {
     return (
        <div className={`popup popup_type_signup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className={`popup__container popup__container_type_signup`}>
            <button className="popup__cross-button highlight" type="button" onClick={props.onClose} />
            <img className="popup__image_signup" src={props.isCorrect ? signUpCorrect : signUpError} alt="Корректная регистрация"></img>
            <h2 className="popup__title_signup">{props.isCorrect ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!\nПопробуйте ещё раз." } </h2>
        </div>
    </div>
    )   
}

export default InfoTooltip;