export const formatPrice = (number: number): string => {
  if (number >= 1) {
    return number.toLocaleString("ru-Ru", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return number.toLocaleString("ru-Ru", {
    maximumSignificantDigits: 4,
  });
};
