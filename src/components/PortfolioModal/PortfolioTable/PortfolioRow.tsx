import { Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  removeCoin,
  type PortfolioCoinType,
} from "../../../redux/slices/portfolioSlice";
import "./PortfolioRow.css";
import { useDispatch } from "react-redux";
type PortfolioRowType = {
  coin: PortfolioCoinType & { actualInfoCoin: number };
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
  return (
    <Link
      to={`/coin/${coin.id}`}
      onClick={closePortfolioModal}
      className="portfolio-row-wrapper"
    >
      <Row className="portfolio-row">
        <Col span={2}>{coin.id}</Col>
        <Col span={4}>{coin.buyingPrice}</Col>
        <Col span={4}>{coin.actualInfoCoin} </Col>
        <Col span={2}>{coin.count}</Col>
        <Col span={4}>{fistValue}</Col>
        <Col span={4}>{actualValue}</Col>
        <Col span={3}>{value}</Col>
        <Col
          span={1}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(removeCoin({ id: coin.id }));
          }}
        >
          <DeleteOutlined />
        </Col>
      </Row>
    </Link>
  );
};
