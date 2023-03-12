import { iNotification } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export const notificationSuccess: iNotification = {
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated animate__slideInRight"],
  animationOut: ["animate__animated animate__slideOutUp"],
  dismiss: {
    duration: 2000,
  },
};

export const notificationError: iNotification = {
  type: "warning",
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated animate__slideInRight"],
  animationOut: ["animate__animated animate__slideOutUp"],
  dismiss: {
    duration: 2000,
  },
};
