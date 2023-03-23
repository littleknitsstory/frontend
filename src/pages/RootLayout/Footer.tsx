import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { useAddSubscriptionMutation } from "../../components/features/api/apiSlice";
import { FormValues } from "../../app/types";
import { Store } from "react-notifications-component";
import { notificationSuccess, notificationError } from "../../components/modal/Notification";
// components
import { FormsInput } from "../../components/utils/Forms";
import { ReactComponent as FooterLogo} from "../../assets/images/footer-logo.svg"

const Footer = () => {
  const { t } = useTranslation();
  const [addSubscribe] = useAddSubscriptionMutation();
  const initialValue: FormValues = { email: "" };

  const checkError = (error: any): void => {
    if ("originalStatus" in error) {
      Store.addNotification({
        ...notificationError,
        title: t("Notification.somethingWrong"),
      });
    }
    if ("data" in error) {
      if (error.data) {
        if (error.data.hasOwnProperty("email")) {
          Store.addNotification({
            ...notificationError,
            title: error.data.email,
          });
        }
      }
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
  ): Promise<void> => {
    try {
      const response = await addSubscribe(values).unwrap()
      if (response) {
        Store.addNotification({
          ...notificationSuccess,
          title: t("Notification.subscribed"),
        });
      }
    } catch (error) {
      checkError(error)
    } finally {
      resetForm()
    }
  };

  return (
    <footer>
      <div className="footer__flex-container">

        <div className="footer__about">
          <h2 className="footer__title">{t("Footer.about")}</h2>
          <nav className="footer__nav">
            <Link to="" className="footer__link">{t("Footer.history")}</Link>
            <Link to="" className="footer__link">FAQ</Link>
            <Link to="" className="footer__link">{t("Footer.ad")}</Link>
          </nav>
        </div>

        <div className="footer__contacts">
          <h2 className="footer__title">{t("Footer.contacts")}</h2>
          <nav className="footer__nav">
            <a 
              href="https://www.facebook.com/littleknitsstory/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__link"
            >Facebook
            </a>
            <a 
              href="https://www.instagram.com/littleknitsstory/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__link"
            >Instagram
            </a>
            <a 
              href="https://www.pinterest.ru/littleknitsstory/" 
              target="_blank" 
              rel="noreferrer"
              className="footer__link"
            >Pinterest
            </a>
            <a 
              href="https://vk.com/littleknitsstory" 
              target="_blank" 
              rel="noreferrer" 
              className="footer__link"
            >VK
            </a>
          </nav>
        </div>

        <div className="footer__subscribe">
          <h2 className="footer__title">{t("Footer.subscribe.title")}</h2>
          <p className="footer__text">{t("Footer.subscribe.text")}</p>
          
          <Formik
            initialValues={initialValue}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(t("Forms.incorrectEmail"))
                .required(t("Forms.required")),
            })}
            onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
          >
            <FormikForm className="footer__form">
              <FormsInput
                className="footer__input"
                name="email"
                type="email"
                placeholder="e-mail"
                controlId={"formGroupEmail"}
              />
              <button 
                className="btn btn--primary" 
                type="submit"
              >
                {t("Footer.subscribe.buttonText")}
              </button>
            </FormikForm>
          </Formik>
        </div>

      </div>
      
      <Link to="/">
        <FooterLogo className="footer__logo-img"/>
        <h2 className="footer__logo-text">{t("Footer.title")}</h2>
      </Link>

      <div className="break-line"></div>
      
      <div className="footer__copyrights">
        <p className="footer__text--small">
          Little Knits Story {new Date().getFullYear()} | © All Rights Reserved
        </p>
        <Link to="/privacyPolicy" className="footer__link footer__link--small">
          {t("Footer.policy")}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
