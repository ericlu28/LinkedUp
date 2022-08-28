import { useState, useEffect, useRef, useCallback } from "react";
//import { useHistory } from "react-router";
import { useNavigate } from "react-router";

import * as firebaseService from "../../services/firebase";

const Search = ({ toggleModal }) => {
  const [keywords, setKeywords] = useState();
  const [users, setUsers] = useState();

  const usersRef = useRef(firebaseService.getRef("users"));

  const history = useNavigate();

  const searchUsers = useCallback(() => {
    firebaseService.getDataRealtimeQuery({
      ref: usersRef,
      query: "fullname",
      criteria: keywords,
      callback: onUsersLoaded,
    });
  }, [keywords]);

  const onUsersLoaded = (val) => {
    if (val) {
      const keys = Object.keys(val);
      const data = keys.map((key) => val[key]);
      setUsers(() => data);
    }
  };

  useEffect(() => {
    if (keywords) {
      searchUsers();
    }
  }, [keywords, searchUsers]);

  const onSearchChanged = (e) => {
    const keywords = e.target.value;
    if (keywords) {
      setKeywords(keywords);
    }
  };

  const profile = (user) => () => {
    toggleModal(false);
    localStorage.setItem("profile", JSON.stringify(user));
    if (window.location.href.includes("/profile")) {
      window.location.reload();
    } else {
      history.push("/profile");
    }
  };

  return (
    <div className="search">
      <div className="search__content">
        <div className="search__container">
          <div className="search__title">Search</div>
          <div className="search__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
          </div>
        </div>
        <div className="search__subtitle"></div>
        <div className="search__form">
          <input placeholder="Search" onChange={onSearchChanged} />
          <div className="search__users">
            {users?.map((user) => (
              <div
                className="search__user"
                onClick={profile(user)}
                key={user.id}
              >
                <img src={user.image} alt="user" />
                <span>{user.fullname}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;