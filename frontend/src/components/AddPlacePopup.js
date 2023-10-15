import React from 'react';

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    // Ввод данных в инпут

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({name: name, link: link});
    }

    return (
        <PopupWithForm 
            name="place" 
            title="Новое место" 
            buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_type_name" 
                type="text" 
                minLength="2"
                maxLength="30" 
                id="placeName" 
                name="placeName" 
                placeholder="Название"
                value={name || ""}
                onChange={handleNameChange} 
                required
            />
            <span className="popup__error popup__error_type_name"></span>
            <input 
                className="popup__input popup__input_type_description" 
                type="url" 
                id="placeLink" 
                name="placeLink" 
                placeholder="Ссылка на фотографию"
                value={link || ""}
                onChange={handleLinkChange} 
                required
            />
            <span className="popup__error popup__error_type_description"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;