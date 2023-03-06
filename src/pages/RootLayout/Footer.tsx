import { Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { useAddSubscriptionMutation } from "../../components/features/api/apiSlice";
import { FormValues } from "../../app/types";
// components
import Social from "../../components/Social";
import PrimaryNav from "../../components/primary-nav/PrimaryNav";
import useModalState from "../../components/hooks/useModalState";
import ModalThanks from "../../components/modal/ModalThanks";
import { FormsInput } from "../../components/utils/Forms";

const Footer = () => {
  const { t } = useTranslation();
  const [addSubscribe] = useAddSubscriptionMutation();
  const { showModalThanks, handleShowThanks, handleClose } = useModalState();

  const initialValue: FormValues = {
    email: "",
  };

  const handleFormSubmit = (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): void => {
    addSubscribe(values);
    handleShowThanks();
    resetForm();
  };

  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <Link to="/">
                <div className="footer__subtitle">{t("Footer.subtitle")}</div>
                <div className="footer__title">Little Knits Story</div>
              </Link>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__navbar">
                    <PrimaryNav type={"footer"} />
                  </div>
                </Col>
                {/* Temporary comment out */}
                {/* <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__links-account">
                    <div className="footer__links-account footer__links-account-title">
                      личный кабинет
                    </div>
                    <ul>
                      <li>
                        <a href="#">Войти</a>
                      </li>
                      <li>
                        <a href="#">Корзина</a>
                      </li>
                      <li>
                        <a href="#">Сохраненные товары</a>
                      </li>
                    </ul>
                  </div>
                </Col> */}
              </Row>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subscribe">
                <div className="footer__subscribe-text">{t("Footer.subscribe.text")}</div>

                <Formik
                  initialValues={initialValue}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email(t("Contacts.incorrectEmail"))
                      .required(t("Contacts.required")),
                  })}
                  onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
                >
                  <FormikForm>
                    <FormsInput
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      controlId={"formGroupEmail"}
                    />
                    <button className="btn btn_border footer__btn" type="submit">
                      <div className="btn__text btn__text_center">
                        {t("Footer.subscribe.buttonText")}
                      </div>
                    </button>
                  </FormikForm>
                </Formik>
              </div>

              <Social />
            </Col>
          </Row>
        </div>
        <ModalThanks
          showModal={showModalThanks}
          handleClose={handleClose}
          title={t("Modal.titleThanks.thanks")}
          button={false}
          message={
            <>
              <p>{t("Modal.thanksText.subscription")}</p>
            </>
          }
        />

        <div className="footer__end">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__rights">
                Little Knits Story {new Date().getFullYear()} | All Rights Reserved
              </div>
            </Col>

            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <Link to="/privacyPolicy" className="footer__policy">
                {t("Footer.policy")}
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
