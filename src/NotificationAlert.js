import React, { useEffect, useState } from "react";

import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";

const NotificationAlert = ({ isOnline }) => {
  const [prevStatus, setPrevStatus] = useState(false);
  const [lastNotifValue, setLastNotifValue] = useState(false);

  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    // handle same status updates due to other dependencies
    if (prevStatus === isOnline) {
      return () => {};
    }

    setPrevStatus(isOnline);

    // notification handling using debounce methodology
    const showNotification = (isOnline, timeout) => {
      clearNotification();

      const t = setTimeout(() => {
        NotificationManager.info(isOnline ? "Online" : "Offline");
        setLastNotifValue(isOnline);
      }, timeout);

      setTimeoutId(t);
    };

    const clearNotification = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(0);
      }
    };

    if (isOnline && lastNotifValue === isOnline) {
      // clear notifications when duplicate invokation is detected
      clearNotification();
    } else {
      // debounce with timeout 2 seconds for interruptions
      // immediate invokation for reconnections (0 seconds)
      showNotification(isOnline, !isOnline ? 2000 : 0);
    }
  }, [isOnline, prevStatus, lastNotifValue, timeoutId]);

  return (
    <div className={isOnline ? "online" : "offline"}>
      {isOnline ? "Online" : "Offline"}
      <NotificationContainer />
    </div>
  );
};

export default NotificationAlert;
