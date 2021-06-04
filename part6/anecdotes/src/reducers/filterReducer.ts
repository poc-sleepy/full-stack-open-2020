export const filterReducer = (
  state = '',
  action: { type: string; query: string }
) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.query;
    default:
      return state;
  }
};

export const setFilter = (query: string) => {
  return { type: 'SET_FILTER', query };
};
