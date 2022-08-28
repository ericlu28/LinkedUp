import * as firebaseService from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const addNotification = async ({ userId, image, message }) => {
  if (!userId) return;
  const notifications = await getNotifications(userId);
  const newNotification = buildNotification(image, message);
  const updatedNotifications = notifications
    ? [...notifications, newNotification]
    : [newNotification];
  firebaseService.insert({
    key: "notifications",
    id: userId,
    payload: updatedNotifications,
  });
};

const getNotifications = async (userId) => {
  if (!userId) return;
  return await firebaseService.getData(`notifications/${userId}`);
};

const buildNotification = (image, message) => ({
  notificationId: uuidv4(),
  notificationImage: image,
  notificationTitle: message,
});