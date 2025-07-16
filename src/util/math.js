export const roundTwoDecimals = (number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

export function numberToString(number) {
  if (number >= 1000000000)
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  if (number >= 1000000)
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (number >= 1000)
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return number.toString();
}
