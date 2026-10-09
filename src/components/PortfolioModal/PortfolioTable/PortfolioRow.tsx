import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  removeCoin,
  type PortfolioCoinType,
} from "../../../redux/slices/portfolioSlice";
import "./PortfolioRow.css";
import { useDispatch } from "react-redux";
import { CoinRowLogo } from "../../CoinTable/CoinRowLogo/CoinRowLogo";
import { formatPrice } from "../../../utils/formatPrice";
type PortfolioRowType = {
  coin: PortfolioCoinType & {
    actualInfoCoin: number;
    name: string;
    symbol: string;
  };
  closePortfolioModal: () => void;
};
export const PortfolioRow: React.FC<PortfolioRowType> = ({
  coin,
  closePortfolioModal,
}) => {
  const dispatch = useDispatch();

  const fistValue = coin.count * coin.buyingPrice;
  const actualValue = coin.count * coin.actualInfoCoin;
  const value = actualValue - fistValue;
  const tempClassName = "portfolio-table-item portfolio-table-item-profit ";
  const profitClassName =
    value > 0
      ? tempClassName + "portfolio-table-item-profit-green"
      : tempClassName + "portfolio-table-item-profit-red";
  return (
    <Link
      to={`/coin/${coin.id}`}
      onClick={closePortfolioModal}
      className="portfolio-row-wrapper"
    >
      <div className="portfolio-table">
        <div className="portfolio-table-item portfolio-table-item-name">
          <CoinRowLogo symbol={coin.name} />
          <div className="portfolio-table-item-name-wrapper">
            <p className="portfolio-table-item-name-text">{coin.name}</p>
            <p className="portfolio-table-item-name-descr">
              {formatPrice(coin.count)} {coin.symbol.toUpperCase()} покупка по{" "}
              {formatPrice(coin.buyingPrice)} $
            </p>
          </div>
        </div>
        <div className="portfolio-table-item portfolio-table-item-count">
          {formatPrice(coin.count)}
        </div>
        <div className="portfolio-table-item portfolio-table-item-price">
          {formatPrice(coin.buyingPrice)} $
        </div>
        <div className="portfolio-table-item portfolio-table-item-current-price">
          {formatPrice(coin.actualInfoCoin)} $
        </div>
        <div className="portfolio-table-item portfolio-table-item-value">
          {formatPrice(fistValue)} $
        </div>
        <div className="portfolio-table-item portfolio-table-item-end-value">
          <p className="portfolio-table-item-end-value-text">Стоимость</p>
          {formatPrice(actualValue)} $
        </div>
        <div className={profitClassName}>
          <p className="portfolio-table-item-profit-text">Разница</p>
          {formatPrice(value, true)} $
        </div>
        <button
          type="button"
          aria-label="Удалить из портфеля"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(removeCoin({ id: coin.id }));
          }}
          className="portfolio-table-item portfolio-table-item-delete"
        >
          <DeleteOutlined />
        </button>
      </div>
    </Link>
  );
};
