import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import * as firebaseService from "../../services/firebase";
import * as requestService from "../../services/requests";
import * as notificationService from "../../services/notifications";

import * as constants from "../../constants";

import Context from "../../context";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [request, setRequest] = useState(null);

  const requestsRef = useRef(firebaseService.getRef("requests"));

  const { user } = useContext(Context);

  const loadProfile = useCallback(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setProfile(profile);
  }, []);

  const onConnectSenderLoaded = useCallback(
    (val) => {
      if (val) {
        const keys = Object.keys(val);
        const data = keys.map((key) => val[key]);
        if (data && data.length && user && profile) {
          setRequest(
            data.find(
              (request) =>
                request.senderId === user.id &&
                request.receiverId === profile.id
            )
          );
        }
      }
    },
    [user, profile]
  );

  const onConnectReceiverLoaded = useCallback(
    (val) => {
      if (val) {
        const keys = Object.keys(val);
        const data = keys.map((key) => val[key]);
        if (data && data.length && user && profile) {
          setRequest(
            data.find(
              (request) =>
                request.senderId === profile.id &&
                request.receiverId === user.id
            )
          );
        }
      }
    },
    [user, profile]
  );

  const getConnectStatus = useCallback(() => {
    if (user) {
      firebaseService.getDataRealtimeQuery({
        ref: requestsRef,
        query: "senderId",
        criteria: user.id,
        callback: onConnectSenderLoaded,
      });
      firebaseService.getDataRealtimeQuery({
        ref: requestsRef,
        query: "receiverId",
        criteria: user.id,
        callback: onConnectReceiverLoaded,
      });
    }
  }, [user, onConnectSenderLoaded, onConnectReceiverLoaded]);

  useEffect(() => {
    loadProfile();
    getConnectStatus();
  }, [loadProfile, getConnectStatus]);

  const connect = async () => {
    if (!profile || !user) return;
    const request = buildConnectRequest();
    await firebaseService.insert({
      key: "requests",
      id: request.id,
      payload: request,
    });
    await notificationService.addNotification({
      userId: profile.id,
      image: user.image,
      message: `${user.fullname} wants to connect with you`,
    });
    alert("Your request was sent succesfully");
  };

  const buildConnectRequest = () => ({
    id: uuidv4(),
    sender: user,
    receiver: profile,
    senderId: user.id,
    receiverId: profile.id,
    status: constants.WAITING,
  });

  if (!profile || !user) return <></>;

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__left">
          <div className="profile__main">
            <div className="profile__background">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 552 138"
                id="person-default"
                data-supported-dps="2048x512"
              >
                <path fill="none" d="M0 0h552v138H0z" />
                <path fill="#d9e5e7" d="M0 0h552v138H0z" />
                <path fill="#bfd3d6" d="M380 0h172v138H380z" />
                <path
                  d="M333.22 0H0v138h333.22a207.93 207.93 0 000-138z"
                  fill="#a0b4b7"
                />
              </svg>
            </div>
            <div className="profile__description">
              <p>{profile.fullname}</p>
              <p>{profile.job}</p>
              {profile.id !== user.id && !request && (
                <button onClick={connect}>Connect</button>
              )}
              {profile.id !== user.id &&
                request &&
                request.receiverId === user.id &&
                request.status === constants.WAITING && (
                  <div className="profile__actions">
                    <button
                      onClick={requestService.updateRequestStatus(
                        request,
                        constants.ACCEPTED
                      )}
                    >
                      Accept
                    </button>
                    <button
                      onClick={requestService.updateRequestStatus(
                        request,
                        constants.REJECTED
                      )}
                    >
                      Reject
                    </button>
                  </div>
                )}
            </div>
            <img
              className="profile__avatar"
              src={profile.image}
              alt="profile"
            />
          </div>
          <div className="profile__about">
            <h3>About</h3>
            <p>{profile.about}</p>
          </div>
        </div>
        <div className="profile__right"></div>
      </div>
    </div>
  );
};

export default Profile;