import { useParams } from "react-router-dom";
import { CoinForm } from "../../components/CoinForm/CoinForm";
import { CoinInfo } from "./CoinInfo/CoinInfo";
import "./style.css";
import { useEffect } from "react";
import { LinePlot } from "./Line";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  fetchCoin,
  fetchCoinHistory,
  selectCoin,
  selectCoinHistory,
  selectErrorCoinHistory,
  selectLoadingCoinHistory,
} from "../../redux/slices/coinSlice";

export const Coin: React.FC = () => {
  const params = useParams();

  const dispatch = useAppDispatch();
  const coin = useAppSelector(selectCoin);
  const coinHistory = useAppSelector(selectCoinHistory);
  const loadingCoinHistory = useAppSelector(selectLoadingCoinHistory);
  const errorLoading = useAppSelector(selectErrorCoinHistory);

  useEffect(() => {
    if (params.id) {
      const id = params.id;
      dispatch(fetchCoin({ id: id }));
      dispatch(fetchCoinHistory(id));
    }
  }, [params.id, dispatch]);

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
          <CoinForm id={coin.id} buyingPrice={coin.current_price} />
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
