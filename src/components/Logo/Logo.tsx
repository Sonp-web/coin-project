import { Link } from "react-router-dom";
import "./Logo.css";
export const Logo: React.FC = () => {
  return (
    <Link className="logo-wrapper" to={"/"}>
      <div className="logo-icon">
        <p className="logo-icon-text">C</p>
      </div>
      <p className="logo-text">Coin Project</p>
    </Link>
  );
};
