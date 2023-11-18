export const capitalize = (str: string) => {
  const firstLetter = str[0].toUpperCase();
  let result = '';
  for (let i = 1; i < str.length; i++) {
    result += str[i];
  }
  return firstLetter + result;
};

// Returns a + if the number is positive
export const numIsPos = (num: number): string => num >= 0 ? `+${num}` : `${num}`;

export const getNumberFromSize = (size: string): number => {
  switch (size.toLowerCase()) {
  case 'tiny':
    return 1;
  case 'small':
    return 1;
  case 'medium':
    return 1;
  case 'large':
    return 2;
  case 'huge':
    return 3;
  case 'gargantuan':
    return 4;
  default:
    return 1;
  }
};
