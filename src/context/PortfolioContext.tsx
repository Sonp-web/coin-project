import { createContext, type ReactNode } from "react";
import {
  selectPortfolio,
  type PortfolioCoinType,
} from "../redux/slices/portfolioSlice";
import { selectCoins } from "../redux/slices/coinsSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadCoinList } from "../services/coinApi";
type PortfolioProviderProps = {
  children: ReactNode;
};

type PortfolioContextType = {
  updatePortfolioCoins: (PortfolioCoinType & {
    actualInfoCoin: number;
    name: string;
    symbol: string;
  })[];
  value: number;
  finalValue: number;
  profit: number;
  profitPercent: number;
};

export const PortfolioContext = createContext<PortfolioContextType | null>(
  null,
);

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const portfolioCoins = useSelector(selectPortfolio);
  const coins = useSelector(selectCoins);

  const [updatePortfolioCoins, setUpdatePortfolioCoins] = useState<
    (PortfolioCoinType & {
      actualInfoCoin: number;
      name: string;
      symbol: string;
    })[]
  >([]);
  useEffect(() => {
    const loadPortfolio = async () => {
      const result = await Promise.all(
        portfolioCoins.map(async (item) => {
          const actualCoin = coins.find((coin) => coin.id === item.id);

          if (actualCoin) {
            return {
              ...item,
              actualInfoCoin: actualCoin.current_price,
              name: actualCoin.name,
              symbol: actualCoin.symbol,
            };
          }

          const result = await loadCoinList({ id: item.id });

          return {
            ...item,
            actualInfoCoin: result[0].current_price,
            name: result[0].name,
            symbol: result[0].symbol,
          };
        }),
      );

      setUpdatePortfolioCoins(result);
    };

    loadPortfolio();
  }, [coins, portfolioCoins]);
  const value = updatePortfolioCoins.reduce((acc, item) => {
    return acc + item.count * item.buyingPrice;
  }, 0);

  const finalValue = +updatePortfolioCoins
    .reduce((acc, item) => {
      return acc + item.count * item.actualInfoCoin;
    }, 0)
    .toFixed(2);

  const profit = finalValue - value;
  const profitPercent = value != 0 ? (profit / value) * 100 : 0;
  return (
    <PortfolioContext.Provider
      value={{
        updatePortfolioCoins,
        value,
        finalValue,
        profit,
        profitPercent,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
