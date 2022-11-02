import Header from "./Header";
import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [userName, setUserName] = useState(null);
  let history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName }),
      });
      const json = await res.json();
      if (!res.ok) {
        // If user doesn't exist
        alert("Your name does not match one of our users, please try again.")
        throw Error(res.statusText);
      } else {
        // If name is in user data
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("name", json.data.name);
        sessionStorage.setItem("friends", json.data.friends);
        sessionStorage.setItem("id", json.data.id);
        console.log(sessionStorage.getItem("friends"))
        history.push(`/`);
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <StyledSignIn>
        <Header />
        <div className="form-background">
          <form onSubmit={submitForm}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your first name"
              className="name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
            <input type="submit" value="Submit" class="submit-btn" />
          </form>
        </div>
      </StyledSignIn>
    </>
  );
};

const StyledSignIn = styled.div`
  background-image: url("/images/facespace_bg.jpg");
  height: (100vh);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .form-background {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: rgb(255, 255, 255, 0.3);
      padding: 40px;
      border-radius: 10px;

      .name {
        border-radius: 5px;
        font-size: 1.2em;
        padding: 5px;
      }

      .submit-btn {
        background-color: var(--accent-bg-color);
        color: white;
        border: none;
        font-size: 1.7em;
        font-family: "Teko", sans-serif;
        padding: 3px 0 0 0;
        border-radius: 5px;
      }
    }
  }
`;

export default SignIn;
