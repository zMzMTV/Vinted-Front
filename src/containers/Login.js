import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link, useLocation } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const location = useLocation();

  const fromPublish = location.state?.fromPublish ? true : false;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="signup-container">
        <h2>Se connecter</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Adresse mail"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                "https://vinted-back-zmzm.herokuapp.com/user/login",
                {
                  email: email,
                  password: password,
                }
              );
              if (response.data.token) {
                setUser(response.data.token);
                history.push(fromPublish ? "/publish" : "/");
              } else {
                alert("Error happen");
              }
            }}
          >
            Go
          </button>
          <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
