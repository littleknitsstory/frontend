import { Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

interface ModalThanksProps {
  showModal: boolean;
  handleClose: () => void;
  message?: JSX.Element;
  title?: string;
  button: boolean;
}

const ModalThanks = ({showModal, handleClose, message, title, button}: ModalThanksProps) => {
  const { t } = useTranslation()

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
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-modal-thanks__text">
          {message}
        </div>
        <Link to={`/`}>
          {button && 
            <button className="btn btn_vinous btn_center card-modal-thanks__btn">
              <div className="btn__text btn__text_center">
                {t("CardProduct.backHome")}
              </div>
            </button>
          }
        </Link>
      </Modal.Body>
    </Modal> 
  )
}
export default ModalThanks