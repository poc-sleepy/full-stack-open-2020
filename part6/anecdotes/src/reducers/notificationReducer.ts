import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

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

export const setNotification = (
  content: string,
  second: number
): ThunkAction<void, string, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', message: content });
    setTimeout(() => {
      dispatch(clearNotification());
    }, second * 1000);
  };
};

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};
