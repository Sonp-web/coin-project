import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CoinInListType } from "../../components/CoinTable/CoinTable";

type CoinsSliceType = {
  coins: CoinInListType[];
};
const initialState: CoinsSliceType = {
  coins: [],
};
const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    addCoinsToRedux(state, action: PayloadAction<CoinInListType[]>) {
      state.coins = action.payload;
    },
  },
  selectors: {
    selectCoins: (state) => state.coins,
  },
});
export default coinsSlice.reducer;
export const { addCoinsToRedux } = coinsSlice.actions;
export const { selectCoins } = coinsSlice.selectors;
