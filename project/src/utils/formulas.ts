export const getRoundedRate = (rating: number): number => {
  const diff = rating - Math.trunc(rating);
  return diff >= 0.5 ? Math.ceil(rating) : Math.floor(rating);
};
