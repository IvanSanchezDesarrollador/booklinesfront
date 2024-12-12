export interface ProductoGet {
    id: string;
    nombre: string;
    descripcion: string;
    precio: string;
    descuento: number;
    slug: string;
    size: SizePro[];
    tag: Tag[];
    imagenes: Imagen[];
  }

  export interface SizePro {
    size_id: string;
    nombre: string;
    nombreCorto: string;
    stock: number;
  }

  export interface Tag {
    id: string;
    nombre: string;
    estado: boolean;
  }

  
export interface Imagen {
    id: string;
    url: string;
  }

  
