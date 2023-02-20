import { Modal, Form } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { IProduct } from "../../../api/models"

interface ModalProps {
  product: IProduct;
  showModal: boolean;
  handleClose: () => void;
  onSubmitOrder: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ModalMain = ({ product, showModal, handleClose, onSubmitOrder }: ModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t("CardProduct.modalTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-card__modal-quick-purchase-body">
          <img
            className="product-card__modal-quick-purchase-img"
            alt={product.image_alt}
            src={`${product.image_preview}`}
          />
          <div className="product-card__modal-quick-purchase-descr">
            <div className="product-card__modal-quick-purchase-title">
              {product.title}
            </div>

            <div className="product-card__modal-quick-purchase-part-number">
              {t("CardProduct.partNumber")}:
            </div>
            <div className="product-card__modal-quick-purchase-color">
              {t("CardProduct.color")}:
            </div>
            <div className="product-card__modal-quick-purchase-wrapper">
              <div className="product-card__modal-quick-purchase-wrapper-price">
                {product.sale ?? product.price}
              </div>
              <div className="product-card__modal-quick-purchase-wrapper-discount">
                {t("CardProduct.sale")}
              </div>
            </div>
          </div>
        </div>

        <Form onSubmit={onSubmitOrder}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              required
              type="text"
              placeholder={t('CardProduct.fullName')}
              autoFocus
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Control required type="text" placeholder={t('CardProduct.phone')} />
          </Form.Group>
          <button type="submit" className="btn btn_vinous btn_center">
            <div className="btn__text btn__text_center">
              {t("CardProduct.buttonSendText")}
            </div>
          </button>
        </Form>
        <div className="product-card__modal-quick-purchase-policy">
          {t("CardProduct.purchasePolice")}
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ModalMain