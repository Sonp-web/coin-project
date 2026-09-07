import axios from "axios";
import type { CoinInListType } from "../components/CoinTable/CoinTable";

const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 1000,
  headers: { "x-cg-demo-api-key": "CG-u2EU6sKP3S3S3Dk6HzLVdKXP" },
});
type LoadingCoinListType = { page: number } | { id: string };

export const loadCoinList = async (param: LoadingCoinListType) => {
  try {
    let temp;
    if ("page" in param) {
      temp = { vs_currency: "usd", page: param.page, per_page: 10 };
    } else if ("id" in param) {
      temp = { vs_currency: "usd", ids: param.id };
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

type LoadCoinHistoryType = {
  prices: number[][];
  market_cap: number[][];
  total_volumes: number[][];
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
