import { Modal, Form } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

interface ModalThanksProps {
  showModal: boolean,
  handleClose: () => void;
  message?: JSX.Element

}

const ModalThanks = ({showModal, handleClose, message}: ModalThanksProps) => {
  const {t} = useTranslation()

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header-without-border">
        <Modal.Title id="contained-modal-title-vcenter">
          {t("CardProduct.thanks")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-modal-thanks__text">
          {!message && 
          <>
            <p>
              {t("CardProduct.thanksText1")}
            </p>
            <p>
              {t("CardProduct.thanksText2")}
            </p>
          </>}
          {message}
        </div>
        <Link to={`/`}>
          <button className="btn btn_vinous btn_center card-modal-thanks__btn">
            <div className="btn__text btn__text_center">
              {t("CardProduct.backHome")}
            </div>
          </button>
        </Link>
      </Modal.Body>
    </Modal> 
  )
}
export default ModalThanks