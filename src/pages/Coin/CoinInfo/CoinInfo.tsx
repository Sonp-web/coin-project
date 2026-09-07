import { Col, Row } from "antd";
import "./style.css";
import type { CoinInListType } from "../../../components/CoinTable/CoinTable";
type CoinInfoPropsType = {
  coin: CoinInListType;
};
export const CoinInfo: React.FC<CoinInfoPropsType> = ({ coin }) => {
  return (
    <div className="coin-info-row-wrapper">
      <Row className="coin-title-row">
        <Col span={14}>Информация</Col>
        <Col span={10}>Данные о валюте</Col>
      </Row>
      <Row className=" coin-info-row coin-info-price">
        <Col span={14}>Цена</Col>
        <Col span={10}>{coin.current_price}$</Col>
      </Row>
      <Row className=" coin-info-row coin-info-count">
        <Col span={14}>Общий объем</Col>
        <Col span={10}>{coin.total_volume}</Col>
      </Row>
      <Row className="coin-info-row">
        <Col span={14}>Объем торгов за последние 24 часа</Col>
        <Col span={10}>{coin.market_cap_change_24h}</Col>
      </Row>
      <Row className="coin-info-row">
        <Col span={14}>Изменение цены за 24 часа</Col>
        <Col span={10}>{coin.price_change_24h}$</Col>
      </Row>
      <Row className="coin-info-row">
        <Col span={14}>Процентное изменение цена за послдение 24 часа</Col>
        <Col span={10}>{coin.price_change_percentage_24h}%</Col>
      </Row>
    </div>
  );
};
