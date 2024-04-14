export type wordForms = {
  oneTime: string;
  twoTimes: string;
  fiveTimes: string;
};

export const pluralize = (wordNumber: number, wordPlurals: wordForms) => {
  const lastDigits = Math.abs(wordNumber) % 100;
  if (lastDigits >= 5 && lastDigits <= 20) {
    return wordPlurals.fiveTimes;
  }
  const lastDigit = lastDigits % 10;
  if (lastDigit === 1) {
    return wordPlurals.oneTime;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return wordPlurals.twoTimes;
  }
  return wordPlurals.fiveTimes;
};
