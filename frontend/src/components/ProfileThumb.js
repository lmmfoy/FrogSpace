import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileThumb = ({ id, isFriend }) => {
  const [thumbDetails, setThumbDetails] = useState({});
  let history = useHistory();

  const handleThumbClick = () => {
    history.push(`/api/users/${id}`);
  };

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setThumbDetails(data.data);
      });
  }, [id]);

  return (
    <>
      <StyledThumb onClick={handleThumbClick}>
        <img
          src={thumbDetails.avatarUrl}
          alt="profile thumbnail"
          className={isFriend ? "is-friend" : "mortal-enemy"}
        />
        <p className={`name ${isFriend ? "is-friend" : "mortal-enemy"}`}>
          {thumbDetails.name}
        </p>
      </StyledThumb>
    </>
  );
};

const StyledThumb = styled.div`
  position: relative;

  img {
    max-width: 130px;
    min-width: 100px;
    width: 100%;
    border-radius: 5px;
  }

  img:hover {
    box-shadow: var(--shadow-color) 0px 0px 9px 0px;
  }

  .name {
    position: absolute;
    width: 60px;
    bottom: -4px;
    left: -4px;
    font-size: 1em;
    background-color: pink;
    color: var(--primary-color);
    padding: 1px;
  }

  .is-friend {
    box-shadow: 0 0 5px 0px #fff, 0 0 15px 0px var(--shadow-color);
  }

  .is-friend:hover {
    box-shadow: 0 0 12px 2px var(--shadow-color);
  }

  .mortal-enemy {
    opacity: 40%;
  }
`;
export default ProfileThumb;
