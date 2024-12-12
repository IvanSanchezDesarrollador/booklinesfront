export interface IntefaceTablaBaseV1 {
    actualizarTablaFunc: () => void;
    actualizarTablaAction: boolean;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    data: any;
    loading: boolean;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }