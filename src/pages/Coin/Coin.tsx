import { useParams } from "react-router-dom";
import { CoinForm } from "../../components/CoinForm/CoinForm";
import { CoinInfo } from "./CoinInfo/CoinInfo";
import "./style.css";
import { useEffect, useState } from "react";
import { loadCoinHistory, loadCoinList } from "../../services/coinApi";
import type { CoinInListType } from "../../components/CoinTable/CoinTable";
import { LinePlot } from "./Line";
export const Coin: React.FC = () => {
  const params = useParams();

  const [coin, setCoin] = useState<CoinInListType | null>(null);
  const [coinHistory, setCoinHistory] = useState<number[][] | null>(null);
  const [loadingCoinHistory, setLoadingCoinHistory] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params.id) {
      const id = params.id;
      const load = async () => {
        try {
          const responce = await loadCoinList({ id: id });
          setCoin(responce[0]);

          const history = await loadCoinHistory(id);
          setCoinHistory(history);
          setLoadingCoinHistory(false);
        } catch (e) {
          const error = e as Error;
          console.log(error.message);
          setErrorLoading(true);
        }
      };
      load();
    }
  }, [params.id]);

  return (
    <>
      {coin ? (
        <>
          <h2 className="coin-title">
            <span className="coin-title-symbol">
              {coin.symbol.toUpperCase()}
            </span>
            {" " + coin.name}
          </h2>
          <CoinForm buyingPrice={coin.current_price} />
          <CoinInfo coin={coin} />
          {coinHistory && !loadingCoinHistory ? (
            <LinePlot data={coinHistory} />
          ) : null}
        </>
      ) : errorLoading ? (
        <div>Ошибка</div>
      ) : null}
    </>
  );
};
