import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "./slices/coinsSlice";
import portfolioSlice from "./slices/portfolioSlice";
import coinSlice from "./slices/coinSlice";
const store = configureStore({
  reducer: {
    coins: coinsSlice,
    coin: coinSlice,
    portfolio: portfolioSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
