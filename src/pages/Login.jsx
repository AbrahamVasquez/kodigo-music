import React, { useState } from 'react';
import Logo from "../img/logo.png";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Perform manual form validation
    if (!email || !password) {
      setErr(true);
      return;
    }

    setErr(false);

    setTimeout(() => {
      navigate("/");
    }, 1000);

  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src={Logo} alt="Logo" />
        <span className="title">Log in to Kodigo Music</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Incorrect username or password.🚫</span>}
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
