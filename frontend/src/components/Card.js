import React from 'react';

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.includes(currentUser._id);
    const cardLikeButtonClassName = (`element__heart-button ${isLiked && 'element__heart-button_active'}`);
    
    function onCard() {
        props.onCard(props.card);
    }

    function onCardLike() {
        props.onCardLike(props.card);
    }

    function onCardDelete() {
        props.onCardDelete(props.card);
    }

    return(
        <div className="element">
            {isOwn && <button className={`element__delete-button highlight`} type="button" onClick={onCardDelete}></button>} 
            <img 
                className="element__image" 
                src={props.card.link} 
                alt={props.card.name} 
                onClick={onCard}
            />
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button 
                        className={`${cardLikeButtonClassName} highlight`} 
                        type="button" 
                        onClick={onCardLike}
                    />
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;