import { useState } from "react";
import { AddCoinModal } from "../../components/AddCoinModal/AddCoinModal";
import {
  CoinTable,
  type CoinInListType,
} from "../../components/CoinTable/CoinTable";
import { useSelector } from "react-redux";
import { selectCoins } from "../../redux/slices/coinsSlice";
import "./Home.css";

export const Home: React.FC = () => {
  const [isAddCoinModal, setIsAddCoinModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinInListType | null>(null);
  const coins = useSelector(selectCoins);
  const onAddClick = (coin: string) => {
    setIsAddCoinModal(true);

    const temp = coins.find((item) => item.name == coin);

    if (temp) {
      setSelectedCoin(temp);
    }
  };
  const handleClose = () => {
    setIsAddCoinModal(false);
  };
  return (
    <div className="home-wrapper">
      <h1 className="home-title">Криптовалюты</h1>
      <p className="home-description">Топ-100 по капитализации</p>
      <CoinTable onAddClick={onAddClick} />
      {isAddCoinModal && selectedCoin != null ? (
        <AddCoinModal coin={selectedCoin} handleClose={handleClose} />
      ) : null}
    </div>
  );
};
