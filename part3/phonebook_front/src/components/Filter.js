import React from 'react';

const Filter = ({ query, onChange }) => {
  return (
    <>
      filter shown with <input value={query} onChange={onChange} />
    </>
  );
};

export default Filter;
