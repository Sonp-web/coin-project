import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "./slices/coinsSlice";
import portfolioSlice from "./slices/portfolioSlice";
const store = configureStore({
  reducer: {
    coins: coinsSlice,
    portfolio: portfolioSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
