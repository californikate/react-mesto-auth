import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteConfirm() {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
    />
  );
}

export default PopupDeleteConfirm;