import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./style.css";
export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-layout-wrapper">
        <Outlet />
      </div>
    </>
  );
};
