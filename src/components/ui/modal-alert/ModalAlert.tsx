import { ModalAlertInterface } from "@/interfaces";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React from "react";

export const ModalAlert = ({
  isOpen,
  onOpen,
  onClose,
  DatosValidados,
  dataSendRegister,
  onFototModalOpen,
}: ModalAlertInterface) => {
  const enviarDatos = () => {
    if (dataSendRegister) {
      DatosValidados(dataSendRegister);
    }
  };

  const subirImagen = () => {
    onClose();

    setTimeout(() => {
      onFototModalOpen();
    }, 900);
  };
  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Alert</ModalHeader>
              <ModalBody>
                <div>Aun no ha subido una foto de perfil. Desea continuar?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={subirImagen}>
                  Subir imagen
                </Button>
                <Button color="primary" onClick={enviarDatos}>
                  Si
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
