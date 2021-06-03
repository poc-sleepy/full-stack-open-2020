import React from 'react';
import { useSelector } from 'react-redux';

type RootState = {
  notification: string;
};

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === '') {
    return <></>;
  } else {
    return <div style={style}>{notification}</div>;
  }
};

export { Notification };
