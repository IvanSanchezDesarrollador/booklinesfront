import {
  Textarea,
  Button,
  Input,
  useDisclosure,
  Image,
  Progress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoTrashOutline, IoAddCircleOutline } from "react-icons/io5";
import { DrawerBase } from "../../drawer/DrawerBase";
import { MensajeAlert } from "../../ui/message-alert/MensajeAlert";
import { ModalUi } from "../../ui/modal/ModalUi";
import { ModalAlertBase } from "../../ui/modal-alert/ModalAlertBase";
import { MessageAlertInterface } from "../../../interfaces/message-alert/MessageAlertInterface";
import { BookInterfaceSendPost, BookSend } from "../../../interfaces/book/interface";
import { PostNuevoBook } from "../../../service/books/BookApi";

export interface arraFileImg {
  nombre: string | null;
  fileImge: Blob | null;
}

export interface ControlsPanel {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface PanelAgregarProducto extends ControlsPanel {
  actualizarTable: () => void;
}

export interface SendProducto {
  category_id: null;
  gender_id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  descuento: string;
}

export interface SendProductPost extends SendProducto {
  slug: string;
  imagenes: arraFileImg[];
  tags: string[];
}

export const PanelAgrerarBooks = ({
  isOpen,
  setIsOpen,
  actualizarTable,
}: PanelAgregarProducto) => {
  const [search, setSearch] = useState("");

  const [archivoImg, setArchivoImg] = useState<Blob | null>(null);

  const [archivoImgOne, setArchivoImgOne] = useState<Blob | null>(null);


  const [nombreImg, setNombreImage] = useState<string>("");
  const [nombreImgOne, setNombreImageOne] = useState<string>("");

  const [croppedImageArray, setCroppedImageArray] = useState<string[]>([]);

  const [croppedImageOne, setCroppedImageOne] = useState<string[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const [valueNombrePro, setValueNombrePro] = useState("");
  const [valueNombreAutor, setValueNombreAutor] = useState("");
  const [valueNombreCategory, setValueNombreCategory] = useState("");
  const [valueDescripPro, setValueDescripPro] = useState("");
  const [valuePrecio, setvaluPrecio] = useState("");
  const [valueRating, setvaluRating] = useState("");
  const [valueStock, setValueStock] = useState("");
  const [valueDescuento, setValueDescuento] = useState("");
  const [fileArray, setFileArray] = useState<arraFileImg[]>([]);
  const [fileOne, setFileOne] = useState<arraFileImg[]>([]);

  const [isloadingSendProduct, setIsloadingSendProduct] =
    useState<boolean>(false);

  const [isVisible, setIsVisible] = useState(false);
  const [objectMessage, setObjectMessage] = useState<MessageAlertInterface>({
    accion: false,
    mensaje: "",
    tipo: "error",
  });

  const [dataSendProductos, setDataSendProductos] = useState<
    SendProductPost | undefined
  >();
  const {
    isOpen: isFotoModalOpen,
    onOpen: onFototModalOpen,
    onClose: onFotoModalOnclose,
  } = useDisclosure();

  const {
    isOpen: isBaseModalOpen,
    onOpen: onBaseModalOpen,
    onClose: onBaseModalOnclose,
  } = useDisclosure();

  const {
    isOpen: isModalImageOne,
    onOpen: onOpenModalImagenOne,
    onClose: onModalImageOne,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookSend>();

  const onSubmit: SubmitHandler<BookSend> = async (data) => {

    if (fileArray.length < 3) {
      setIsVisible(true);
      setObjectMessage({
        ...objectMessage,
        accion: false,
        mensaje: "Un producto debe tener 2 imagenes",
        tipo: "error",
      });
      return;
    }

    if (fileOne.length < 1) {
      setIsVisible(true);
      setObjectMessage({
        ...objectMessage,
        accion: false,
        mensaje: "Un producto debe tener 1 thumbnail",
        tipo: "error",
      });
      return;
    }

    
    const dataSend: BookInterfaceSendPost = {
      ...data,
      price : parseFloat(data.price.toString()).toFixed(2),
      discountPercentage : parseFloat(data.discountPercentage.toString()).toFixed(1),
      rating : parseFloat(data.rating.toString()).toFixed(1),
      thumbnail : fileOne,
      images : fileArray,
    };

    console.log(dataSend);

    EnviarDatosNuevoProdcuto(dataSend);

  };

  const EnviarDatosNuevoProdcuto = (data: BookInterfaceSendPost) => {
    
    PostNuevoBook({
      sendEnviarDatos: data,
      setIsloadingSendProduct,
      setIsOpen,
      setIsVisible,
      objectMessage,
      setObjectMessage,
      actionActulizar: actualizarTable,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setValueNombrePro("");
      setValueDescripPro("");
      setvaluPrecio("");
      setCroppedImageArray([]);
      setCroppedImageOne([]);
      setFileArray([]);
      setFileOne([]);
      setIsVisible(false);
      setValueDescuento("");
      setValueNombreAutor("");
      setValueNombreCategory("");
      setValueStock("");
      setvaluRating("");
      reset(); // Reinicia el formulario cuando se cierra el panel
    }
  }, [isOpen, reset]);

  const onclickAction = () => {
    handleSubmit(onSubmit)();
  };

  const handleOpen = () => {
    onFototModalOpen();
  };

  const handleOpenOne = () => {
    onOpenModalImagenOne();
  };


  const removeImge = (image: any) => {
    setCroppedImageArray(
      croppedImageArray.filter((imageA) => imageA !== image)
    );
  };


  const removeImgeOne = (image: any) => {
    setCroppedImageOne(
      croppedImageOne.filter((imageA) => imageA !== image)
    );
  };


  const cambioPrecioValor = (value: string) => {
    const inputValue = value.replace(",", ".");
    setvaluPrecio(inputValue);
  };

  const cambioPrecioRating = (value: string) => {
    const inputValue = value.replace(",", ".");
    setvaluRating(inputValue);
  };

  const cambioDescuentoValor = (value: string) => {
    setValueDescuento("");
    const inputValue = value.replace(",", ".");

    const numericValue = parseInt(inputValue, 10);

    if (numericValue >= 0 && numericValue <= 100) {
      setValueDescuento(inputValue);
    } else if (numericValue < 0) {
      setValueDescuento("0");

      setIsVisible(true);
      setObjectMessage({
        ...objectMessage,
        accion: false,
        mensaje: "El descuento del producto debe estar entre 0% y 100%",
        tipo: "error",
      });
    } else if (numericValue > 100) {
      setValueDescuento("100");

      setIsVisible(true);
      setObjectMessage({
        ...objectMessage,
        accion: false,
        mensaje: "El descuento del producto debe estar entre 0% y 100%",
        tipo: "error",
      });
    }
  };

  return (
    <>
      <DrawerBase
        titulo="Agregar producto"
        subtitulo="Panel para agregar un producto"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onclick={onclickAction}
        widthDrawer={50}
      >
        {isloadingSendProduct ? (
          <div className="w-full flex flex-col">
            <Progress
              size="sm"
              color="warning"
              isIndeterminate
              aria-label="Loading..."
              className="w-full"
            />

            <span className="text-gray-700 font-normal text-sm py-2">
              Enviando datos...
            </span>
          </div>
        ) : (
          <div className="py-2 flex  flex-col gap-1 w-full h-full overflow-y-auto px-1 relative">
            <MensajeAlert
              isVisibleMenssage={isVisible}
              setIsVisibleMenssage={setIsVisible}
              messageObject={objectMessage}
            ></MensajeAlert>

            <div className="flex flex-col w-full gap-2 pb-5 relative">
              <Input
                {...register("title", { required: true })}
                type="text"
                label="Nombre"
                value={valueNombrePro}
                onValueChange={setValueNombrePro}
                radius="sm"
                labelPlacement="outside"
                placeholder="Ingrese el nombre"
              />
              {errors.title && (
                <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                  El nombre es requerido
                </span>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 pb-5 relative">
              <Textarea
                {...register("description", { required: true })}
                label="Description"
                labelPlacement="outside"
                placeholder="Ingresa una descripcion"
                disableAnimation
                disableAutosize
                className=""
                value={valueDescripPro}
                onValueChange={setValueDescripPro}
                classNames={{
                  base: "w-full ",
                  input: "resize-y min-h-[5rem]",
                }}
              />
              {errors.description && (
                <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                  La descripcion es requerida
                </span>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 pb-5 relative">
              <Input
                {...register("author", { required: true })}
                type="text"
                label="Autor"
                value={valueNombreAutor}
                onValueChange={setValueNombreAutor}
                radius="sm"
                labelPlacement="outside"
                placeholder="Ingrese el nombre"
              />
              {errors.author && (
                <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                  El autor es requerido
                </span>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 pb-5 relative">
              <Input
                {...register("category", { required: true })}
                type="text"
                label="Categoria"
                value={valueNombreCategory}
                onValueChange={setValueNombreCategory}
                radius="sm"
                labelPlacement="outside"
                placeholder="Ingrese el nombre"
              />
              {errors.category && (
                <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                  La categoria es requerido
                </span>
              )}
            </div>

            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col w-full gap-2 pb-5 relative">
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  label="Precio"
                  placeholder="0.00"
                  labelPlacement="outside"
                  value={valuePrecio}
                  onValueChange={cambioPrecioValor}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">S./</span>
                    </div>
                  }
                />

                {errors.price && (
                  <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                    El precio es requerido
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full gap-2 pb-5 relative">
                <Input
                  {...register("discountPercentage", { required: true })}
                  type="number"
                  label="Descuento"
                  placeholder="0"
                  labelPlacement="outside"
                  value={valueDescuento}
                  onValueChange={cambioDescuentoValor}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">%.</span>
                    </div>
                  }
                />

                {errors.discountPercentage && (
                  <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                    El descuento es requerido
                  </span>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col w-full gap-2 pb-5 relative">
                <Input
                  {...register("stock", { required: true })}
                  type="number"
                  label="Stock"
                  placeholder="0"
                  labelPlacement="outside"
                  value={valueStock}
                  onValueChange={setValueStock}
                />

                {errors.stock && (
                  <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                    El stock es requerido
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full gap-2 pb-5 relative">
                <Input
                  {...register("rating", { required: true })}
                  type="number"
                  label="Rating"
                  placeholder="0.00"
                  labelPlacement="outside"
                  value={valueRating}
                  onValueChange={cambioPrecioRating}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">||</span>
                    </div>
                  }
                />

                {errors.rating && (
                  <span className=" absolute bottom-0 text-xs font-extralight text-red-500">
                    El Rating es requerido
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="antialiased text-sm mb-3">Thumbnail</span>
              <div className="w-full h-auto bg-gray-100 rounded-lg p-3 flex gap-3 mt-2">
                {croppedImageOne.map((image: any) => (
                  <div
                    key={image}
                    className="w-[10rem] h-[10rem] overflow-hidden relative"
                    onMouseEnter={() => setHoveredIndex(image)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      alt="NextUI hero Image"
                      src={image}
                    />
                    <Button
                      color="danger"
                      variant="flat"
                      className={`absolute top-0  w-full h-full bg-slate-50/50 z-50 transition-opacity duration-300
                        ${hoveredIndex === image ? "opacity-100" : "opacity-0"}
                        `}
                      onPress={() => removeImgeOne(image)}
                    >
                      <IoTrashOutline size={35} color="danger"></IoTrashOutline>
                    </Button>
                  </div>
                ))}

                {croppedImageOne.length != 1 && (
                  <Button
                    color="warning"
                    variant="light"
                    className="w-[10rem] h-[10rem] rounded-lg border-dashed border-2 border-[#edcf5d]"
                    onPress={handleOpenOne}
                  >
                    <IoAddCircleOutline size={40}></IoAddCircleOutline>
                  </Button>
                )}
              </div>
            </div>


            <div>
              <span className="antialiased text-sm mb-3">Imagenes</span>
              <div className="w-full h-auto bg-gray-100 rounded-lg p-3 flex gap-3 mt-2">
                {croppedImageArray.map((image: any) => (
                  <div
                    key={image}
                    className="w-[10rem] h-[10rem] overflow-hidden relative"
                    onMouseEnter={() => setHoveredIndex(image)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      alt="NextUI hero Image"
                      src={image}
                    />
                    <Button
                      color="danger"
                      variant="flat"
                      className={`absolute top-0  w-full h-full bg-slate-50/50 z-50 transition-opacity duration-300
                        ${hoveredIndex === image ? "opacity-100" : "opacity-0"}
                        `}
                      onPress={() => removeImge(image)}
                    >
                      <IoTrashOutline size={35} color="danger"></IoTrashOutline>
                    </Button>
                  </div>
                ))}

                {croppedImageArray.length != 3 && (
                  <Button
                    color="warning"
                    variant="light"
                    className="w-[10rem] h-[10rem] rounded-lg border-dashed border-2 border-[#edcf5d]"
                    onPress={handleOpen}
                  >
                    <IoAddCircleOutline size={40}></IoAddCircleOutline>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DrawerBase>

      <ModalUi
        isOpen={isFotoModalOpen}
        onClose={onFotoModalOnclose}
        onOpen={onFototModalOpen}
        croppedImageArray={croppedImageArray}
        setCroppedImageArray={setCroppedImageArray}
        setArchivoImg={setArchivoImg}
        setFileArray={setFileArray}
        setNombreImage={setNombreImage}
        fileArray={fileArray}
        backdrop="blur"
        aspectX={1}
        aspectY={1}
      ></ModalUi>

      <ModalUi
        isOpen={isModalImageOne}
        onClose={onModalImageOne}
        onOpen={onOpenModalImagenOne}
        croppedImageArray={croppedImageOne}
        setCroppedImageArray={setCroppedImageOne}
        setArchivoImg={setArchivoImgOne}
        setFileArray={setFileOne}
        fileArray={fileOne}
        setNombreImage={setNombreImageOne}
        backdrop="blur"
        aspectX={3}
        aspectY={4}
      ></ModalUi>

      <ModalAlertBase
        isOpen={isBaseModalOpen}
        onOpen={onBaseModalOpen}
        onClose={onBaseModalOnclose}
        dataSend={dataSendProductos}
        dataSendFuncion={EnviarDatosNuevoProdcuto}
      ></ModalAlertBase>
    </>
  );
};
