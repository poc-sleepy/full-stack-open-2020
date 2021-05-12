import React from 'react';

const Notification = ({ message }: { message: string }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
