// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Login({ handleAuthorize }) {

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

//     handleAuthorize(formValue);
//     setFormValue({email: '', password: ''});
//   }

//   return (
//     <div className="authorization">
//       <h2 className="authorization__title">Вход</h2>
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
//         <button type="submit" className="authorization__button button">Войти</button>
//         <Link to="/sign-up" className="authorization__link">Еще не зарегистрированы? Зарегистрироваться</Link>
//       </form>
//     </div>
//   )
// }

// export default Login;