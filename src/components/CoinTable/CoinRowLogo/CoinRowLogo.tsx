import "./CoinRowLogo.css";
type CoinRowLogoType = {
  symbol: string;
};
export const CoinRowLogo: React.FC<CoinRowLogoType> = ({ symbol }) => {
  return (
    <div className="coin-row-logo">
      <p className="coin-row-logo-symbol">{symbol[0].toUpperCase()}</p>
    </div>
  );
};
