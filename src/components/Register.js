// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Register({ handleRegister }) {

//   const [formValue, setFormValue] = useState({
//     email: '',
//     password: ''
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormValue({
//       ...formValue,
//       [name]: value
//     });
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     handleRegister(formValue);
//     setFormValue({ email: '', password: '' });
//   }

//   return(
//     <div className="authorization">
//       <h2 className="authorization__title">Регистрация</h2>
//       <form onSubmit={ handleSubmit } className="authorization__form" action="#">
//         <input 
//           id="email" 
//           name="email" 
//           type="email" 
//           placeholder="Email"
//           value={ formValue.email } 
//           onChange={ handleChange } 
//           className="authorization__input"
//           required
//         />
//         <input 
//           id="password" 
//           name="password" 
//           type="password" 
//           placeholder="Пароль"
//           value={ formValue.password } 
//           onChange={ handleChange }
//           className="authorization__input"
//           required
//         />
//         <button type="submit" className="authorization__button button">Зарегистрироваться</button>
//         <Link to="/sign-in" className="authorization__link">Уже зарегистрированы? Войти</Link>
//       </form>
//     </div>
//   )
// }

// export default Register;