import { useSelector } from "react-redux";
import { PortfolioTable } from "./PortfolioTable/PortfolioTable";
import "./style.css";
import {
  selectPortfolio,
  type PortfolioCoinType,
} from "../../redux/slices/portfolioSlice";
import { selectCoins } from "../../redux/slices/coinsSlice";
import { useEffect, useState } from "react";
import { loadCoinList } from "../../services/coinApi";
type PortfolioModalType = {
  closePortfolioModal: () => void;
};
export const PortfolioModal: React.FC<PortfolioModalType> = ({
  closePortfolioModal,
}) => {
  const portfolioCoins = useSelector(selectPortfolio);
  const coins = useSelector(selectCoins);
  const [updatePortfolioCoins, setUpdatePortfolioCoins] = useState<
    (PortfolioCoinType & { actualInfoCoin: number })[]
  >([]);

  useEffect(() => {
    const loadPortfolio = async () => {
      const result = await Promise.all(
        portfolioCoins.map(async (item) => {
          const actualCoin = coins.find((coin) => coin.id === item.id);
          if (actualCoin) {
            return { ...item, actualInfoCoin: actualCoin.current_price };
          } else {
            try {
              const result = await loadCoinList({ id: item.id });

              return { ...item, actualInfoCoin: result[0].current_price };
            } catch (e) {
              const error = e as Error;
              console.log(error.message);
              throw error;
            }
          }
        }),
      );
      setUpdatePortfolioCoins(result);
    };

    loadPortfolio();
  }, [coins, portfolioCoins]);
 
  const value = updatePortfolioCoins.reduce((acc, item) => {
    return acc + item.count * item.buyingPrice;
  }, 0);
  const finalValue = updatePortfolioCoins.reduce((acc, item) => {
    return acc + item.count * item.actualInfoCoin;
  }, 0);
  const profit = finalValue - value;
  return (
    <div className="modal-overlay" onClick={closePortfolioModal}>
      <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="portfolio-modal-title">Портфель</h3>
        <PortfolioTable
          coins={updatePortfolioCoins}
          closePortfolioModal={closePortfolioModal}
        />
        <div className="portfolio-modal-info">
          Вложил: <span className="portfolio-modal-value">{value} $</span>
          Стоит сейчас:
          <span className="portfolio-modal-value">{finalValue} $</span>
          Прибыль:<span className="portfolio-modal-value">{profit} $</span>
        </div>
      </div>
    </div>
  );
};
