import { PortfolioTable } from "./PortfolioTable/PortfolioTable";
import "./style.css";
import { usePortfolio } from "../../hooks/usePortfolio";
type PortfolioModalType = {
  closePortfolioModal: () => void;
};
export const PortfolioModal: React.FC<PortfolioModalType> = ({
  closePortfolioModal,
}) => {
  const { updatePortfolioCoins, value, finalValue, profit } = usePortfolio();

  return (
    <div className="modal-overlay" onClick={closePortfolioModal}>
      <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="portfolio-modal-title">Портфель</h3>
        <PortfolioTable
          coins={updatePortfolioCoins}
          closePortfolioModal={closePortfolioModal}
        />
        <div className="portfolio-modal-info">
          Вложил: <span className="portfolio-modal-value">{value} $</span>
          Стоит сейчас:
          <span className="portfolio-modal-value">{finalValue} $</span>
          Прибыль:<span className="portfolio-modal-value">{profit} $</span>
        </div>
      </div>
    </div>
  );
};
