const filterReducer = (
  state = 'ALL',
  action: { type: string; filter: string }
) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const filterChange = (filter: string) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export { filterReducer };
