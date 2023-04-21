import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import PhoneInput from "react-phone-number-input";
import { useAddContactsMutation } from "../../components/features/api/apiSlice";
import useModalState from "../../components/hooks/useModalState";
import ModalThanks from "../../components/modal/ModalThanks";
import { FormsInput } from "../../components/utils/Forms";
import { FormValues } from "../../app/types";
import "react-phone-number-input/style.css";
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
    setFieldValue: (field: string, value: any) => void,
  ): void => {
    addContacts(values);
    handleShowThanks();
    resetForm();
    setFieldValue("phone_number", "");
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
                    .required(t("Forms.required"))
                    .max(15, t("Forms.lengthMax15")),
                  company: Yup.string().max(30, t("Forms.lengthMax30")),
                  message: Yup.string()
                    .max(100, t("Forms.lengthMax100"))
                    .required(t("Forms.required")),
                })}
                onSubmit={(values, { resetForm, setFieldValue }) => {
                  handleFormSubmit(values, resetForm, setFieldValue);
                }}
              >
                {({ values, setFieldValue, errors }) => (
                  <FormikForm className="contacts__form">
                    <Row>
                      <FormsInput
                        col={6}
                        controlId={"name"}
                        type="text"
                        placeholder={t("FormFields.name")}
                        name="name"
                      />
                      <FormsInput
                        col={6}
                        controlId={"theme"}
                        type="text"
                        placeholder={t("FormFields.subject")}
                        name="company"
                      />
                    </Row>

                    <Row>
                      <div className={errors.phone_number && "PhoneInputInputError"}>
                        <PhoneInput
                          id="phone_number"
                          name="phone_number"
                          placeholder={t("FormFields.phone")}
                          value={values.phone_number}
                          onChange={(value) => setFieldValue("phone_number", value)}
                        />
                      </div>

                      {errors.phone_number && <p className="form-error">{errors.phone_number}</p>}

                      <FormsInput
                        col={12}
                        controlId={"email"}
                        type="text"
                        placeholder={t("FormFields.email")}
                        name="email"
                      />
                    </Row>
                    <Row>
                      <FormsInput
                        as="textarea"
                        col={12}
                        controlId={"message"}
                        placeholder={t("FormFields.message")}
                        name="message"
                      />
                    </Row>
                    <button type="submit" className="btn btn--primary">
                      {t("Contacts.send")}
                    </button>
                    {/* <button className="btn btn_white btn_center contacts__btn" type="submit">
                    <div className="btn__text btn__text_center">{t("Contacts.send")}</div>
                  </button> */}
                  </FormikForm>
                )}
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
