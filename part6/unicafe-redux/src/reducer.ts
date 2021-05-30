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
      return { ...state, good: state.good + 1 };
    case 'OK':
      return { ...state, ok: state.ok + 1 };
    case 'BAD':
      return { ...state, bad: state.bad + 1 };
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
