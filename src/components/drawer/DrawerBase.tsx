import { Button, Divider } from "@nextui-org/react";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface DrawerInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  titulo: string;
  subtitulo: string;
  closeDefaul?: boolean;
  accions?: boolean;
  widthDrawer?: number;
  onclick: () => void;
  disabled?: boolean;
  headerVisble?: boolean;
  controlsMargin?: boolean;
}

export const DrawerBase = ({
  children,
  isOpen,
  setIsOpen,
  closeDefaul = false,
  accions = true,
  onclick,
  widthDrawer = 40,
  titulo,
  subtitulo,
  disabled = false,
  headerVisble = true,
  controlsMargin = true,
}: DrawerInterface) => {
  return (
    <div
      className={
        " fixed overflow-hidden z-50 backdrop-blur-sm bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          ` w-screen right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ` +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
        style={{ maxWidth: `${widthDrawer}%` }}
      >
        <article
          className={`relative ${
            controlsMargin ? "pb-10 px-8 py-4 " : ""
          }flex flex-col overflow-y-auto h-full`}
        >
          {headerVisble == true && (
            <>
              <header className="flex justify-between w-full h-[6%]">
                <div className="flex flex-col gap-1">
                  <span
                    className={`  font-normal text-2xl`}
                  >
                    {titulo}
                  </span>
                  <span
                    className={` font-light text-xs`}
                  >
                    {subtitulo}
                  </span>
                </div>

                <Button
                  isIconOnly
                  color="default"
                  aria-label="Like"
                  radius="sm"
                  size="sm"
                  variant="light"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseOutline size={20} />
                </Button>
              </header>

              <div className="h-[2%] flex items-center">
                <Divider className=""></Divider>
              </div>
            </>
          )}

          <div
            className={clsx("w-full overflow-hidden", {
              "h-[84%]": accions == true && headerVisble == true,
              "h-[92%]":
                (accions == false && headerVisble == true) ||
                (accions == true && headerVisble == false),
              "h-[100%]": accions == false && headerVisble == false,
            })}
          >
            {children}
          </div>

          {accions == true && (
            <>
              <div className="h-[2%] flex items-center">
                <Divider className=""></Divider>
              </div>

              <div className="h-[6%] flex gap-2 py-3">
                <Button
                  onClick={onclick}
                  radius="sm"
                  
                  isDisabled={disabled}
                  className="w-24 bg-[#edcf5d]"
                >
                  Guardar
                </Button>
                <Button
                  radius="sm"
                  color="default"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </article>
      </section>

      {closeDefaul && (
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      )}
    </div>
  );
};
