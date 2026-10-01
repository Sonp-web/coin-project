import "./style.css";
import { Link } from "react-router-dom";
type CoinType = {
  name: string;
  price: number;
};
export const Coin: React.FC<CoinType> = ({ name, price }) => {
  const id = name[0].toLowerCase() + name.slice(1);
  return (
    <Link className="header-coin" to={`/coin/${id}`}>
      <p className="header-coin-title">
        {name[0].toUpperCase() + name.slice(1)}
      </p>
      <p className="header-coin-price">${price}</p>
    </Link>
  );
};
