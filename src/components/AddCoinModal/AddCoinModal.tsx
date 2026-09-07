
import "./style.css";
import { CoinForm } from "../CoinForm/CoinForm";
type AddCoinModalType = {
  coin: string;
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
          Купить <span className="add-coin-modal-name">{coin}</span>
        </h2>
        <CoinForm />
      </div>
    </div>
  );
};
