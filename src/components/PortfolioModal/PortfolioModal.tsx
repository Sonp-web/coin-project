import { PortfolioTable } from "./PortfolioTable/PortfolioTable";
import "./PortfolioModal.css";
import { usePortfolio } from "../../hooks/usePortfolio";
import { formatPrice } from "../../utils/formatPrice";
import { formatNumber } from "../../utils/formatNumber";
import { CloseOutlined } from "@ant-design/icons";
import { useLockScroll } from "../../hooks/useLockScroll";
type PortfolioModalType = {
  closePortfolioModal: () => void;
};
export const PortfolioModal: React.FC<PortfolioModalType> = ({
  closePortfolioModal,
}) => {
  const { updatePortfolioCoins, value, finalValue, profit, profitPercent } =
    usePortfolio();
  useLockScroll();
  const tempClassName = "portfolio-card-value ";
  const profitClassName =
    profit > 0
      ? tempClassName + "portfolio-card-value-green"
      : tempClassName + "portfolio-card-value-red";

  return (
    <div className="modal-overlay" onClick={closePortfolioModal}>
      <div
        className="portfolio-modal card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="portfolio-modal-descr">
          <p className="card-title">Портфель</p>{" "}
          <CloseOutlined
            aria-label="Закрыть"
            className="add-coin-close-button"
            onClick={closePortfolioModal}
          />
        </div>
        <div className="portfolio-modal-info">
          <div className="portfolio-card portfolio-card-in">
            <p className="portfolio-card-text ">Вложил</p>
            <p className="portfolio-card-value">{formatPrice(value)} $</p>
          </div>
          <div className="portfolio-card portfolio-card-current">
            {" "}
            <p className="portfolio-card-text ">Стоит сейчас</p>
            <p className="portfolio-card-value">{formatPrice(finalValue)} $</p>
          </div>
          <div className="portfolio-card portfolio-card-profit">
            {" "}
            <p className="portfolio-card-text">Прибыль</p>
            <p className={profitClassName}>
              {formatPrice(profit, true)} $ {formatNumber(profitPercent)} %
            </p>
          </div>
        </div>
        <PortfolioTable
          coins={updatePortfolioCoins}
          closePortfolioModal={closePortfolioModal}
        />
      </div>
    </div>
  );
};
