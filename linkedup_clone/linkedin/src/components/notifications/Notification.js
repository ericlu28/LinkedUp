import { useState, useEffect, useRef, useContext, useCallback } from "react";

import * as firebaseService from "../../services/firebase";

import Context from "../../context";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const { user } = useContext(Context);

  const notificationsRef = useRef(
    firebaseService.getRef(`notifications/${user.id}`)
  );

  const onNotificationsLoaded = useCallback((val) => {
    if (val) {
      const keys = Object.keys(val);
      const data = keys.map((key) => val[key]);
      setNotifications(data);
    }
  }, []);

  const getNotifications = useCallback(() => {
    if (user) {
      firebaseService.getDataRealtime(notificationsRef, onNotificationsLoaded);
    }
  }, [user, onNotificationsLoaded]);

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user, getNotifications]);

  if (!user) return <></>;

  return (
    <div className="notification">
      <div className="notification__content">
        <div className="notification__left"></div>
        <div className="notification__right">
          <h3>Notifications</h3>
          {notifications?.map((notification) => (
            <div
              className="notification__request"
              key={notification.notificationId}
            >
              <div className="notification__request-left">
                <img
                  src={notification.notificationImage}
                  alt={notification.notificationId}
                />
                <div className="notification__request-info">
                  <p>{notification.notificationTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;