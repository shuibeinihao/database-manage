export const isJson = (str) => {
  if (typeof str === 'string') {
    try {
      const obj = eval('(' + str + ')');
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};
