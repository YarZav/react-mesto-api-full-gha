import React from 'react';

import Card from "./Card";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <div className={`loader ${props.isLoading ? "" : "hidden"}`}></div>

      <section className="profile">
        <div className={`profile__avatar-container ${props.isLoading ? "hidden" : ""}`}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля"></img>
          <div className="profile__avatar-overlay">
            <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
          </div>
        </div>
        <div className={`profile__info ${props.isLoading ? "hidden" : ""}`}>
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button highlight" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className={`profile__add-button ${props.isLoading ? "hidden" : ""} highlight`} type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        { 
          props.cards.map(card => { 
            return (
              <Card
                key={card._id} 
                card={card}
                onCard={props.onCard} 
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })
        }
      </section>
    </main>
  )
}

export default Main;