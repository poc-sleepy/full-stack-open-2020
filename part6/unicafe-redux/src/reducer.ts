const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const counterReducer = (state = initialState, action: { type: any }) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      return state;
    case 'OK':
      return state;
    case 'BAD':
      return state;
    case 'ZERO':
      return state;
    default:
      return state;
  }
};

export default counterReducer;
