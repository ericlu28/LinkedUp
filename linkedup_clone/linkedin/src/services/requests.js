import * as cometChatService from "./cometchat";
import * as constants from "../constants";
import * as firebaseService from "./firebase";
import * as notificationService from "./notifications";

export const updateRequestStatus = (request, status) => async () => {
  const updatedRequest = {
    ...request,
    sender: request.sender,
    receiver: request.receiver,
    status,
  };
  await firebaseService.insert({
    key: "requests",
    id: updatedRequest.id,
    payload: updatedRequest,
  });
  if (status === constants.ACCEPTED) {
    await notificationService.addNotification({
      userId: request.senderId,
      image: request.sender.image,
      message: `${request.receiver.fullname} accepted your connect request`,
    });
    await cometChatService.createFriend(request.receiverId, request.senderId);
    alert("request was accepted successfully");
  } else if (status === constants.REJECTED) {
    alert("request was rejected successfully");
  }
};