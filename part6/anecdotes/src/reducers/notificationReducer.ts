import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

type RootState = {
  notification: State;
};

type State = {
  message: string;
  timeoutId?: number;
};

export const notificationReducer = (
  state: State = {
    message: '',
  },
  action: { type: string; data: State }
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return { message: '' };
    default:
      break;
  }
  return state;
};

export const setNotification = (
  message: string,
  second: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    //HACK: getState().notificationでreducerの独立性が崩壊している
    const currentTimeoutId = getState().notification.timeoutId;
    clearTimeout(currentTimeoutId);

    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, second * 1000);

    console.log(currentTimeoutId, timeoutId);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timeoutId },
    });
  };
};

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};
