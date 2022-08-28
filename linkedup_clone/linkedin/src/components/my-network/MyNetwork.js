import { useState, useEffect, useRef, useContext, useCallback } from "react";

import * as firebaseService from "../../services/firebase";
import * as requestService from "../../services/requests";

import * as constants from "../../constants";

import Context from "../../context";

const MyNetwork = () => {
  const [requests, setRequests] = useState([]);

  const requestsRef = useRef(firebaseService.getRef("requests"));

  const { user } = useContext(Context);

  const onWaitingRequestsLoaded = useCallback((val) => {
    if (val) {
      const keys = Object.keys(val);
      const data = keys.map((key) => val[key]);
      setRequests(transformRequests(data));
    }
  }, []);

  const getWaitingRequests = useCallback(() => {
    if (user) {
      firebaseService.getDataRealtimeQuery({
        ref: requestsRef,
        query: "receiverId",
        criteria: user.id,
        callback: onWaitingRequestsLoaded,
      });
    }
  }, [user, onWaitingRequestsLoaded]);

  const transformRequests = (data) => {
    if (!data || !data.length) return [];
    return data.filter((request) => request.status === constants.WAITING);
  };

  useEffect(() => {
    if (user) {
      getWaitingRequests();
    }
  }, [user, getWaitingRequests]);

  if (!user) return <></>;

  return (
    <div className="network">
      <div className="network__content">
        <div className="network__left"></div>
        <div className="network__right">
          <h3>Invitations</h3>
          {requests?.map((request) => (
            <div className="network__request" key={request.id}>
              <div className="network__request-left">
                <img src={request.sender.image} alt={request.sender.email} />
                <div className="network__request-info">
                  <p>{request.sender.fullname}</p>
                  <p>{request.sender.job}</p>
                </div>
              </div>
              <div className="network__request-right">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNetwork;