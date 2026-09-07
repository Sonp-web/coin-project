import { Col, Row, Pagination } from "antd";
import { CoinRow } from "./CoinRow";
import "./CoinTable.css";
import { useEffect, useState } from "react";

import { loadCoinList } from "../../services/coinApi";
import { useDispatch, useSelector } from "react-redux";
import { addCoinsToRedux, selectCoins } from "../../redux/slices/coinsSlice";
export type CoinTableRowType = {
  onAddClick: (coin: string) => void;
};
export type CoinInListType = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
};
export const CoinTable: React.FC<CoinTableRowType> = ({ onAddClick }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();

  const coins = useSelector(selectCoins);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const responce = await loadCoinList({ page });
        dispatch(addCoinsToRedux(responce));
      } catch (e) {
        setError(true);
        const error = e as Error;
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, dispatch]);

  return (
    <>
      <Row className="coin-table-wrapper">
        <Col span={1}>№</Col>
        <Col span={2}></Col>
        <Col span={4}>Name</Col>
        <Col span={4}>Low (24Hr)</Col>
        <Col span={4}>Change (24h)</Col>
        <Col span={4}>Market Cap</Col>
        <Col span={4}>Price</Col>
        <Col span={1}></Col>
      </Row>
      {loading ? (
        <div>Загрузка</div>
      ) : error ? (
        <div>Ошибка</div>
      ) : (
        coins.map((coin) => (
          <CoinRow coin={coin} onAddClick={onAddClick} key={coin.symbol} />
        ))
      )}
      <Pagination
        align="center"
        onChange={(page) => setPage(page)}
        defaultCurrent={1}
        showSizeChanger={false}
        total={100}
      />
    </>
  );
};
