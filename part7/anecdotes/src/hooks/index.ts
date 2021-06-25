import React, { useState } from 'react';

export const useField = (
  type: string
): [typeof attributes, typeof handlers] => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue('');
  };

  const attributes = {
    type,
    value,
    onChange,
  };

  const handlers = {
    clear,
  };

  return [attributes, handlers];
};
