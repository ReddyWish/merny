import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import PublicHeader from "./public/PublicHeader";
import PublicFooter from "./public/PublicFooter.jsx";

const DashLayout = () => {
  return (
      <div >
      <PublicHeader/>
        <div className="flex flex-col justify-content items-center">
      <DashHeader/>
        <Outlet/>
      <PublicFooter/>
        </div>
    </div>
  );
}

export default DashLayout;