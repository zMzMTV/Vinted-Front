import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logovinted.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSearch);

const Header = ({ token, setUser, search, setSearch }) => {
  return (
    <div>
      <nav>
        <div className="header-container">
          <Link to="/">
            <div>
              <img className="header-logo" src={Logo} alt="logo" />
            </div>
          </Link>
          <div className="search-cont">
            <input
              type="text"
              placeholder="Recherche des articles"
              className="search-input"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <div className="search-icon">
              <FontAwesomeIcon icon="search" />
            </div>
          </div>

          {token ? (
            <button
              className="header-button button-disco"
              onClick={() => {
                setUser(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="button-signup header-button button-login-signup">
                  S'inscrire
                </button>
              </Link>
              <Link to="/login">
                <button className="header-button button-login-signup">
                  Se connecter
                </button>
              </Link>
            </>
          )}
          <Link to="/publish">
            <button className="header-button button-sold">
              Vend tes articles
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
