import { useState } from "react";
import { AddCoinModal } from "../../components/AddCoinModal/AddCoinModal";
import { CoinTable } from "../../components/CoinTable/CoinTable";

export const Home: React.FC = () => {
  const [isAddCoinModal, setIsAddCoinModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const onAddClick = (coin: string) => {
    setIsAddCoinModal(true);
    setSelectedCoin(coin);
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
