import { Button } from "@nextui-org/react";
import { CPrimaryEnterprice } from "../../../config/Colors";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div
      style={{ backgroundColor: CPrimaryEnterprice }}
      className="w-60 h-screen flex flex-col gap-3 py-4 px-3"
    >
      <NavLink to={"/dashboard"} className="w-full">
        <Button className="w-full" color="warning">Dashboard</Button>
      </NavLink>

      <NavLink to={"/books-admin"}>
        <Button className="w-full" color="warning">Books</Button>
      </NavLink>

    </div>
  );
};

export default AdminNav;
