import React from 'react';

// eslint-disable-next-line react/prop-types
const Filter = ({ query, onChange }) => {
  return (
    <>
      filter shown with <input value={query} onChange={onChange} />
    </>
  );
};

export default Filter;
