import { useContext, useState, useEffect, useCallback } from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";

import withModal from "../common/Modal";
import Search from "../search/Search";

import Context from "../../context";

const Header = ({ toggleModal }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const { user, setUser, cometChat } = useContext(Context);

  const history = useNavigate();
  const location = useLocation();

  const increaseUnreadMessageCount = useCallback(() => {
    if (location.pathname !== '/chat') {
      setUnreadMessageCount((prevCount) => prevCount + 1);
    }
  }, [location]);

  const addMessageListener = useCallback(() => {
    if (!user || !cometChat) return;
    cometChat.addMessageListener(
      user.id,
      new cometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          increaseUnreadMessageCount();
        },
        onMediaMessageReceived: (mediaMessage) => {
          increaseUnreadMessageCount();
        },
        onCustomMessageReceived: (customMessage) => {
          increaseUnreadMessageCount();
        },
      })
    );
  }, [user, cometChat, increaseUnreadMessageCount]);

  const transformUnreadMessageCount = useCallback((unreadMessageCount) => {
    const keys = Object.keys(unreadMessageCount);
    let totalUnreadMessageCount = 0;
    for (const key of keys) {
      totalUnreadMessageCount =
        totalUnreadMessageCount + unreadMessageCount[key];
    }
    return totalUnreadMessageCount;
  }, []);

  const getUnreadMessageCount = useCallback(async () => {
    if (!user || !cometChat) return;
    const unreadMessageCount =
      await cometChat.getUnreadMessageCountForAllUsers();
    setUnreadMessageCount(transformUnreadMessageCount(unreadMessageCount));
  }, [user, cometChat, transformUnreadMessageCount]);

  useEffect(() => {
    if (user && cometChat) {
      addMessageListener();
      getUnreadMessageCount();
    }
    return () => {
      if (user && cometChat) {
        cometChat.removeMessageListener(user.id);
      }
    };
  }, [user, cometChat, addMessageListener, getUnreadMessageCount]);

  const showSearchModal = () => {
    toggleModal(true);
  };

  const logout = async () => {
    const isLogout = window.confirm("Do you want to log out ?");
    if (isLogout) {
      await cometChat.logout();
      removeAuthedInfo();
      history.push("/login");
    }
  };

  const removeAuthedInfo = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  const go = (route) => async () => {
    history.push(route);
  };

  const profile = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    if (window.location.href.includes("/profile")) {
      window.location.reload();
    } else {
      go("/profile")();
    }
  };

  if (!user) return <></>;

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            style={{ color: "#0b65c2" }}
            onClick={go("/")}
          >
            <title>LinkedIn</title>

            <g>
              <path
                d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <div className="header__search-icon" onClick={showSearchModal}>
            Search
          </div>
        </div>
        <div className="header__rigth">
          <div className="menu">
            <div className="menu__item" onClick={go("/")}>
              <span>Home</span>
            </div>
            <div className="menu__item" onClick={go("/my-network")}>
              <span>My Network</span>
            </div>
            <div className="menu__item" onClick={go("/jobs")}>
              <span>Jobs</span>
            </div>
            <div className="menu__item" onClick={go("/chat")}>
              <span>Messaging</span>
              {unreadMessageCount ? (
                <span className="menu__unread-message-count">
                  {unreadMessageCount}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="menu__item" onClick={go("/notifications")}>
              <span>Notifications</span>
            </div>
            <div className="menu__item" onClick={logout}>
              <span>Logout</span>
            </div>
            <div className="menu__item" onClick={profile}>
              <img src={user.image} alt={user.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withModal(Search)(Header);