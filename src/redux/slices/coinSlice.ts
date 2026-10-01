import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CoinInListType } from "../../components/CoinTable/CoinTable";
import {
  loadCoinHistory,
  loadCoinList,
  type LoadingCoinListType,
} from "../../services/coinApi";

type ActiveCoinPage = {
  coin: CoinInListType | null;
  coinHistory: number[][] | null;
  loadingHistory: boolean;
  errorHistory: string | null;
  loading: boolean;
  error: string | null;
};
const initialState: ActiveCoinPage = {
  coin: null,
  coinHistory: null,
  loadingHistory: false,
  errorHistory: null,
  loading: false,
  error: null,
};
export const fetchCoin = createAsyncThunk(
  "coin/fetchCoin",
  async (param: LoadingCoinListType) => {
    const result = await loadCoinList(param);
    return result;
  },
);
export const fetchCoinHistory = createAsyncThunk(
  "coin/fetchHistory",
  async (id: string) => {
    const result = await loadCoinHistory(id);
    return result;
  },
);
const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoin.fulfilled, (state, action) => {
        state.coin = action.payload[0];
        state.loading = false;
      })
      .addCase(fetchCoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка загрузки";
      })
      .addCase(fetchCoinHistory.pending, (state) => {
        state.loadingHistory = true;
        state.errorHistory = null;
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.coinHistory = action.payload;
        state.loadingHistory = false;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.loading = false;
        state.errorHistory = action.error.message ?? "Ошибка загрузки";
      });
  },
  selectors: {
    selectCoin: (state) => state.coin,
    selectLoadingCoin: (state) => state.loading,
    selectErrorCoin: (state) => state.error,
    selectCoinHistory: (state) => state.coinHistory,
    selectLoadingCoinHistory: (state) => state.loadingHistory,
    selectErrorCoinHistory: (state) => state.errorHistory,
  },
});
export default coinSlice.reducer;
export const {
  selectCoin,
  selectErrorCoin,
  selectLoadingCoin,
  selectCoinHistory,
  selectLoadingCoinHistory,
  selectErrorCoinHistory,
} = coinSlice.selectors;
