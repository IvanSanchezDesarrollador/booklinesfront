import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getBooksAll } from "../../../../service/books/BookApi";
import { useEffect, useState } from "react";
import { GetBookLoad, ImageLoad } from "../../../../interfaces/book/interface";
import {
  Spinner,
  Card,
  CardBody,
  Button,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { IoExpandOutline } from "react-icons/io5";
import { formatNameMonth } from "../../../../utils/date/DateFormat";
import { ModalFull } from "../../../../components/ui/modal-full/ModalFull";

export const BookDetailPage = () => {
  const { id } = useParams(); // Obtén el parámetro ID de la URL

  const {
    data: dataProductoDetalle,
    isLoading: loadingProductoDetalle,
    error: errorProductoDetalle,
  } = useSWR(id ? `/api/v1/store/detailsId?id=${id}` : null, getBooksAll, {
    revalidateOnFocus: false,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [data, setData] = useState<GetBookLoad>();
  const [obtenerurlImg, setObtenerurlImg] = useState<string>("");
  const {
    isOpen: isFotoModalOpen,
    onOpen: onFototModalOpen,
    onClose: onFotoModalOnclose,
  } = useDisclosure();

  useEffect(() => {
    if (dataProductoDetalle) {
      setData(dataProductoDetalle.data);
    }
  }, [dataProductoDetalle, id]);

  return (
    <div>
      {loadingProductoDetalle ? (
        <div className="w-full flex justify-center">
          <Spinner label="Obteniendo datos" color="default" />
        </div>
      ) : (
        <div className="w-full h-full flex gap-3 px-2 overflow-y-auto">
            <div>
            <div>
              <span className="text-xs font-semibold ">Imagenes</span>
              <div className="flex gap-2">
                {data?.imagenes.map((img: ImageLoad) => (
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
          <div>
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
          </div>

          
        
        </div>
      )}

      <ModalFull
        data={obtenerurlImg}
        setData={setObtenerurlImg}
        isOpen={isFotoModalOpen}
        onClose={onFotoModalOnclose}
        onOpen={onFototModalOpen}
      ></ModalFull>
    </div>
  );
};
