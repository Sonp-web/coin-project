import { Flex } from "antd";
import { Coin } from "./Coin/Coin";
import "./style.css";
export const PopularCoins: React.FC = () => {
  return (
    <div>
      <h4 className="popular-coins-title">Популярные монеты:</h4>
      <Flex className="header-list-coin">
        <Coin name="bitcoin" price={23162.22} />
        <Coin name="ethereum" price={1617.2} />
        <Coin name="tether" price={1.0} />
      </Flex>
    </div>
  );
};
