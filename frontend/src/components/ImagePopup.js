import React from 'react';

function ImagePopup(props) {
     return (
        <div className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container-image">
                <button className="popup__cross-button highlight" type="button" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={props.card.link} alt={props.card.name}></img>
                    <figcaption className="popup__image-description">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )   
}

export default ImagePopup;