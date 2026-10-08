import { useParams, Link } from "react-router-dom";
import { CoinForm } from "../../components/CoinForm/CoinForm";
import { CoinInfo } from "./CoinInfo/CoinInfo";
import { CoinRowLogo } from "../../components/CoinTable/CoinRowLogo/CoinRowLogo";
import "./Coin.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
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
import { formatPrice } from "../../utils/formatPrice";

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
  let percentClassName = "coin-descr-percent ";
  percentClassName +=
    coin?.price_change_percentage_24h !== undefined &&
    coin?.price_change_percentage_24h > 0
      ? "coin-descr-percent-green"
      : "coin-descr-percent-red";
  return (
    <div className="coin-wrapper">
      <Link to="/" className="coin-link-to-home">
        <ArrowLeftOutlined className="" />
        Все монеты
      </Link>
      {coin ? (
        <>
          <div className="coin-descr">
            <div className="coin-descr-wrapper">
              <CoinRowLogo symbol={coin.symbol}></CoinRowLogo>
              <div className="coin-descr-text">
                <h1 className="coin-descr-title">{coin.name}</h1>
                <p className="coin-descr-descr">
                  {coin.symbol.toUpperCase()} № {coin.market_cap_rank} по
                  капитализации
                </p>
              </div>
            </div>
            <div className="coin-descr-price-wrapper">
              <p className="coin-descr-price">
                {formatPrice(coin.current_price)} $
              </p>
              <p className={percentClassName}>
                {formatPrice(coin.price_change_percentage_24h)} %
              </p>
            </div>
          </div>
          <div className="coin-about-wrapper">
            {coinHistory && !loadingCoinHistory ? (
              <LinePlot data={coinHistory} />
            ) : null}
            <CoinInfo coin={coin} />
            <CoinForm id={coin.id} buyingPrice={coin.current_price} />
          </div>
        </>
      ) : errorLoading ? (
        <div>Ошибка</div>
      ) : null}
    </div>
  );
};
