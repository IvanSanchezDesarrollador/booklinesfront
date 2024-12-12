import { Outlet } from "react-router-dom";
import NavTop from "../../../components/ui/nav-top/NavTop";

export const StoreLayout = () => {
  return (
    <>
      <NavTop></NavTop>
      <Outlet></Outlet>
    </>
  );
};
