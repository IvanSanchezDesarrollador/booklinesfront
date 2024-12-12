import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { IoPushOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { ComponetRemoveBolena, ModalPropsUi } from "../../../interfaces/modal/interface";

export type SliderValue = number | number[];

export const ModalUi = ({
  isOpen,
  onClose,
  backdrop,
  setCroppedImage,
  setArchivoImg,
  setNombreImage,
  croppedImageArray,
  setCroppedImageArray,
  setFileArray,
  fileArray,
  SetCroppedImageArrayEdit,
  croppedImageArrayEdit,
  id,
  setId,
  aspectX,
  aspectY
}: ModalPropsUi) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [dataId, setDataId] = useState<string>();

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [nombreImagenProp, setNombreImagenProp] = useState<string>("");

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (id) {
      setDataId(id);
    }
  }, [dataId, id]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNombreImagenProp(file.name);
      setNombreImage(file.name);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearModal = () => {
    onClose();
    setImageSrc(null);
    setRotation(0);
    setZoom(1);
    if (setId) {
      setId("");
    }
  };

  const handleZoomChange = (value: SliderValue) => {
    console.log(value);
    setZoom(value as number);
  };

  const handleRotationChange = (value: SliderValue) => {
    console.log(value);
    setRotation(value as number);
  };

  useEffect(() => {
    const button = document.querySelector('button[aria-label="Close"]');
    if (button) {
      closeButtonRef.current = button as HTMLButtonElement;
      closeButtonRef.current.onclick = () => {
        console.log("Close button clicked");
        onClose();
        setImageSrc(null);
        setRotation(0);
        setZoom(1);
      };
    }
  }, [isOpen, onClose]);

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      //const fileImg = blobToFile(croppedImage.blob, nombreImg);

      setArchivoImg(croppedImage.blob);

      if (setFileArray && fileArray) {
        setFileArray([
          ...fileArray,
          { nombre: nombreImagenProp, fileImge: croppedImage.blob },
        ]);
      }

      if (setCroppedImage) {
        setCroppedImage(croppedImage.url);
      }

      if (setCroppedImageArray && croppedImageArray) {
        setCroppedImageArray([...croppedImageArray, croppedImage.url]);
        clearModal();
      }

      if (dataId !== "" && SetCroppedImageArrayEdit && croppedImageArrayEdit) {
        SetCroppedImageArrayEdit(
          croppedImageArrayEdit.map((img: ComponetRemoveBolena) =>
            img.id === dataId
              ? {
                  ...img,
                  url: croppedImage.url,
                  fileimg: croppedImage.blob,
                  nombre: nombreImagenProp,
                }
              : img
          )
        );
        clearModal();
      }

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      size="5xl"
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="w-full h-[45rem]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="faded"
                    aria-label="Take a photo"
                    onPress={handleButtonClick}
                  >
                    {imageSrc == null ? (
                      <IoPushOutline size={20} />
                    ) : (
                      <FaRegPenToSquare size={20}></FaRegPenToSquare>
                    )}
                  </Button>

                  {imageSrc == null ? (
                    <span>Cargar imagen</span>
                  ) : (
                    <span>Editar imagen</span>
                  )}
                </div>
              </div>

              {imageSrc && (
                <div className="w-full h-full">
                  <div className="absolute top-[60px] left-0 right-0 bottom-[150px] z-50">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspectX / aspectY}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      onRotationChange={setRotation}
                      rotation={rotation}
                    />
                  </div>

                  <div className="absolute bottom-16  left-1/2 w-3/4 transform -translate-x-1/2 h-[80px] flex items-center gap-3">
                    <Slider
                      label="Zoom"
                      value={zoom}
                      minValue={1}
                      maxValue={3}
                      step={0.1}
                      //aria-labelledby="Zoom"
                      onChange={handleZoomChange}
                    />

                    <Slider
                      label="Rotacion"
                      value={rotation}
                      minValue={0}
                      maxValue={360}
                      step={1}
                      //aria-labelledby=""
                      onChange={handleRotationChange}
                    />
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={clearModal}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onClick={showCroppedImage}
                isDisabled={imageSrc == null ? true : false}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
