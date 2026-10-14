import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PortfolioCoinType } from "../../types/portfolio";

type PortfolioSliceType = {
  coins: PortfolioCoinType[];
};
const initialState: PortfolioSliceType = {
  coins: [],
};
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCoin(state, action: PayloadAction<PortfolioCoinType>) {
      const temp = state.coins.find((item) => item.id === action.payload.id);

      if (temp) {
        const oldPrice = temp.count * temp.buyingPrice;
        const newPrice =
          (oldPrice + action.payload.buyingPrice * action.payload.count) /
          (temp.count + action.payload.count);
        temp.buyingPrice = newPrice;
        temp.count += action.payload.count;
      } else {
        state.coins.push({
          id: action.payload.id,
          count: action.payload.count,
          buyingPrice: action.payload.buyingPrice,
        });
      }
    },
    removeCoin(state, action: PayloadAction<{ id: string }>) {
      const index = state.coins.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.coins.splice(index, 1);
      }
    },
    refreshCoins(state, action: PayloadAction<PortfolioCoinType[]>) {
      state.coins = action.payload;
    },
  },
  selectors: {
    selectPortfolio: (state) => state.coins,
  },
});
export default portfolioSlice.reducer;
export const { addCoin, removeCoin, refreshCoins } = portfolioSlice.actions;
export const { selectPortfolio } = portfolioSlice.selectors;
