import { useState } from "react";
import { AddCoinModal } from "../../components/AddCoinModal/AddCoinModal";
import {
  CoinTable,
  type CoinInListType,
} from "../../components/CoinTable/CoinTable";
import { useSelector } from "react-redux";
import { selectCoins } from "../../redux/slices/coinsSlice";

export const Home: React.FC = () => {
  const [isAddCoinModal, setIsAddCoinModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinInListType | null>(null);
  const coins = useSelector(selectCoins);
  const onAddClick = (coin: string) => {
    setIsAddCoinModal(true);

    const temp = coins.find((item) => item.name == coin);
    console.log(temp);

    if (temp) {
      setSelectedCoin(temp);
    }
  };
  const handleClose = () => {
    setIsAddCoinModal(false);
  };
  return (
    <>
      <CoinTable onAddClick={onAddClick} />
      {isAddCoinModal && selectedCoin != null ? (
        <AddCoinModal coin={selectedCoin} handleClose={handleClose} />
      ) : null}
    </>
  );
};
