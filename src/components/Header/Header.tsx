import { useState } from "react";
import { PopularCoins } from "./PopularCoins/PopularCoins";
import { PortfolioInfo } from "./PortfolioInfo/PortfolioInfo";
import { Flex } from "antd";
import { PortfolioModal } from "../PortfolioModal/PortfolioModal";
import "./style.css";
export const Header: React.FC = () => {
  const [isPortfolioModal, setIsPortfolioModal] = useState<boolean>(false);
  const openPortfolioModal = () => {
    setIsPortfolioModal(true);
  };
  const closePortfolioModal = () => {
    setIsPortfolioModal(false);
  };
  return (
    <div className="header-wrapper">
      <Flex justify="space-between">
        <PopularCoins />
        <PortfolioInfo
          openPortfolioModal={openPortfolioModal}
          closePortfolioModal={closePortfolioModal}
        />
      </Flex>

      {isPortfolioModal ? (
        <PortfolioModal closePortfolioModal={closePortfolioModal} />
      ) : null}
    </div>
  );
};
