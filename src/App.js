import React, { useState } from "react";
import "./App.css";
import "./assets/fonts/stylesheet.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";

function App() {
  const [token, setToken] = useState(Cookie.get("userToken") || null);
  const [search, setSearch] = useState("");

  console.log(token);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      // Create Token
      Cookie.set("userToken", tokenToSet, { expires: 7 });
      setToken(tokenToSet);
    } else {
      // Delete cookie
      Cookie.remove("userToken");
      // Put state to null
      setToken(null);
    }
  };
  return (
    <div>
      <Router>
        <Header
          token={token}
          setUser={setUser}
          search={search}
          setSearch={setSearch}
        />
        <Switch>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/publish">
            {!token ? <Redirect to="/login" /> : <Publish token={token} />}
          </Route>
          <Route path="/product/:id">
            <Offer />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
