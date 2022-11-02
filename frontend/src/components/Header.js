import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  let pathname = window.location.pathname;

  return (
    <StyledHeader>
      <NavLink to="/" className={"link"}>
        <h1 className="header-title">FrogSpace</h1>
      </NavLink>
      {pathname !== "/signin" && // If not on the sign in page
        (sessionStorage.getItem("loggedIn") ? (
          <h2>Greetings {sessionStorage.getItem("name")}</h2> // Return if logged in
        ) : (
          <NavLink to="/signin" className={"link"}>
            <h2>Sign In</h2>
          </NavLink>
        ))}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  height: 50px;
  background-color: var(--accent-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .link {
    text-decoration: none;
  }

  .header-title {
    font-size: 2.2em;
    color: white;
  }

  h2 {
    font-size: 1.4em;
    color: white;
    margin-right: 10px;
  }
`;

export default Header;
