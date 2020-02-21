/* eslint-disable import/prefer-default-export */
export function trim(str: string, maxLen: number = 20) {
  if (str.length < maxLen) {
    return {shortStr: str, formattedStr: str};
  }

  const newStr = str.substr(0, maxLen);
  return {shortStr: newStr, formattedStr: `${newStr}...`};
}
