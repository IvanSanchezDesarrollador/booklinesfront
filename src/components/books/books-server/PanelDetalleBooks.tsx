
export interface Imagen {
    id: string;
    url: string;
  }

  export interface ControlsPanel {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  export interface PanelAgregarProducto extends ControlsPanel {
    actualizarTable: () => void;
  }
  
  export interface PanelId extends ControlsPanel {
    id: string
  }

  

import {
  Button,
  Card,
  CardBody,
  Image,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IoExpandOutline } from "react-icons/io5";

import { DrawerBase } from "../../drawer/DrawerBase";
import { getBooksAll } from "../../../service/books/BookApi";
import { formatNameMonth } from "../../../utils/date/DateFormat";
import { ModalFull } from "../../ui/modal-full/ModalFull";
import { GetBookLoad, ImageLoad } from "../../../interfaces/book/interface";

export const PanelDetalleBooks = ({ id, isOpen, setIsOpen }: PanelId) => {
  const seguridadId = id !== "";

  const {
    data: dataProductoDetalle,
    isLoading: loadingProductoDetalle,
    error: errorProductoDetalle,
  } = useSWR(
    seguridadId ? `/api/v1/books/detailsId?id=${id}` : null,
    getBooksAll,
    {
      revalidateOnFocus: false,
    }
  );

  const [data, setData] = useState<GetBookLoad>();

  useEffect(() => {
    if (dataProductoDetalle) {
      setData(dataProductoDetalle.data);
    }
  }, [dataProductoDetalle, id]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setData(undefined);
      }, 1000);
    }
  }, [isOpen]);

  const onclickAction = () => {};

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [obtenerurlImg, setObtenerurlImg] = useState<string>("");
  const {
    isOpen: isFotoModalOpen,
    onOpen: onFototModalOpen,
    onClose: onFotoModalOnclose,
  } = useDisclosure();
  return (
    <>
      <DrawerBase
        titulo="Detalle de producto"
        subtitulo="Panel para detallar un producto"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onclick={onclickAction}
        widthDrawer={56}
        accions={false}
      >
        {loadingProductoDetalle ? (
          <div className="w-full flex justify-center">
            <Spinner label="Obteniendo datos" color="default" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-3 px-2 overflow-y-auto">
            <div>
              <span className="text-xs font-semibold">Cambios</span>
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <Card shadow="none" className="bg-success-100">
                    <CardBody>
                      <span className="text-sm">Actualizacion</span>
                      <span className="text-xs text-gray-600 mt-1">
                        Fecha y hora
                      </span>
                      <p className="text-sm font-normal text-justify mt-1">
                        {data?.updated_at ? formatNameMonth(data.updated_at) : ""}
                      </p>
                    </CardBody>
                  </Card>
                </div>
                
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold">Titulo</span>
              <Card shadow="none" className="bg-[#f1f1f1]">
                <CardBody>
                  <p className="text-sm font-normal text-justify">
                    {data?.title}
                  </p>
                </CardBody>
              </Card>
            </div>

            <div>
              <span className="text-xs font-semibold">Descripcion</span>
              <Card shadow="none" className="bg-[#f1f1f1]">
                <CardBody>
                  <p className="text-sm font-normal text-justify">
                    {data?.description}
                  </p>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="col-span-1">
                <span className="text-xs font-semibold">Precio</span>

                <Card shadow="none" className="bg-[#f1f1f1]">
                  <CardBody>
                    <p className="text-sm font-normal text-justify">
                      {data?.price}
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className="col-span-1">
                <span className="text-xs font-semibold">Descuento</span>

                <Card shadow="none" className="bg-[#f1f1f1]">
                  <CardBody>
                    <p className="text-sm font-normal text-justify">
                      {data?.discountPercentage}
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className="col-span-1">
                <span className="text-xs font-semibold">Rating</span>

                <Card shadow="none" className="bg-[#f1f1f1]">
                  <CardBody>
                    <p className="text-sm font-normal text-justify">
                      {data?.rating}
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>


            
            <div className="grid grid-cols-2 gap-3">

              <div className="col-span-1">
                <span className="text-xs font-semibold">Stock</span>

                <Card shadow="none" className="bg-[#f1f1f1]">
                  <CardBody>
                    <p className="text-sm font-normal text-justify">
                      {data?.stock}
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className="col-span-1">
                <span className="text-xs font-semibold">Categoria</span>

                <Card shadow="none" className="bg-[#f1f1f1]">
                  <CardBody>
                    <p className="text-sm font-normal text-justify">
                      {data?.category}
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>



           
            <div>
              <span className="text-xs font-semibold ">Imagenes</span>
              <div className="flex gap-2">
                {data?.imagenes.map((img: ImageLoad ) => (
                  <>
                    <div
                      className="w-[30rem] h-[30rem] overflow-hidden relative"
                      onMouseEnter={() => setHoveredIndex(img.id)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Image
                        className="w-full h-full object-cover"
                        alt="NextUI hero Image"
                        src={`http://localhost:8000/storage/books/${img.url}`}
                      />

                      <Button
                        color="primary"
                        variant="flat"
                        className={`absolute top-0  w-full h-full bg-slate-50/50 z-50 transition-opacity duration-300
                        ${hoveredIndex === img.id ? "opacity-100" : "opacity-0"}
                        `}
                        onPress={() => {
                          setObtenerurlImg(
                            `http://localhost:8000/storage/books/${img.url}`
                          );
                          onFototModalOpen();
                        }}
                      >
                        <IoExpandOutline
                          size={35}
                          color="danger"
                        ></IoExpandOutline>
                      </Button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </DrawerBase>

      <ModalFull
        data={obtenerurlImg}
        setData={setObtenerurlImg}
        isOpen={isFotoModalOpen}
        onClose={onFotoModalOnclose}
        onOpen={onFototModalOpen}
      ></ModalFull>
    </>
  );
};
