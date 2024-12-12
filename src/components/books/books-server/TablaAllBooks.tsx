
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import useSWR, { mutate } from "swr";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { BiAlignLeft } from "react-icons/bi";
import { IoReloadOutline } from "react-icons/io5";
import { TableBase } from "../../tabla/TablaBase";
import { IntefaceTablaBaseV1 } from "../../../interfaces/tabla/interface";
import { ProductoGet } from "../../../interfaces/product/interface";
import { MessageAlertInterface } from "../../../interfaces/message-alert/MessageAlertInterface";
import { PanelAgrerarBooks } from "./PanelAgrerarBooks";
import { PanelDetalleBooks } from "./PanelDetalleBooks";
import { formatNameMonth } from "../../../utils/date/DateFormat";
import { VerticalDotsIcon } from "../../tabla/VerticalDotsIcon";
import { GetBookLoad, ImageLoad } from "../../../interfaces/book/interface";


export interface InterfacePagination {
  current_page: number;
  last_page: number;
  links: PaginationLink[];
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
  per_page: number;
  total: number;
}
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface eliminarDatoId {
  id: string,
}


const columns = [
  { name: "Nombre", uid: "title", width: 10 },
  { name: "Precio", uid: "price", width: 5 },
  { name: "Descuento", uid: "discountPercentage", width: 5 },
  { name: "Thumbnail", uid: "thumbnail", width: 5 },
  { name: "Imagenes", uid: "imagenes", width: 10 },
  { name: "Categoria", uid: "category", width: 10 },
  { name: "Rating", uid: "rating", width: 5 },
  { name: "Stock", uid: "stock", width: 5 },
  { name: "Actualización", uid: "updated_at", width: 5 },
  { name: "Acciones", uid: "actions", width: 10 },
];

export const TablaAllBooks = ({
  actualizarTablaFunc,
  actualizarTablaAction,
  setSearch,
  data,
  loading,
  currentPage,
  search,
  setCurrentPage,
}: IntefaceTablaBaseV1) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenDetalles, setIsOpenDetalles] = useState(false);
  const [isOpenEditar, setIsOpenEditar] = useState(false);
  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [dataProducto, setDataProduct] = useState<GetBookLoad[]>([]);
  const [idProducto, setIdProducto] = useState<string>("");
  const [dataPagination, setDataPagination] = useState<InterfacePagination>();
  const [loadingEleminarProdcuto, setloadingEliminaProducto] =
    useState<number>(0);

  const [mensajeElimimarProducto, setMensajeEliminarProducto] =
    useState<string>("");

  const [isVisible, setIsVisible] = useState(false);
  const [objectMessage, setObjectMessage] = useState<MessageAlertInterface>({
    accion: false,
    mensaje: "",
    tipo: "error",
  });

  const {
    isOpen: isDeletModalOpen,
    onOpen: onDeletModalOpen,
    onClose: onDeleteModalOnclose,
  } = useDisclosure();

  console.log(data);
  
  useEffect(() => {
    if (data) {
      setDataProduct(data.data);
      setDataPagination(data.pagination);
    }
  }, [data, loading]);

  console.log("Prodcuto en su set : ", dataPagination);

  const renderCell = (item: any, columnKey: React.Key) => {
    const key = columnKey as keyof typeof item;
    switch (columnKey) {

      case "updated_at":
        return <span className="text-sm">{formatNameMonth(item.updated_at)}</span>;

      case "imagenes":
        return (
          <div className="flex gap-2 items-center">
            {item.imagenes.map((imagen: ImageLoad) => (
              <div
                key={imagen.id}
                className="w-[5rem] h-[5rem] overflow-hidden"
              >
                <Image
                  className="w-full h-full object-cover"
                  alt="NextUI hero Image"
                  src={`http://localhost:8000/storage/books/${imagen.url}`}
                />
              </div>
            ))}
          </div>
        );

        case "thumbnail":
        return (
          <div className="flex gap-2 items-center">
            {item.thumbnail.map((imagen: ImageLoad) => (
              <div
                key={imagen.id}
                className="w-[5rem] h-[5rem] overflow-hidden"
              >
                <Image
                  className="w-full h-full object-cover"
                  alt="NextUI hero Image"
                  src={`http://localhost:8000/storage/books/${imagen.url}`}
                />
              </div>
            ))}
          </div>
        );
        
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={1}
                  startContent={
                    <BiAlignLeft
                      className={
                        "text-xl text-default-500 pointer-events-none flex-shrink-0"
                      }
                    />
                  }
                  onPress={() => {
                    setIdProducto(item.id);
                    setIsOpenDetalles(true);
                  }}
                >
                  Detallles
                </DropdownItem>
                <DropdownItem
                  key={1}
                  startContent={
                    <BiEdit
                      size={20}
                      className="text-xl  text-default-500 pointer-events-none flex-shrink-0"
                    />
                  }
                  onPress={() => {
                    setIdProducto(item.id);
                    setIsOpenEditar(true);
                  }}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key={2}
                  onPress={() => {
                    setNombreProducto(item.nombre);
                    setIdProducto(item.id);
                    onDeletModalOpen();
                  }}
                  startContent={
                    <IoTrashOutline
                      size={20}
                      className="text-xl text-danger-500 pointer-events-none flex-shrink-0"
                    />
                  }
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return item[key];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre"
            startContent={<IoSearchOutline size={20} />}
            //value={filterValue}
            onClear={() => setSearch("")}
            //onValueChange={onSearchChange}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button
              color="warning"
              variant="light"
              startContent={
                <IoReloadOutline
                  className={`${actualizarTablaAction ? "animate-spin" : ""}`}
                  size={20}
                />
              }
              radius="sm"
              onPress={actualizarTablaFunc}
            >
              Actualizar
            </Button>

            <Button
              className="bg-[#edcf5d]"
              variant="solid"
              startContent={<IoAdd size={20} />}
              radius="sm"
              onPress={() => {
                setIsOpen(true);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
    );
  }, [actualizarTablaAction, actualizarTablaFunc, setSearch]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-[#272727]">Select</span>

        {dataPagination && (
          <>
            <Pagination
              isCompact
              showControls
              size="lg"
              showShadow
              color="warning"
              page={currentPage}
              total={dataPagination.last_page}
              onChange={setCurrentPage}
            />

            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={currentPage === 1}
                size="md"
                variant="flat"
                color="warning"
                onPress={() => {
                  if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                Anterior
              </Button>
              <Button
                isDisabled={currentPage === dataPagination.last_page}
                size="md"
                color="warning"
                variant="flat"
                onPress={() => {
                  if (currentPage != dataPagination.last_page) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }, [currentPage, dataPagination, setCurrentPage]);


  return (
    <>
      <TableBase
        data={dataProducto}
        columns={columns}
        renderCell={renderCell}
        topContent={topContent}
        bottomContent={bottomContent}
        isLoading={loading}
      />

      <PanelAgrerarBooks
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actualizarTable={actualizarTablaFunc}
      ></PanelAgrerarBooks>

      <PanelDetalleBooks
        isOpen={isOpenDetalles}
        setIsOpen={setIsOpenDetalles}
        id={idProducto}
      ></PanelDetalleBooks>
    </>
  );
};
