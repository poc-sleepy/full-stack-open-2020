const palindrome = (string: string): string => {
  return string.split('').reverse().join('');
};

const average = (array: number[]): number => {
  const reducer = (sum: number, item: number) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

export { palindrome, average };
