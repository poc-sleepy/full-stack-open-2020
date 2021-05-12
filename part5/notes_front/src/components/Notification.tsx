import React from 'react';

type Props = {
  message: string | null;
};

const Notification: React.FC<Props> = ({ message }) => {
  if (message === null) {
    return <></>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
