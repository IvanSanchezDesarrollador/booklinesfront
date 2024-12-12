import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { IoContractOutline } from "react-icons/io5";


interface ModalBase {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


export interface imgeFullModalInterface extends ModalBase {
  data: string,
  setData: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalFull = ({
  isOpen,
  onClose,
  data,
  setData,
}: imgeFullModalInterface) => {
  const resetModal = () => {
    onClose();
    setData("");
  };
  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}  size={"full"}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className="w-full flex-col flex justify-center items-center h-full gap-2">
                  <div className="w-[50rem] h-[50rem] overflow-hidden">
                    <Image
                      className="w-full h-full object-cover"
                      alt="NextUI hero Image"
                      src={data}
                    ></Image>
                  </div>
                  <Button isIconOnly color="primary" variant="flat" onPress={resetModal}>
                 <IoContractOutline size={25}></IoContractOutline>
                </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
