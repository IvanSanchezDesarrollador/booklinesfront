export interface LoginInterface {
    email : string,
    password : string,
    remember? : boolean
}

export interface ErrorsLogin {
    email?: string[] ;
  }

  export interface ModalLoginInteface {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    onClose: () => void;
  }