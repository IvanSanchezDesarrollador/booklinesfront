'use client';

import { ModalInterfaceBase } from "@/interfaces";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React from "react";

export const ModalAlertBase = ({
  isOpen,
  onClose,
  onOpen,
  dataSendFuncion,
  dataSend,
}: ModalInterfaceBase) => {
  const funcionAction = () => {
    dataSendFuncion(dataSend);
  };

  return (
    <>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Alert</ModalHeader>
              <ModalBody>
                <div>
                  El stock en todas las tallas del prodcuto es 0, Desea
                  continuar?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={funcionAction}>
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
