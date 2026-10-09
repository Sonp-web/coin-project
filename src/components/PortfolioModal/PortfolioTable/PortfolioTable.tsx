import { PortfolioRow } from "./PortfolioRow";
import "./PortfolioTable.css";
import { type PortfolioCoinType } from "../../../redux/slices/portfolioSlice";

type PortfolioTableType = {
  coins: (PortfolioCoinType & {
    actualInfoCoin: number;
    name: string;
    symbol: string;
  })[];
  closePortfolioModal: () => void;
};
export const PortfolioTable: React.FC<PortfolioTableType> = ({
  coins,
  closePortfolioModal,
}) => {
  return (
    <div className="portfolio-table-wrapper">
      <div className="portfolio-table portfolio-table-first">
        <div className="portfolio-table-item portfolio-table-item-name">
          Монета
        </div>
        <div className="portfolio-table-item portfolio-table-item-count">
          Кол-во
        </div>
        <div className="portfolio-table-item portfolio-table-item-price">
          Цена покупки
        </div>
        <div className="portfolio-table-item portfolio-table-item-current-price">
          Цена сейчас
        </div>
        <div className="portfolio-table-item portfolio-table-item-value">
          Вложено
        </div>
        <div className="portfolio-table-item portfolio-table-item-end-value">
          Стоимость
        </div>
        <div className="portfolio-table-item portfolio-table-item-profit">
          Разница
        </div>
        <div className="portfolio-table-item portfolio-table-item-delete"></div>
      </div>
      {coins.map((coin) => (
        <PortfolioRow
          coin={coin}
          key={coin.id}
          closePortfolioModal={closePortfolioModal}
        />
      ))}
    </div>
  );
};
