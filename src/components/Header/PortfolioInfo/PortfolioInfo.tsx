import { CreditCardOutlined } from "@ant-design/icons";
import "./PortfolioInfo.css";
import { usePortfolio } from "../../../hooks/usePortfolio";
import { PortfolioValue } from "./PorfrolioValue/PortfolioValue";
type PortfolioInfoType = {
  openPortfolioModal: () => void;
  closePortfolioModal: () => void;
};
export const PortfolioInfo: React.FC<PortfolioInfoType> = ({
  openPortfolioModal,
}) => {
  const { finalValue } = usePortfolio();

  return (
    <button onClick={openPortfolioModal} className="portfolio-info-wrapper">
      <CreditCardOutlined className="portfolio-info-icon" />
      <div>
        <p className="portfolio-info-title">Портфель</p>
        <p className="portfolio-icon-value">
          {finalValue.toLocaleString("ru-RU")} $
        </p>
      </div>
      <PortfolioValue />
    </button>
  );
};
