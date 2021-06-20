import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const Filter = (props: PropsFromRedux) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilter(event.currentTarget.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ConnectedFilter = connector(Filter);
