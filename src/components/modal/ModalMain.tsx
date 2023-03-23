import { Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { FormsInput } from "../../components/utils/Forms";
import { IProduct, FormValues } from "../../app/types";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";
interface ModalProps {
  product: IProduct;
  showModal: boolean;
  handleClose: () => void;
  onSubmitOrder: () => void;
}

const ModalMain = ({ product, showModal, handleClose, onSubmitOrder }: ModalProps) => {
  const { t } = useTranslation();

  const initialValue: FormValues = {
    name: "",
    phone_number: "",
  };

  const handleFormSubmit = (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): void => {
    onSubmitOrder();
    resetForm();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("CardProduct.modalTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-card__modal-quick-purchase-body">
          <img
            className="product-card__modal-quick-purchase-img"
            alt={product.image_alt}
            src={PICTURE_BASE_URL + product.image_preview}
          />
          <div className="product-card__modal-quick-purchase-descr">
            <div className="product-card__modal-quick-purchase-title">{product.title}</div>

            <div className="product-card__modal-quick-purchase-part-number">
              {t("CardProduct.partNumber")}: {product.code}
            </div>
            <div className="product-card__modal-quick-purchase-color">
              {t("CardProduct.color")}:
              <div className="product-card__modal-quick-purchase-color-circle-wrapper">
                {product.colors.map(({ color }) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="product-card__modal-quick-purchase-color-circle"
                  ></div>
                ))}
              </div>
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

        <Formik
          initialValues={initialValue}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(2, t("Forms.lengthRequired"))
              .max(30, t("Forms.lengthMax30"))
              .required(t("Forms.required")),
            phone_number: Yup.string()
              .phone("ME", t("Forms.incorrectPhone"))
              .required(t("Forms.required")),
          })}
          onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        >
          <FormikForm className="product-card__modal-form">
            <Row>
              <FormsInput
                className="mb-3"
                controlId={"formGroupModalName"}
                type="text"
                placeholder={t("FormFields.fullName")}           
                name="name"
              />
            </Row>
            <Row>
              <FormsInput
                className="mb-3"
                controlId={"formGroupModalPhone"}
                type="tel"
                placeholder={t("FormFields.phone")}
                name="phone_number"
              />
            </Row>

            <button type="submit" className="btn btn--primary btn--centered">
              {t("CardProduct.buttonSendText")}
            </button>
          </FormikForm>
        </Formik>

        {/* <Form onSubmit={onSubmitOrder}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control required type="text" placeholder={t("CardProduct.fullName")} autoFocus />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Control required type="text" placeholder={t("CardProduct.phone")} />
          </Form.Group>
          <button type="submit" className="btn btn_vinous btn_center">
            <div className="btn__text btn__text_center">{t("CardProduct.buttonSendText")}</div>
          </button>
        </Form> */}
        <div className="product-card__modal-quick-purchase-policy">
          {t("CardProduct.purchasePolice")}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalMain;
