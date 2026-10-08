import { useState } from "react";
import { PopularCoins } from "./PopularCoins/PopularCoins";
import { PortfolioInfo } from "./PortfolioInfo/PortfolioInfo";
import { Flex } from "antd";
import { PortfolioModal } from "../PortfolioModal/PortfolioModal";
import "./Header.css";
import { Logo } from "../Logo/Logo";
export const Header: React.FC = () => {
  const [isPortfolioModal, setIsPortfolioModal] = useState<boolean>(false);
  const openPortfolioModal = () => {
    setIsPortfolioModal(true);
  };
  const closePortfolioModal = () => {
    setIsPortfolioModal(false);
  };
  return (
    <header className="header">
      <div className="container">
        <Flex justify="space-between" className="header-wrapper">
          <Logo />
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
    </header>
  );
};
