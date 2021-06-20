import React from 'react';
import { connect } from 'react-redux';

type RootState = {
  notification: {
    message: string;
    timeoutId?: number;
  };
};

const Notification = (props: RootState) => {
  const notification = props.notification.message;

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

const mapStateToProps = (state: RootState) => {
  return state;
};

export const ConnectedNotification = connect(mapStateToProps)(Notification);
