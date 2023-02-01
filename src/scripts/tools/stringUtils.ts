export const capitalize = (str: string) => {
  const firstLetter = str[0].toUpperCase();
  let result = '';
  for (let i = 1; i < str.length; i++) {
    result += str[i];
  }
  return firstLetter + result;
};
