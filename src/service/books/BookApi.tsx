import { BookInterfaceSendPost } from "../../interfaces/book/interface";
import { MessageAlertInterface } from "../../interfaces/message-alert/MessageAlertInterface";
import axios from "../../lib/axios";

export const getBooksAll = async (url: any) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw error;
    }
  };


  export const PostNuevoBook = async ({
    sendEnviarDatos,
    setIsloadingSendProduct,
    setIsOpen,
    setIsVisible,
    objectMessage,
    setObjectMessage,
    actionActulizar,
  }: {
    sendEnviarDatos: BookInterfaceSendPost;
    setIsloadingSendProduct: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    objectMessage: MessageAlertInterface;
    setObjectMessage: React.Dispatch<React.SetStateAction<MessageAlertInterface>>;
    actionActulizar: () => void;
  }) => {
    setIsloadingSendProduct(true);
    const formData = new FormData();

  
    formData.append("title", sendEnviarDatos.title);
    formData.append("description", sendEnviarDatos.description);
    formData.append("price", sendEnviarDatos.price);
    formData.append("discountPercentage", sendEnviarDatos.discountPercentage);
    formData.append("rating", sendEnviarDatos.rating);
    formData.append("stock", sendEnviarDatos.stock);
    formData.append("author", sendEnviarDatos.author);
    formData.append("category", sendEnviarDatos.category);

  
    if (sendEnviarDatos.images) {
      sendEnviarDatos.images.forEach((image, index) => {
        if (image.fileImge && image.nombre) {
          formData.append(`images[${index}]`, image.fileImge, image.nombre);
        }
      });
    }

    if (sendEnviarDatos.thumbnail) {
      sendEnviarDatos.thumbnail.forEach((image, index) => {
        if (image.fileImge && image.nombre) {
          formData.append(`thumbnail[${index}]`, image.fileImge, image.nombre);
        }
      });
    }

  
    axios
      .post("/api/v1/books/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: any) => {
        setIsloadingSendProduct(false);
        setIsVisible(true);
        setObjectMessage({
          ...objectMessage,
          accion: false,
          mensaje: "Producto agregado correctamente",
          tipo: "succes",
        });
        actionActulizar();
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      })
      .catch((error) => {
        setIsloadingSendProduct(false);
        setIsVisible(true);
        setObjectMessage({
          ...objectMessage,
          accion: false,
          mensaje: "Error al crear el producto",
          tipo: "error",
        });
  
        if (error.response.status !== 422) throw error;
      });
  };
  