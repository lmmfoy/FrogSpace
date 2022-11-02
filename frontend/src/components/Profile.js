import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import ProfileThumb from "./ProfileThumb";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data.data);
      })
      .then(() => {
        setLoaded(true);
      });
  }, [id]); // or window.location.pathname

  console.log(userDetails);
  console.log(sessionStorage.getItem("friends"));

  return (
    <>
      <Header />
      <StyledBackground />
      <StyledProfile>
        <div className="user-info">
          <img className="avatar" src={userDetails.avatarUrl} alt="avatar" />
          <h1 className="username">{userDetails.name}</h1>
        </div>
        <div>
          <h2 className="friends-title">{userDetails.name}'s friends</h2>
          {/* If profile details are loaded, map through the profile user's friends and add thumbnails*/}
          {loaded && (
            <div className="friends">
              {userDetails.friends.map((friend) => {
                console.log(friend);
                return (
                  <ProfileThumb
                    id={friend}
                    isFriend={
                      sessionStorage.getItem("friends")
                        ? sessionStorage
                            .getItem("friends")
                            .split(",")
                            .includes(friend)
                        : false
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </StyledProfile>
    </>
  );
};

const StyledBackground = styled.div`
  background-image: url("/images/facespace_bg.jpg");
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledProfile = styled.div`
  margin: -100px 250px 0px;
  display: flex;
  flex-direction: column;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    display: flex;
    height: 300px;
  }

  .avatar {
    max-width: 300px;
    min-width: 200px;
    width: 100%;
    border-radius: 10px;
  }

  .username {
    margin: 0px 0px 0px 20px;
    font-size: 2em;
  }

  .friends-title {
    border-bottom: 3px solid var(--primary-color);
    margin-bottom: 30px;
    width: 100%;
    min-width: 360px;
  }

  .friends {
    display: flex;
    gap: 20px;
  }
`;

export default Profile;
