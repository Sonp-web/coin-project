import "./style.css";
import { CoinForm } from "../CoinForm/CoinForm";
import type { CoinInListType } from "../CoinTable/CoinTable";
type AddCoinModalType = {
  coin: CoinInListType;
  handleClose: () => void;
};
export const AddCoinModal: React.FC<AddCoinModalType> = ({
  coin,
  handleClose,
}) => {
  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="add-coin-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="add-coin-modal-title">
          Купить <span className="add-coin-modal-name">{coin.name}</span>
        </h2>
        <CoinForm id={coin.id} buyingPrice={coin.current_price} />
      </div>
    </div>
  );
};
