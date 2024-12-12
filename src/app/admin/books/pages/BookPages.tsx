import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";
import { HeaderPageDashboard } from "../../../../components/ui/header-page-dashboard/HeaderPageDashboard";
import { TablaAllBooks } from "../../../../components/books/books-server/TablaAllBooks";
import { getBooksAll } from "../../../../service/books/BookApi";

const BookPages = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dataProduct,
    isLoading: loadingProduct,
    mutate: mutateProduct,
    error: errorProduct,
  } = useSWR(
    `/api/v1/books/load?search=${searchProduct}&page=${currentPage}`,
    getBooksAll,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  );

  const [actualizarTable, setActualizarTable] = useState<boolean>(false);

  const actulizarTabla = async () => {
    setActualizarTable(true);
    await mutateProduct();
    setActualizarTable(false);
  };

  return (
    <div className="px-4 py-4 w-full">
      <HeaderPageDashboard
        titulo="Libros"
        subtitulo="Aqui se mostraran todos los Libros"
      ></HeaderPageDashboard>

      <div className="mt-2">
        <Tabs
          variant="light"
          aria-label="Tabs variants"
          size={"md"}
          className="font-normal"
        >
          <Tab key="Todos los Productos" title="Todos los Productos">
            <div className="font-normal">
              <TablaAllBooks
                actualizarTablaFunc={actulizarTabla}
                actualizarTablaAction={actualizarTable}
                setSearch={setSearchProduct}
                search={searchProduct}
                data={dataProduct}
                loading={loadingProduct}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              ></TablaAllBooks>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BookPages;
