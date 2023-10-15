import React from 'react';

import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    // Жизненный цикл реакт компонента

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_type_description" 
                type="url" 
                id="avatar" 
                name="profileAvatar" 
                placeholder="Ссылка на картинку" 
                defaultValue=""
                ref={avatarRef} 
                required
            />
            <span className="popup__error popup__error_type_description"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;