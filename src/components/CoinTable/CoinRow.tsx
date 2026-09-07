import { Col, Row } from "antd";
import type { CoinInListType, CoinTableRowType } from "./CoinTable";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./CoinRow.css";
type CoinRowProps = {
  coin: CoinInListType;
};
export const CoinRow: React.FC<CoinRowProps & CoinTableRowType> = ({
  coin,
  onAddClick,
}) => {
  return (
    <Link to={`/coin/${coin.id}`} className="coin-row">
      <Row className="coin-row-wrapper">
        <Col span={1}>{coin.market_cap_rank}</Col>
        <Col span={2}>{coin.symbol}</Col>
        <Col span={4} className="coin-row-name">
          {coin.name}
        </Col>
        <Col span={4}>{coin.low_24h}$</Col>
        <Col span={4}>{coin.price_change_24h}$</Col>
        <Col span={4}>{coin.market_cap}</Col>
        <Col span={4}>{coin.current_price}$</Col>
        <Col
          span={1}
          onClick={(e) => {
            e.preventDefault();
            onAddClick(coin.name);
          }}
        >
          <PlusOutlined />
        </Col>
      </Row>
    </Link>
  );
};
