import { useState } from "react";

const useModalState = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);

  const handleShow = (): void => {
    setShowModal(true);
  };
  const handleClose = (): void => {
    setShowModal(false);
    setShowModalThanks(false);
  };

  const handleCloseThanks = (): void => {
    setShowModalThanks(false)
  }
  const onSubmitOrder = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowModal(false);
    setShowModalThanks(true);
  };

  return {showModal, setShowModal, showModalThanks, setShowModalThanks, handleShow, handleClose, handleCloseThanks, onSubmitOrder}
}
export default useModalState