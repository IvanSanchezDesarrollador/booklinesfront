
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import { IoAlertCircleOutline, IoCloseOutline } from "react-icons/io5";

import { FiAlertTriangle } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { MessageAlertInterface } from "../../../interfaces/message-alert/MessageAlertInterface";
/**
 *
 * Para el uso de este conponete el coponente >>>Padre<<< tiene que ser de tipo overflow: fidden
 * y position: realtive
 *     isVisibleMenssage: boolean,
    setIsVisibleMenssage: React.Dispatch<React.SetStateAction<boolean>>,
 * 
 * 
 */

type position = "absolute" | "fixed" | "sticky";

interface MensajeAlertaComponet {
  messageObject: MessageAlertInterface;
  isVisibleMenssage: boolean;
  setIsVisibleMenssage: React.Dispatch<React.SetStateAction<boolean>>;
  positionAlternative?: position;
}
export const MensajeAlert = ({
  messageObject,
  isVisibleMenssage,
  setIsVisibleMenssage,
  positionAlternative,
}: MensajeAlertaComponet) => {
  return (
    <div
      style={
        !positionAlternative
          ? { position: "fixed" }
          : { position: `${positionAlternative}` }
      }
      className={clsx(
        "top-2 right-2 left-2 rounded-lg border-2 p-2 z-50 shadow-md grid grid-cols-9 transition-transform duration-300 ease-in-out transform",
        isVisibleMenssage
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 ",
        {
          "border-red-400 bg-red-400": messageObject.tipo == "error",
          "border-green-500 bg-green-500": messageObject.tipo == "succes",
          "border-amber-500 bg-amber-300": messageObject.tipo == "warning",
        }
      )}
    >
      <div className="col-span-1 flex items-center justify-center">
        {messageObject.tipo == "error" && (
          <IoAlertCircleOutline size={30} className="text-red-700" />
        )}
        {messageObject.tipo == "succes" && (
          <FiCheck size={25} className="text-green-800"></FiCheck>
        )}
        {messageObject.tipo == "warning" && (
          <FiAlertTriangle
            size={25}
            className="text-amber-500"
          ></FiAlertTriangle>
        )}
      </div>
      <div className="col-span-7 flex items-center">
        <span className="text-white">{messageObject.mensaje}</span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        {!messageObject.accion ? (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            aria-label="Close"
            onClick={() => setIsVisibleMenssage(false)}
          >
            <IoCloseOutline className="text-white" size={20} />
          </Button>
        ) : (
          <>
            <Button
              className="bg-red-500"
              size="sm"
              aria-label="Close"
              onClick={() => setIsVisibleMenssage(false)}
            >
              Cancelar
            </Button>

            <Button
              isIconOnly
              className="bg-red-500"
              size="sm"
              aria-label="Close"
              onClick={() => {
                if (messageObject.funcAction) {
                  messageObject.funcAction();
                } else {
                  setIsVisibleMenssage(false);
                }
              }}
            >
              {messageObject.textAcrtion || "Action"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
