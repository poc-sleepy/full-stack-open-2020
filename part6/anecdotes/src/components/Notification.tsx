import React from 'react';
import { connect } from 'react-redux';

type RootState = {
  notification: string;
};

const Notification = (props: RootState) => {
  const notification = props.notification;

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
