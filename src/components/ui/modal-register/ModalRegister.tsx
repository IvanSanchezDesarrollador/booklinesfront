import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { useAuth } from "../../../hooks/auth";
import { MensajeAlert } from "../message-alert/MensajeAlert";
import { ModalLoginInteface } from "../../../interfaces/login/LoginInterface";
import { MessageAlertInterface } from "../../../interfaces/message-alert/MessageAlertInterface";
import { useUIStore } from "../../../store/ui/ui-store";
import { RegisterInterface } from "../../../interfaces/register/RegisterInterface";

export const ModalRegister = ({
  isOpen,
  onOpenChange,
  onClose,
}: ModalLoginInteface) => {
  const { registerUser,  loadingRegister} = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const userAutenticado = useUIStore((state) => state.userAutenticado);

  const [objectMessage, setObjectMessage] = useState<MessageAlertInterface>({
    accion: false,
    mensaje: "",
    tipo: "error",
  });
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>();

  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    setIsVisible(false);
    console.log(data);

    const RegisterAuthSend: RegisterInterface = {
      ...data,
      password_confirmation : data.password
    };

    registerUser({
      RegisterAuthSend,
      setObjectMessage,
      setIsVisible,
      objectMessage,
    });
    
  };

  useEffect(() => {
    if (userAutenticado) {
      onClose();
    }
  }, [onClose, userAutenticado]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="lg"
        backdrop="blur"
        className="p-6"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <MensajeAlert
                isVisibleMenssage={isVisible}
                setIsVisibleMenssage={setIsVisible}
                messageObject={objectMessage}
                positionAlternative="absolute"
              ></MensajeAlert>
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <span className={` text-[#edcf5d] text-2xl`}>
                      Registrate ahora!
                    </span>
                    <span className={` text-[#a4a4a4] text-sm`}>
                      Registro de usuario
                    </span>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-5 overflow-hidden relative">
                      <Input
                        {...register("name", {
                          required: true,
                        })}
                        endContent={
                          <IoMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Name"
                        //variant="bordered"
                      />
                      {errors.name?.type == "required" && (
                        <span
                          className={`absolute bottom-0 text-xs font-extralight text-red-500`}
                        >
                          El nombre es requerido
                        </span>
                      )}
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-5 overflow-hidden relative">
                      <Input
                        {...register("email", {
                          required: true,
                        })}
                        endContent={
                          <IoMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        type="email"
                        //variant="bordered"
                      />
                      {errors.email?.type == "required" && (
                        <span
                          className={`absolute bottom-0 text-xs font-extralight text-red-500`}
                        >
                          El email es requerido
                        </span>
                      )}
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 relative pb-5">
                      <Input
                        {...register("password", {
                          required: true,
                        })}
                        endContent={
                          <IoLockClosedOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Contraseña"
                        type="password"
                        //variant="bordered"
                      />
                      {errors.password?.type == "required" && (
                        <span
                          className={`absolute bottom-0 text-xs font-extralight text-red-500`}
                        >
                          La contraseña es requerido
                        </span>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="mt-5 flex flex-col items-center gap-3 w-full">
                      <div className="flex items-center justify-end gap-3 w-full">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          className="bg-[#edcf5d]"
                          onPress={() => handleSubmit(onSubmit)()}
                          radius="sm"
                          isLoading = {loadingRegister}
                        >
                          registrar
                        </Button>
                      </div>

                      <Divider></Divider>

                      <div className="flex flex-col gap-3 justify-center">
                        <span
                          color="primary"
                          className="text-sm text-[#a4a4a4]"
                        >
                          Book Lines © 2024
                        </span>
                      </div>
                    </div>
                  </ModalFooter>
                </>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
