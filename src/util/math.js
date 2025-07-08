export const roundTwoDecimals = (number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;
