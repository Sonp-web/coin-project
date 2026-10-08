export const formatNumber = (number: number): string => {
  if (number) {
    const temp = number > 0 ? " +" : " ";
    return (
      temp +
      number.toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  return "0";
};
