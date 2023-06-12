import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">404 Страница не найдена</h1>
      <button onClick={ goBack } className="button page-not-found__button">Назад</button>
    </div>
  )
}

export default PageNotFound;