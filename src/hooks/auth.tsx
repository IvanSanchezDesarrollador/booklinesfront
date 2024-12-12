import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { LoginInterface } from "../interfaces/login/LoginInterface";
import { MessageAlertInterface } from "../interfaces/message-alert/MessageAlertInterface";
import { RegisterInterface } from "../interfaces/register/RegisterInterface";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../store/ui/ui-store";

interface auth {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: auth) => {
  const navigate = useNavigate();

  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  const setUserAutenticado = useUIStore((state) => state.setUserAutenticado);

  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  const {
    data: user,
    error,
    mutate: mutateUser,
    isLoading: isLoginUserData,
  } = useSWR("/api/user", fetcher, {
    revalidateOnFocus: false,
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const registerUser = async ({
    RegisterAuthSend,
    setIsVisible,
    objectMessage,
    setObjectMessage,
  }: {
    RegisterAuthSend: RegisterInterface;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    objectMessage: MessageAlertInterface;
    setObjectMessage: React.Dispatch<
      React.SetStateAction<MessageAlertInterface>
    >;
  }) => {
    await csrf();
    setLoadingRegister(true);
    axios
      .post("/register", RegisterAuthSend)
      .then(() => {
        mutateUser(); // actualizar el estado del usuario
      })
      .catch(() => {
        setLoadingRegister(false);
        setIsVisible(true);
        setObjectMessage({
          ...objectMessage,
          accion: false,
          mensaje: "El correo o contraseña son incorrectas.",
          tipo: "error",
        });
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => {
        mutateUser(null); // actualizar el estado del usuario
      });
    }
    window.location.pathname = "/";
  };

  const login = async ({
    loginAuthSend,
    setIsLoginSuccess,
    setIsVisible,
    objectMessage,
    setObjectMessage,
  }: {
    loginAuthSend: LoginInterface;
    setIsLoginSuccess: React.Dispatch<React.SetStateAction<number>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    objectMessage: MessageAlertInterface;
    setObjectMessage: React.Dispatch<
      React.SetStateAction<MessageAlertInterface>
    >;
  }) => {
    await csrf();
    axios
      .post("/api/v1/login", loginAuthSend)
      .then(() => {
        mutateUser(); // actualizar el estado del usuario
        setIsLoginSuccess(2);
      })
      .catch(() => {
        setIsLoginSuccess(0);
        setIsVisible(true);
        setObjectMessage({
          ...objectMessage,
          accion: false,
          mensaje: "El correo o contraseña son incorrectas.",
          tipo: "error",
        });
      });
  };

  useEffect(() => {
    if (user) {
      setUserAutenticado(user);
    }

    if (middleware === "guest" && redirectIfAuthenticated && user) {
      navigate(redirectIfAuthenticated);
      setTimeout(() => {
        setLoadingRegister(false);
      }, 500);
    }

    if (middleware === "auth" && error) {
      logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error, middleware, redirectIfAuthenticated, setUserAutenticado]);

  return {
    user,
    registerUser,
    logout,
    isLoginUserData,
    login,
    loadingRegister,
  };
};
