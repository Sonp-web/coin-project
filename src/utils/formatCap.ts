import { formatPrice } from "./formatPrice";

export const formatCap = (
  number: number,
  withSign: boolean = false,
): string => {
  let isMinus = " ";
  if (number < 0) {
    isMinus = "- ";
    number /= -1;
  } else if (number > 0 && withSign) {
    isMinus = "+";
  }
  switch (true) {
    case number >= 1000000000000:
      return (
        isMinus +
        ((number / 1000000000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " трлн")
      );
    case number >= 1000000000:
      return (
        isMinus +
        ((number / 1000000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " млрд")
      );
    case number >= 1000000:
      return (
        isMinus +
        ((number / 1000000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " млн")
      );
    case number >= 1000:
      return (
        isMinus +
        ((number / 1000).toLocaleString("ru-Ru", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " тыс")
      );
  }
  return formatPrice(number) + "";
};
