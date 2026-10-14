import { Col, Row, Pagination } from "antd";
import { CoinRow } from "./CoinRow";
import "./CoinTable.css";

import { useEffect, useState } from "react";

import {
  fetchCoins,
  selectCoins,
  selectError,
  selectLoading,
} from "../../redux/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
export type CoinTableRowType = {
  onAddClick: (coin: string) => void;
};
export const CoinTable: React.FC<CoinTableRowType> = ({ onAddClick }) => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchCoins({ page }));
  }, [page, dispatch]);

  return (
    <>
      <div className="coin-table-wrapper">
        <Row className="coin-table-first">
          <Col span={1} className="coin-table-left">
            №
          </Col>
          <Col
            xs={{ span: 11, offset: 1 }}
            md={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="coin-table-left"
          >
            Монета
          </Col>
          <Col xs={7} md={4} xl={4} className="coin-table-right">
            Цена
          </Col>
          <Col xs={0} md={4} xl={4} className="coin-table-right">
            24 ч
          </Col>
          <Col xs={0} md={0} xl={3} className="coin-table-right">
            Мин 24 ч
          </Col>
          <Col xs={0} md={5} xl={4} className="coin-table-right">
            Капитализация
          </Col>
          <Col xs={4} md={2} xl={2}></Col>
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
      </div>
      <Pagination
        className="coin-table-pagination"
        align="center"
        onChange={(page) => setPage(page)}
        defaultCurrent={1}
        showSizeChanger={false}
        total={100}
        showLessItems={true}
      />
    </>
  );
};
