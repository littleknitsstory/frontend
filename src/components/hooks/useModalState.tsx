import { useState } from "react";

const useModalState = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);

  const handleShow = (): void => {
    setShowModal(true);
  };

  const handleShowThanks = (): void => {
    setShowModalThanks(true);
  };

  const handleClose = (): void => {
    setShowModal(false);
    setShowModalThanks(false);
  };

  const onSubmitOrder = (): void => {
    // e.preventDefault();
    setShowModal(false);
    setShowModalThanks(true);
  };

  return {
    showModal,
    setShowModal,
    showModalThanks,
    setShowModalThanks,
    handleShow,
    handleClose,
    onSubmitOrder,
    handleShowThanks,
  };
};
export default useModalState;
