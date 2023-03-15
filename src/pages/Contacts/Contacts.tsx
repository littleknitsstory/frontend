import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useAddContactsMutation } from "../../components/features/api/apiSlice";
import useModalState from "../../components/hooks/useModalState";
import ModalThanks from "../../components/modal/ModalThanks";
import { FormsInput } from "../../components/utils/Forms";
import { FormValues } from "../../app/types";
// assets
import envelope from "../../assets/icons/envelope.svg";
import map from "../../assets/icons/map-point.svg";
import phone from "../../assets/icons/phone.svg";

const Contacts = () => {
  const { t } = useTranslation();
  const [addContacts] = useAddContactsMutation();
  const { showModalThanks, handleShowThanks, handleClose } = useModalState();

  const initialFormDataState: FormValues = {
    name: "",
    message: "",
    email: "",
    company: "",
    phone_number: "",
  };

  const handleFormSubmit = (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): void => {
    addContacts(values);
    handleShowThanks();
    resetForm();
  };

  return (
    <section className="contacts">
      <Container>
        <Row>
          <Col
            xs={{ span: 12, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
            xxl={{ span: 6, offset: 3 }}
          >
            <div className="coffee-card">
              <div className="coffee-card__title">{t("Contacts.title")}</div>
              <Formik
                initialValues={initialFormDataState}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .min(2, t("Forms.lengthRequired"))
                    .max(30, t("Forms.lengthMax30"))
                    .required(t("Forms.required")),
                  email: Yup.string()
                    .email(t("Forms.incorrectEmail"))
                    .required(t("Forms.required")),
                  phone_number: Yup.string()
                    .phone("ME", t("Forms.incorrectPhone"))
                    .required(t("Forms.required")),
                  company: Yup.string().max(30, t("Forms.lengthMax30")),
                  message: Yup.string().max(100, t("Forms.lengthMax100")),
                })}
                onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
              >
                <FormikForm className="contacts__form">
                  <Row>
                    <FormsInput
                      col={6}
                      controlId={"name"}
                      type="text"
                      placeholder={t("Contacts.name")}
                      name="name"
                    />
                    <FormsInput
                      col={6}
                      controlId={"theme"}
                      type="text"
                      placeholder={t("Contacts.subject")}
                      name="company"
                    />
                  </Row>

                  <Row>
                    <FormsInput
                      col={12}
                      controlId={"phone"}
                      type="tel"
                      placeholder={t("Contacts.phone")}
                      name="phone_number"
                    />

                    <FormsInput
                      col={12}
                      controlId={"email"}
                      type="text"
                      placeholder="Е-mail"
                      name="email"
                    />
                  </Row>
                  <Row>
                    <FormsInput
                      as="textarea"
                      col={12}
                      controlId={"message"}
                      placeholder={t("Contacts.message")}
                      name="message"
                    />
                  </Row>
                  <button className="btn btn_white btn_center contacts__btn" type="submit">
                    <div className="btn__text btn__text_center">{t("Contacts.send")}</div>
                  </button>
                </FormikForm>
              </Formik>

              <div className="contacts__policy">{t("Contacts.policy")}</div>
            </div>
          </Col>
        </Row>
        <div className="contacts__info">
          <Row>
            <Col
              xs={{ span: 12, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 2 }}
              xl={{ span: 6, offset: 3 }}
              xxl={{ span: 6, offset: 3 }}
            >
              <div className="title">{t("Contacts.contactInfo")}</div>
              <div className="contacts__wrapper-info">
                <img src={map} alt="map" />
                <div className="contacts__text">Montenegro, Budva</div>
              </div>
              <div className="contacts__wrapper-info">
                <img src={phone} alt="phone" />
                <a href="tel:+38267000000" className="contacts__text">
                  +382 67 00 00 00
                </a>
              </div>
              <div className="contacts__wrapper-info">
                <img src={envelope} alt="envelope" />
                <a href="mailto:littleknitsstory@mail.com" className="contacts__text">
                  littleknitsstory@mail.com
                </a>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-modal-thanks">
          <ModalThanks
            showModal={showModalThanks}
            handleClose={handleClose}
            button={true}
            title={t("Modal.titleThanks.thanks")}
            message={<p>{t("Modal.thanksText.contacts")}</p>}
          />
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
