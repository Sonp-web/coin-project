import { WalletOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import "./style.css";
type PortfolioInfoType = {
  openPortfolioModal: () => void;
  closePortfolioModal: () => void;
};
export const PortfolioInfo: React.FC<PortfolioInfoType> = ({
  openPortfolioModal,
}) => {
  return (
    <Flex onClick={openPortfolioModal} className="portfolio-info-wrapper">
      <WalletOutlined className="portfolio-info-icon" />
      <div>
        <p>Итого:</p>
        <p className="portfolio-icon-value">12345 USD</p>
      </div>
    </Flex>
  );
};
