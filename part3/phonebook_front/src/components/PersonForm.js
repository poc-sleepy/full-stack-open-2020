import React from 'react';

const PersonForm = ({
  onSubmit,
  newName,
  newNameOnChange,
  newNumber,
  newNumberOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={newNameOnChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={newNumberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
