import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Coin } from "./pages/Coin/Coin";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshCoins,
  type PortfolioCoinType,
  selectPortfolio,
} from "./redux/slices/portfolioSlice";
function App() {
  const portfolioCoins = useSelector(selectPortfolio);
  const dispatch = useDispatch();
  const [isInititalStorage, setIsInitialStorage] = useState<boolean>(false);
  useEffect(() => {
    const res = localStorage.getItem("portfolioCoins");
    if (res) {
      const temp: PortfolioCoinType[] = JSON.parse(res);
      dispatch(refreshCoins(temp));
      setIsInitialStorage(true)
    }
  }, [dispatch]);
  useEffect(() => {
    if (isInititalStorage) {
      localStorage.setItem("portfolioCoins", JSON.stringify(portfolioCoins));
    }
  }, [portfolioCoins,isInititalStorage]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Coin />} />
      </Route>
    </Routes>
  );
}

export default App;
