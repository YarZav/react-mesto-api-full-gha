import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button className="popup__cross-button highlight" type="button" onClick={props.onClose} />
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <input className="popup__button highlight" type="submit" value={props.buttonText} />
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;