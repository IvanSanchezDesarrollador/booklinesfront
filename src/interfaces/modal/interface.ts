type BackdropType = "opaque" | "blur" | "transparent";


export interface arraFileImg {
    nombre: string | null,
    fileImge: Blob | null,
}

export interface ComponetRemoveBolena extends Imagenv2 {
    fileimg?: Blob,
    nombre?: string
  }
  
  export interface Imagenv2 {
    id: string;
    url?: string;
  }
  
export interface ModalPropsUi {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    backdrop: BackdropType;
    croppedImage?: string,
    setCroppedImage?: React.Dispatch<React.SetStateAction<string>>
    setArchivoImg: React.Dispatch<React.SetStateAction<Blob | null>>
    setNombreImage: React.Dispatch<React.SetStateAction<string>>
    setFileArray?: React.Dispatch<React.SetStateAction<arraFileImg[]>>
    fileArray?: arraFileImg[];
    croppedImageArray?: string[],
    setCroppedImageArray?: React.Dispatch<React.SetStateAction<string[]>>
    croppedImageArrayEdit? : ComponetRemoveBolena[],
    SetCroppedImageArrayEdit? : React.Dispatch<React.SetStateAction<ComponetRemoveBolena[]>>
    id? : string,
    setId?: React.Dispatch<React.SetStateAction<string>>
    aspectX : number,
    aspectY : number,
}