import React, { useState } from "react";

import NotificationAlert from "./NotificationAlert";
import OnlineStatusMock from "./OnlineStatusMock";

// styles
import "react-notifications/lib/notifications.css";
import "./App.css";

const App = () => {
  const [isOnline, setIsOnline] = useState(false);

  const onIsOnlineChange = (isOnline) => {
    setIsOnline(isOnline);
  };

  return (
    <>
      <OnlineStatusMock onIsOnlineChange={onIsOnlineChange} />
      <NotificationAlert isOnline={isOnline} />
    </>
  );
};

export default App;
