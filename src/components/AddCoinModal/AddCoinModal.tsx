import "./AddCoinModal.css";
import { CoinForm } from "../CoinForm/CoinForm";
import type { CoinInListType } from "../CoinTable/CoinTable";
import { CloseOutlined } from "@ant-design/icons";
import { CoinRowLogo } from "../CoinTable/CoinRowLogo/CoinRowLogo";
import { formatPrice } from "../../utils/formatPrice";
import { useLockScroll } from "../../hooks/useLockScroll";
type AddCoinModalType = {
  coin: CoinInListType;
  handleClose: () => void;
};
export const AddCoinModal: React.FC<AddCoinModalType> = ({
  coin,
  handleClose,
}) => {
  useLockScroll();
  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="add-coin-modal card" onClick={(e) => e.stopPropagation()}>
        <div className="add-coin-title-wrapper">
          <p className="add-coin-title">Купить {coin.name}</p>
          <CloseOutlined
            aria-label="Закрыть"
            className="add-coin-close-button"
            onClick={handleClose}
          />
        </div>
        <div className="add-coin-info">
          <div className="add-coin-text-wrapper">
            <CoinRowLogo symbol={coin.symbol} />
            <div className="add-coin-descr-wrapper">
              <p className="coin-table-name-title">{coin.name}</p>
              <span className="coin-table-name-symbol">
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="add-coin-price-wrapper">
            <p className="add-coin-price-text">Цена</p>
            <p className="coin-table-price">
              {formatPrice(coin.current_price)} $
            </p>
          </div>
        </div>
        <CoinForm
          id={coin.id}
          buyingPrice={coin.current_price}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
};
