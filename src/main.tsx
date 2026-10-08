import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { PortfolioProvider } from "./context/PortfolioContext.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#2450E0", // акцент: кнопки, активная страница, фокус инпута
        colorText: "#14171F",
        colorBorder: "#CFD4DC", // рамка инпутов
        borderRadius: 10, // кнопки и инпуты
        controlHeight: 44, // высота кнопок и инпутов (по умолчанию 32)
        fontFamily: "Manrope, system-ui, sans-serif",
        fontSize: 15,
      },
      components: {
        Pagination: {
          itemActiveBg: "#2450E0",
          itemActiveColor: "#ffffff",
          itemActiveColorHover: "#ffffff",
        },
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
);
