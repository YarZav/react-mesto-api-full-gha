import React from 'react';

import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);

    // Ввод данных в инпут

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({name: name, about: description});
    } 

    // Жизненный цикл реакт компонента

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen]);

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_type_name" 
                type="text" 
                minLength="2" 
                maxLength="40" 
                id="profileName" 
                name="profileName" 
                placeholder="Имя и Фамилия"
                value={name || ""}
                onChange={handleNameChange} 
                required
            />
            <span className="popup__error popup__error_type_name"></span>
            <input
                className="popup__input popup__input_type_description" 
                type="text" 
                minLength="2" 
                maxLength="200" 
                id="profileDescription"
                name="profileDescription" 
                placeholder="О себе"
                value={description || ""}
                onChange={handleDescriptionChange} 
                required
            />
            <span className="popup__error popup__error_type_description"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;