import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { CPrimaryEnterprice } from "../../../config/Colors";
import { Button, useDisclosure } from "@nextui-org/react";
import { LuServer } from "react-icons/lu";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { ModalLogin } from "../modal-login/ModalLogin";
import { ModalRegister } from "../modal-register/ModalRegister";
import { useUIStore } from "../../../store/ui/ui-store";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
const NavTop = () => {
  const { logout } = useAuth({});

  const navigate =  useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const userAutenticado = useUIStore((state) => state.userAutenticado);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (userAutenticado) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userAutenticado]);

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onOpenChange: onOpenChangeRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  return (
    <>
      <div className="bg-amber-400 flex justify-end">
        {isAuthenticated ? (
          <>
            

            <Button
              className="text-white"
              radius="none"
              variant="light"
              startContent={<IoPersonCircle size={25}></IoPersonCircle>}
              onPress={() => logout()}
            >
              logout
            </Button>

            <Button
              color="warning"
              className="text-white"
              radius="none"
              startContent={<LuServer size={20}></LuServer>}
              onPress={() => {
                navigate("/dashboard");
              }}
            >
              Server Admin
            </Button>

          </>
        ) : (
          <>
            <Button
              className="text-white"
              radius="none"
              variant="light"
              startContent={<IoPersonCircle size={25}></IoPersonCircle>}
              onPress={() => onOpen()}
            >
              Login
            </Button>
            <Button
              className="text-white"
              radius="none"
              variant="light"
              startContent={<IoPersonAddSharp size={20}></IoPersonAddSharp>}
              onPress={() => onOpenRegister()}
            >
              Register
            </Button>
          </>
        )}
      </div>
      <div
        style={{ backgroundColor: CPrimaryEnterprice }}
        className={`w-full h-auto p-3`}
      >
        <div className="flex justify-center mb-3">
          <img src="/img/logoBookLines.webp" className="w-28" alt="" />
        </div>
        <div className="text-lg gap-3 flex justify-center">
          <NavLink to={"/books"}>Home</NavLink> |
          <NavLink to={"/books"}>Productos</NavLink> |
          <NavLink to={"/books"}>Acerca</NavLink>
        </div>
      </div>

      <ModalLogin
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      ></ModalLogin>

      <ModalRegister
        isOpen={isOpenRegister}
        onOpen={onOpenRegister}
        onOpenChange={onOpenChangeRegister}
        onClose={onCloseRegister}
      ></ModalRegister>
    </>
  );
};

export default NavTop;
