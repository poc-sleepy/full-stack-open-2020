import React from 'react';

const style = {
  border: 'solid',
};

type PropsNotification = {
  notification: string;
};

export const Notification = ({ notification }: PropsNotification) => {
  if (notification === '') return <></>;

  return <div style={style}>{notification}</div>;
};
