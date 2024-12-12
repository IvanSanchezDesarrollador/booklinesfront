import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Spinner,
} from "@nextui-org/react";
import { CPrimaryEnterprice } from "../../../../config/Colors";
import useSWR from "swr";
import { getBooksAll } from "../../../../service/books/BookApi";
import { useEffect, useState } from "react";
import { GetBookLoad } from "../../../../interfaces/book/interface";
import { InterfacePagination } from "../../../../components/books/books-server/TablaAllBooks";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener término de búsqueda desde la URL
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  const [searchProduct, setSearchProduct] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataProducto, setDataProduct] = useState<GetBookLoad[]>([]);
  const [dataPagination, setDataPagination] = useState<InterfacePagination>();

  const {
    data: dataProduct,
    isLoading: loadingProduct,
    mutate: mutateProduct,
    error: errorProduct,
  } = useSWR(
    `/api/v1/store/loadProduts?search=${searchProduct}&page=${currentPage}`,
    getBooksAll,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  );

  // Sincronizar datos obtenidos con el estado
  useEffect(() => {
    if (dataProduct) {
      setDataProduct(dataProduct.data);
      setDataPagination(dataProduct.pagination);
    }
  }, [dataProduct]);

  // Actualizar URL al cambiar el término de búsqueda
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchProduct) {
      params.set("search", searchProduct);
    }
    navigate(`/books?${params.toString()}`, { replace: true });
  }, [searchProduct, navigate]);

  const handleNavigate = (id:any) => {
    navigate(`/books-detail/${id}`);
  };

  return (
    <div
      style={{ backgroundColor: CPrimaryEnterprice }}
      className="w-full h-auto pb-56"
    >
      <Divider></Divider>
      <div className="px-10 py-6">
        <Input
          isClearable
          className="w-full mb-5"
          placeholder="Buscar por nombre"
          size="lg"
          startContent={<IoSearchOutline size={20} />}
          value={searchProduct}
          onClear={() => setSearchProduct("")}
          onChange={(e) => setSearchProduct(e.target.value)}
        />

        {loadingProduct ? (
          <div className="w-full flex justify-center py-9">
            <Spinner color="warning" label="Cargando libros..." />;
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-7 ">
            {dataProducto.map((libro: GetBookLoad) => (
              <Card className="py-4" key={libro.id}>
                <CardBody className="overflow-visible py-2 flex  items-center">
                  <Image
                    alt="Card background"
                    className="object-cover object-top rounded-2xl h-[28rem] w-full"
                    src={`http://localhost:8000/storage/books/${libro.thumbnail[0].url}`}
                  />
                </CardBody>

                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      {libro.author}
                    </p>
                    <small className="text-default-500">{libro.category}</small>
                    <h4 className="font-bold text-large">{libro.title}</h4>
                    <div className="flex gap-2 my-2">
                      <Button color="warning" size="md" radius="sm">
                        Comprar ahora
                      </Button>
                      <Button
                        size="md"
                        radius="sm"
                        onPress={() => handleNavigate(libro.id)}
                      >
                        Detalles
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
