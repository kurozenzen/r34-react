export default function format(numberString) {
  const number = Number(numberString);

  if (number >= 1e6) {
    return `~${(number / 1e6).toFixed(0)}M`;
  }

  if (number >= 1e3) {
    return `~${(number / 1e3).toFixed(0)}K`;
  }

  return number;
}
