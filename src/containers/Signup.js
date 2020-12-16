import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
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
          <div className="checkbox-container">
            <div>
              <input type="checkbox" />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                "https://vinted-back-zmzm.herokuapp.com/user/signup",
                {
                  avatar: avatar,
                  username: username,
                  email: email,
                  password: password,
                }
              );
              setUser(response.data.token);
              history.push("/");
            }}
          >
            S'inscrire
          </button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </>
  );
};

export default Signup;
