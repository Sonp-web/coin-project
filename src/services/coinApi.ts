import axios from "axios";
import type {
  CoinInListType,
  LoadCoinHistoryType,
  LoadingCoinListType,
} from "../types/coin";

const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 10000,
  headers: { "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY },
});
export const loadCoinList = async (param: LoadingCoinListType) => {
  try {
    let temp;
    if ("page" in param) {
      temp = { vs_currency: "usd", page: param.page, per_page: 10 };
    } else if ("id" in param) {
      temp = { vs_currency: "usd", ids: param.id };
    } else if ("per_page" in param) {
      temp = { vs_currency: "usd", per_page: 3 };
    }
    const responce = await instance.get<CoinInListType[]>("/coins/markets", {
      params: temp,
    });
    return responce.data;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    throw error;
  }
};

export const loadCoinHistory = async (id: string) => {
  try {
    const responce = await instance.get<LoadCoinHistoryType>(
      `/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      },
    );

    return responce.data.prices;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    throw error;
  }
};
