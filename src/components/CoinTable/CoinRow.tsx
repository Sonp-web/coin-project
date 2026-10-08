import { Col, Row } from "antd";
import type { CoinInListType, CoinTableRowType } from "./CoinTable";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./CoinRow.css";
import { CoinRowLogo } from "./CoinRowLogo/CoinRowLogo";
import { formatNumber } from "../../utils/formatNumber";
import { formatCap } from "../../utils/formatCap";
import { formatPrice } from "../../utils/formatPrice";
type CoinRowProps = {
  coin: CoinInListType;
};
export const CoinRow: React.FC<CoinRowProps & CoinTableRowType> = ({
  coin,
  onAddClick,
}) => {
  let classNameCoinTablePrice = "coin-table-right ";
  let classNameCoinTablePercentMobile = "coin-table-percent-mobile ";
  classNameCoinTablePrice +=
    coin.price_change_percentage_24h > 0
      ? "coin-table-percent-green"
      : "coin-table-percent-red";
  classNameCoinTablePercentMobile +=
    coin.price_change_percentage_24h > 0
      ? "coin-table-percent-green"
      : "coin-table-percent-red";
  return (
    <Link to={`/coin/${coin.id}`} className="coin-row">
      <Row className="coin-row-wrapper">
        <Col span={1} className="coin-table-left coin-table-num">
          {coin.market_cap_rank}
        </Col>
        <Col
          xs={{ span: 11, offset: 1 }}
          md={{ span: 8, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
          className="coin-table-left coin-table-name"
        >
          <CoinRowLogo symbol={coin.symbol} />
          <div className="coin-table-name-wrapper">
            <p className="coin-table-name-title"> {coin.name}</p>
            <span className="coin-table-name-symbol">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </Col>
        <Col xs={7} md={4} xl={4} className="coin-table-right coin-table-price">
          <div>
            <p> {formatPrice(coin.current_price)} $</p>
            <p className={classNameCoinTablePercentMobile}>
              {formatNumber(coin.price_change_percentage_24h)} %
            </p>
          </div>
        </Col>
        <Col xs={0} md={4} xl={4} className={classNameCoinTablePrice}>
          {formatNumber(coin.price_change_percentage_24h)} %
        </Col>
        <Col
          xs={0}
          md={0}
          xl={3}
          className="coin-table-right coin-table-min-price"
        >
          {formatPrice(coin.low_24h)} $
        </Col>
        <Col xs={0} md={5} xl={4} className="coin-table-right coin-table-cap">
          {formatCap(coin.market_cap)} $
        </Col>
        <Col
          xs={4}
          md={2}
          xl={2}
          className="coin-table-right"
        >
          <button
            type="button"
            aria-label="buy"
            className="coin-table-button"
            onClick={(e) => {
              e.preventDefault();
              onAddClick(coin.name);
            }}
          >
            <PlusOutlined className="coin-table-button-plus" />
          </button>
        </Col>
      </Row>
    </Link>
  );
};
