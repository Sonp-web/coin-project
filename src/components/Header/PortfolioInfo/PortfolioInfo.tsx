import { WalletOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import "./style.css";
import { usePortfolio } from "../../../hooks/usePortfolio";
type PortfolioInfoType = {
  openPortfolioModal: () => void;
  closePortfolioModal: () => void;
};
export const PortfolioInfo: React.FC<PortfolioInfoType> = ({
  openPortfolioModal,
}) => {
  const { finalValue } = usePortfolio();

  return (
    <Flex onClick={openPortfolioModal} className="portfolio-info-wrapper">
      <WalletOutlined className="portfolio-info-icon" />
      <div>
        <p>Итого:</p>
        <p className="portfolio-icon-value">{finalValue} USD</p>
      </div>
    </Flex>
  );
};
