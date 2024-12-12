import { Outlet } from "react-router-dom";
import AdminNav from "../../../components/ui/admin-nav/AdminNav";

export const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        
        <AdminNav></AdminNav>
        <Outlet></Outlet>
      </div>
    </>
  );
};
