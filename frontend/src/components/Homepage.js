import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileThumb from "./ProfileThumb.js";

const Homepage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(users);

  return (
    <>
      <Header />
      <StyledHomepageBody>
        <h1>FrogSpace members</h1>
        <div className="profiles">
          {users.map((user) => {
            return (
              <ProfileThumb
                id={user.id}
                isFriend={
                  sessionStorage.getItem("friends")
                    ? sessionStorage
                        .getItem("friends")
                        .split(",")
                        .includes(user.id)
                    : false
                } // Check to see if user is in signed-in user's friend list
              />
            );
          })}
        </div>
      </StyledHomepageBody>
    </>
  );
};

const StyledHomepageBody = styled.div`
  margin: 30px 100px;

  h1 {
    font-size: 2em;
    margin: 50px 0px 30px;
  }

  .profiles {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
`;

export default Homepage;
