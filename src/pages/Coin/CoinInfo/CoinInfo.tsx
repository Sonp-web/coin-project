import "./CoinInfo.css";
import type { CoinInListType } from "../../../components/CoinTable/CoinTable";
import { formatPrice } from "../../../utils/formatPrice";
import { formatCap } from "../../../utils/formatCap";
import { formatNumber } from "../../../utils/formatNumber";
type CoinInfoPropsType = {
  coin: CoinInListType;
};
export const CoinInfo: React.FC<CoinInfoPropsType> = ({ coin }) => {
  const coinInfoWrapClassName = "coin-info-value ";
  const marketCapClassName =
    coin.market_cap_change_24h > 0
      ? coinInfoWrapClassName + "coin-info-value-green"
      : coinInfoWrapClassName + "coin-info-value-red";
  const priceChangeClassName =
    coin.price_change_24h > 0
      ? coinInfoWrapClassName + "coin-info-value-green"
      : coinInfoWrapClassName + "coin-info-value-red";
  const priceChangePercentClassName =
    coin.price_change_percentage_24h > 0
      ? coinInfoWrapClassName + "coin-info-value-green"
      : coinInfoWrapClassName + "coin-info-value-red";

  return (
    <div className="card coin-info">
      <div className="card-title">Данные о валюте</div>
      <div className="coin-info-all">
        <div className="coin-info-wrapper">
          <p>Цена</p>
          <p className="coin-info-value">{formatPrice(coin.current_price)} $</p>
        </div>
        <div className="coin-info-wrapper">
          <p>Общий объем</p>
          <p className="coin-info-value">{formatCap(coin.total_volume)} $</p>
        </div>
        <div className="coin-info-wrapper">
          <p>Изменение капитализации за 24 ч</p>
          <p className={marketCapClassName}>
            {formatCap(coin.market_cap_change_24h, true)} $
          </p>
        </div>
        <div className="coin-info-wrapper">
          <p>Изменение цены за 24 ч</p>
          <p className={priceChangeClassName}>
            {formatPrice(coin.price_change_24h, true)} $
          </p>
        </div>
        <div className="coin-info-wrapper">
          <p>Изменение цены за 24 ч, %</p>
          <p className={priceChangePercentClassName}>
            {formatNumber(coin.price_change_percentage_24h)} %
          </p>
        </div>
      </div>
    </div>
  );
};
