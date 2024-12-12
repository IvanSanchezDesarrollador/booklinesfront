import React, { ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

type Column = {
  name: string;
  uid: string;
  width: number;
};

type Data = { [key: string]: any };

type TableProps = {
  data: Data[];
  columns: Column[];
  renderCell?: (item: Data, columnKey: React.Key) => React.ReactNode;
  topContent: ReactNode;
  bottomContent: ReactNode;
  isLoading: boolean;
};

export const TableBase = ({
  data,
  columns,
  renderCell,
  topContent,
  bottomContent,
  isLoading,
}: TableProps) => {
  const defaultRenderCell = (item: Data, columnKey: React.Key) => {
    return item[columnKey as keyof Data];
  };

  return (
    <Table
      aria-label="Custom table"
      isHeaderSticky
      topContent={topContent}
      bottomContent={bottomContent}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      selectionMode="multiple"
      color={'warning'}
      className="border-none"
      classNames={{
        wrapper: "h-[38rem]",
      }}
      radius="sm"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No hay datos que mostrar"}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <div className="w-full h-[70rem] z-10 bg-zinc-50/80 flex items-center justify-center overflow-hidden">
            <Spinner color="warning" className="py-4 " label="Cargando datos ..." />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell
                  ? renderCell(item, columnKey)
                  : defaultRenderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
