import { Col, Row } from "antd";
import { PortfolioRow } from "./PortfolioRow";
import "./PortfolioTable.css";
import { type PortfolioCoinType } from "../../../redux/slices/portfolioSlice";

type PortfolioTableType = {
  coins: (PortfolioCoinType & { actualInfoCoin: number })[];
  closePortfolioModal: () => void;
};
export const PortfolioTable: React.FC<PortfolioTableType> = ({
  coins,
  closePortfolioModal,
}) => {
  return (
    <>
      <Row className="portfolio-table">
        <Col span={2}>Название</Col>
        <Col span={4}>Средняя цена покупки</Col>
        <Col span={4}>Актуальня цена </Col>
        <Col span={2}>Кол-во</Col>
        <Col span={4}>Средняя стоимость покупок </Col>
        <Col span={4}>Актуальная стоимость</Col>
        <Col span={3}>Разница</Col>
        <Col span={1}></Col>
      </Row>
      {coins.map((coin) => (
        <PortfolioRow
          coin={coin}
          key={coin.id}
          closePortfolioModal={closePortfolioModal}
        />
      ))}
    </>
  );
};
