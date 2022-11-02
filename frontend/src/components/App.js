import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import Profile from "./Profile";
import SignIn from "./SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/api/users/:id">
            <Profile />
          </Route>
          <Route path="/signin">
            {sessionStorage.getItem("loggedIn") ? ( // If user already signed in, redirect to homepage
              <Redirect to="/" />
            ) : (
              <SignIn />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
