import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "react-router-dom"

import Header from "./components/common/Header";
import Home from "./components/home/Home";
import Loading from "./components/common/Loading";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Jobs from "./components/jobs/Jobs";
import MyNetwork from "./components/my-network/MyNetwork";
import Notification from "./components/notifications/Notification";
import Chat from "./components/chat/Chat";
import PrivateRoute from "./components/common/PrivateRoute";

import Context from "./context";

import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [cometChat, setCometChat] = useState(null);

  const context = {
    user,
    setUser,
    cometChat,
    setCometChat,
  };

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem("auth");
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  const initCometChat = async () => {
    const { CometChat } = await import("@cometchat-pro/chat");
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      (error) => {}
    );
  };

  useEffect(() => {
    initAuthUser();
    initCometChat();
  }, []);

  return (
    <Context.Provider value={context}>
      <Router>
        <Header />
        <Routes>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/jobs" component={Jobs} />
          <PrivateRoute exact path="/my-network" component={MyNetwork} />
          <PrivateRoute exact path="/notifications" component={Notification} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Routes>
      </Router>
      <Loading />
    </Context.Provider>
  );
}

export default App;