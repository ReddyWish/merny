import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import PublicHeader from "./public/PublicHeader";
import PublicFooter from "./public/PublicFooter.jsx";

const DashLayout = () => {
  return (
    <>
      <PublicHeader/>
      <DashHeader/>
        <Outlet/>
      <PublicFooter/>
    </>
  );
}

export default DashLayout;