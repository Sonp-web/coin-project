export const formatCap = (number: number): string => {
  switch (true) {
    case number >= 1000000000000:
      return (
        (number / 1000000000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " трлн"
      );
    case number >= 1000000000:
      return (
        (number / 1000000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " млрд"
      );
    case number >= 1000000:
      return (
        (number / 1000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " млн"
      );
    case number >= 1000:
      return (
        (number / 1000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " тыс"
      );
  }
  return number + "";
};
