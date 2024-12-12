export interface FileImg {
    nombre: string | null,
    fileImge: Blob | null,
}

export interface BookSend {
    title: string;
    description: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    author: string;
    category: string;
}

export interface BookInterfaceSendPost extends BookSend {
    thumbnail : FileImg[];
    images: FileImg[];
}


export interface ImageLoad {
    id: number;
    type: string; // Puede ser "thumbnail" o "image"
    url: string;
  }
  
  export interface GetBookLoad {
    id: number;
    title: string;
    description: string;
    author: string;
    category: string;
    price: string; // Usamos string porque el precio puede tener formato decimal con punto
    discountPercentage: number; // Descuento en porcentaje (ej. 30 significa 30%)
    rating: number; // Calificación decimal
    stock: number; // Stock disponible como número entero
    thumbnail: ImageLoad[]; // Lista de imágenes del tipo "thumbnail"
    imagenes: ImageLoad[]; // Lista de imágenes adicionales
    updated_at: string; // Fecha en formato ISO (ej. "2024-12-12T19:44:12.000000Z")
  }

  