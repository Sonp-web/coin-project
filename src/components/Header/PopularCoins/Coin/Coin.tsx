import { formatNumber } from "../../../../utils/formatNumber";
import { formatPrice } from "../../../../utils/formatPrice";
import "./Coin.css";
import { Link } from "react-router-dom";
type CoinType = {
  name: string;
  price: number;
  percent: number;
};
export const Coin: React.FC<CoinType> = ({ name, price, percent }) => {
  const id = name[0].toLowerCase() + name.slice(1);
  let percentStyle = "header-coin-percent ";
  percentStyle +=
    percent > 0 ? "header-coin-percent-green" : "header-coin-percent-red";
  const modifyPercent = formatNumber(percent);
  return (
    <Link className="header-coin" to={`/coin/${id}`}>
      <p className="header-coin-title">
        {name[0].toUpperCase() + name.slice(1)}
      </p>
      <div className="header-coin-price">
        <p className="header-coin-price-title">{formatPrice(price)} $ </p>
        <span className={percentStyle}>{modifyPercent}%</span>
      </div>
    </Link>
  );
};
