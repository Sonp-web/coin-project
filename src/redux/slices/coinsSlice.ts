import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CoinInListType } from "../../components/CoinTable/CoinTable";
import { loadCoinList, type LoadingCoinListType } from "../../services/coinApi";

type CoinsSliceType = {
  coins: CoinInListType[];
  loading: boolean;
  error: string | null;
};
const initialState: CoinsSliceType = {
  coins: [],
  loading: false,
  error: null,
};

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (param: LoadingCoinListType) => {
    const result = await loadCoinList(param);
    return result;
  },
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка загрузки";
      });
  },
  selectors: {
    selectCoins: (state) => state.coins,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});
export default coinsSlice.reducer;
export const { selectCoins, selectLoading, selectError } = coinsSlice.selectors;



