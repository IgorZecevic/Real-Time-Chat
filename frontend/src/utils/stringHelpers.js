export const getFirstCharUppercase = (inputString) => {
  if (!inputString || typeof inputString !== 'string') return '';
  return inputString.substring(0, 1).toUpperCase();
};
