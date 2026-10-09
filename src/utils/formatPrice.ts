export const formatPrice = (
  number: number,
  withSign: boolean = false,
): string => {
  if (number >= 1 || number <= -1) {
    return number.toLocaleString("ru-Ru", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: withSign ? "exceptZero" : "auto",
    });
  }
  return number.toLocaleString("ru-Ru", {
    maximumSignificantDigits: 4,
    signDisplay: withSign ? "exceptZero" : "auto",
  });
};
