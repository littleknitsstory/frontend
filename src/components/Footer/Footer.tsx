import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Formik, Form as FormikForm, FormikState } from "formik";
import * as Yup from "yup";
import { useAddSubscriptionMutation } from "@/services/features/api/apiSlice";
import { FormValues } from "../../services/types";
import { Store } from "react-notifications-component";
import { notificationSuccess, notificationError } from "@/components/Modals/Notification";
import footerLogo from "../../../public/images/footer-logo.svg";
import { FormsInput } from "../../components/utils/Forms";
import { ROUTES } from "../../services/routes";
import Image from "next/image";
import styles from "./footer.module.scss";

export default function Footer() {
  const { t } = useTranslation("footer");
  const [addSubscribe] = useAddSubscriptionMutation();
  const initialValue: FormValues = { email: "" };

  const checkError = (error: any): void => {
    if ("originalStatus" in error) {
      Store.addNotification({
        ...notificationError,
        title: "test",
      });
    }
    if ("data" in error) {
      if (error.data) {
        if (error.data.hasOwnProperty("email")) {
          Store.addNotification({
            ...notificationError,
            title: "error.data.email",
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
      const response = await addSubscribe(values).unwrap();
      if (response) {
        Store.addNotification({
          ...notificationSuccess,
          title: t("Notification.subscribed"),
        });
      }
    } catch (error) {
      checkError(error);
    } finally {
      resetForm();
    }
  };

  return (
    <footer>
      <div className="footer__flex-container">
        <div className="footer__about">
          <h2 className="footer__title">{t("about")}</h2>
          <nav className="footer__nav">
            <Link href="" className="footer__link">
              {t("history")}
            </Link>
            <Link href="" className="footer__link">
              FAQ
            </Link>
            <Link href="" className="footer__link">
              {t("ad")}
            </Link>
          </nav>
        </div>

        <div className="footer__contacts">
          <h2 className="footer__title">{t("contacts")}</h2>
          <nav className="footer__nav">
            <a
              href="https://www.facebook.com/littleknitsstory/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/littleknitsstory/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
            <a
              href="https://www.pinterest.ru/littleknitsstory/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Pinterest
            </a>
            <a
              href="https://vk.com/littleknitsstory"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              VK
            </a>
          </nav>
        </div>

        <div className="footer__subscribe">
          <h2 className="footer__title">{t("subscribe.title")}</h2>
          <p className="footer__text">{t("subscribe.text")}</p>
          <Formik
            initialValues={initialValue}
            validationSchema={Yup.object().shape({
              email: Yup.string().email(t("incorrectEmail")).required(t("required")),
            })}
            onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
          >
            <FormikForm className="footer__form" noValidate>
              <FormsInput
                className="footer__input"
                name="email"
                type="email"
                placeholder="e-mail"
                controlId={"formGroupEmail"}
              />
              <button className="btn btn--primary" type="submit">
                {t("subscribe.buttonText")}
              </button>
            </FormikForm>
          </Formik>
        </div>
      </div>

      <Link href={ROUTES.HOME}>
        <Image src={footerLogo} alt="Little Knits Story Logo" className="mt-5" />
        <h2 className="footer__logo-text">{t("title")}</h2>
      </Link>

      <div className="break-line"></div>

      <div className="footer__copyrights">
        <p className="footer__text--small">
          Little Knits Story {new Date().getFullYear()} | © All Rights Reserved
        </p>
        <Link href={ROUTES.PRIVACY_POLICY} className="footer__link footer__link--small">
          {t("policy")}
        </Link>
      </div>
    </footer>
  );
}
