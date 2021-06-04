export const notificationReducer = (
  state = '',
  action: { type: string; message: string }
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      break;
  }
  return state;
};

export const setNotification = (content: string) => {
  return { type: 'SET_NOTIFICATION', message: content };
};

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};
