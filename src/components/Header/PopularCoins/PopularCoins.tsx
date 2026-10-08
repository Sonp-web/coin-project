import { Flex } from "antd";
import { Coin } from "./Coin/Coin";
import "./PopularCoins.css";
import { useEffect, useState } from "react";
import { loadCoinList } from "../../../services/coinApi";
import type { CoinInListType } from "../../CoinTable/CoinTable";
export const PopularCoins: React.FC = () => {
  const [popularCoins, setPopularCoins] = useState<CoinInListType[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await loadCoinList({ per_page: 3 });
        setPopularCoins(res);
      } catch (e) {
        const error = e as Error;
        console.log(error.message);
      }
    };
    load();
  }, []);
  return (
    <Flex className="header-list-coin">
      <p className="popular-coins-title">Популярные</p>
      {popularCoins.map((item) => {
        return (
          <Coin
            name={item.name}
            price={item.current_price}
            percent={item.price_change_percentage_24h}
            key={item.id}
          />
        );
      })}
    </Flex>
  );
};
