import { Flex } from "antd";
import { usePortfolio } from "../../../../hooks/usePortfolio";
import "./PortfolioValue.css";
import { formatNumber } from "../../../../utils/formatNumber";
export const PortfolioValue: React.FC = () => {
  const { profit, profitPercent } = usePortfolio();
  const modifyProfit = formatNumber(profit);
  const modifyProfitPercent = formatNumber(profitPercent);
  let portfolioClassName = "portfolio-value ";
  portfolioClassName += profitPercent > 0 ? "portfolio-green" : "portfolio-red";
  return (
    <Flex gap={10} className={portfolioClassName}>
      <p>{modifyProfit} $</p>
      <p>{modifyProfitPercent} %</p>
    </Flex>
  );
};
