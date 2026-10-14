export type PortfolioCoinType = {
  id: string;
  count: number;
  buyingPrice: number;
};

export type PortfolioCoinInfoType = PortfolioCoinType & {
  actualInfoCoin: number;
  name: string;
  symbol: string;
};
