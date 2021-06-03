export const notificationReducer = (
  state = 'initial Notification.',
  action: { type: string; message: string }
) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET':
      return action.message;
    case 'UNSET':
      return '';
    default:
      break;
  }
  return state;
};

export const setNotification = (content: string) => {
  return { type: 'SET', message: content };
};

export const unsetNotification = () => {
  return { type: 'UNSET' };
};
