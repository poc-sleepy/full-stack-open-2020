export const notificationReducer = (
  state = '',
  action: { type: string; message: string }
) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET':
      return action.message;
    case 'CLEAR':
      return '';
    default:
      break;
  }
  return state;
};

export const setNotification = (content: string) => {
  return { type: 'SET', message: content };
};

export const clearNotification = () => {
  return { type: 'CLEAR' };
};
