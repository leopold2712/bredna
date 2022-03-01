export const getShares = () => {
  const shares = [];
  for (let i = 0; i <= 90; i += 5) {
    shares.push({
      value: i.toString(),
      label: `${i}%`,
    });
  }
  return shares;
};
