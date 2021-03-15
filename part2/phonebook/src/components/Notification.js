import React from 'react';

const Notification = ({ message, className, styleAdd }) => {
  const notificationStyle = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const style = { ...notificationStyle, ...styleAdd };

  if (message === null) {
    return null;
  }

  return (
    <div className={className} style={style}>
      {message}
    </div>
  );
};

const InfoNotification = ({ message }) => {
  const style = {
    backgroundColor: '#B2DFDB',
    color: '#009688',
  };
  return <Notification message={message} className='info' styleAdd={style} />;
};

const ErrorNotification = ({ message }) => {
  const style = {
    backgroundColor: '#ffebee',
    color: '#f44336',
  };
  return <Notification message={message} className='error' styleAdd={style} />;
};

export { InfoNotification, ErrorNotification };
