import { Flex } from "antd";
import { Coin } from "./Coin/Coin";
import "./style.css";
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
    <div>
      <h4 className="popular-coins-title">Популярные монеты:</h4>
      <Flex className="header-list-coin">
        {popularCoins.map((item) => {
          return (
            <Coin
              name={item.name}
              price={item.current_price}
              key={item.id}
            ></Coin>
          );
        })}
      </Flex>
    </div>
  );
};
