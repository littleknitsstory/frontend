import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikState } from "formik";
import { Store } from "react-notifications-component";
import * as Yup from "yup";
import "yup-phone-lite";
import eye from "../../assets/icons/eye.svg";
import { useSignUpMutation } from "../features/api/apiSlice";
import { FormsInput } from "../../components/utils/Forms";
import Spinner from "../utils/Spinner";
import { useNavigate } from "react-router-dom";
import { notificationError } from "../../components/modal/Notification";
import { ISignUp } from "../../app/types";
import { ReactComponent as Cross } from "../../assets/icons/cross-1.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";

interface errorType {
  status: number;
  data: {
    [key: string]: string;
  };
}

const SignUp = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState<boolean>(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const initialFormDataState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (
    values: ISignUp,
    resetForm: (nextState?: Partial<FormikState<typeof initialFormDataState>> | undefined) => void,
  ): Promise<void> => {
    try {
      const payload = await signUp({ user: values, lang: i18n.language }).unwrap();
      const { access, refresh } = payload;
      localStorage.setItem("tokens", JSON.stringify({ access, refresh }));
      navigate("/profile/");
      resetForm();
    } catch (error) {
      const myError = error as errorType;
      checkErrors(myError);
    }
  };

  const checkErrors = (error: errorType) => {
    const errorDataFields = Object.keys(error.data);
    errorDataFields.forEach((field) => {
      Store.addNotification({
        ...notificationError,
        title: error.data[field],
      });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }
  function containsNumber(str: string): boolean {
    const regex = /\d/;
    return regex.test(str);
  }
  function containsLetter(str: string): boolean {
    const regex = /[a-zA-Zа-яА-ЯёЁ]/;
    return regex.test(str);
  }
  function isLengthAtLeast8(str: string): boolean {
    const regex = /^.{8,}$/;
    return regex.test(str);
  }

  return (
    <Formik
      initialValues={initialFormDataState}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(t("Forms.incorrectEmail")).required(t("Forms.required")),
        password: Yup.string()
          .min(8, t("Forms.lengthMin8"))
          .max(30, t("Forms.lengthMax30"))
          .matches(/\d/, t("Forms.containOneNumber"))
          .matches(/[a-zA-Zа-яА-ЯёЁ]/, t("Forms.containOneLetter"))
          .required(t("Forms.required")),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
      })}
      onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
    >
      {({ errors, values }) => (
        <FormikForm className="contacts__form">
          <FormsInput
            controlId={"email"}
            type="email"
            placeholder={t("FormFields.email")}
            name="email"
          />
          <div className="input--with-icon">
            <FormsInput
              controlId={"password"}
              type={passwordShown ? "text" : "password"}
              placeholder={t("FormFields.password")}
              name="password"
            />
            <img
              onClick={() => setPasswordShown((prev) => !prev)}
              src={eye}
              alt="eye-logo"
              className="input__icon"
            />
          </div>

          <div className="requirements-hint">
            <h6 className="requirements-hint__title">{t("Forms.PasswordRequirement")}</h6>
            <div className="requirements-hint__rules">
              <div className="requirements-hint__rule">
                <div className="requirements-hint__rule__icon">
                  {(errors.password && errors.password === t("Forms.lengthMin8")) ||
                  (errors.password && values.password === "") ? (
                    <Cross />
                  ) : values.password === "" ? null : isLengthAtLeast8(values.password) ? (
                    <Check />
                  ) : (
                    <Cross />
                  )}
                </div>
                <span className="requirements-hint__rule__text">{t("Forms.lengthMin8")}</span>
              </div>
              <div className="requirements-hint__rule">
                <div className="requirements-hint__rule__icon">
                  {(errors.password && errors.password === t("Forms.containOneLetter")) ||
                  (errors.password && values.password === "") ? (
                    <Cross />
                  ) : values.password === "" ? null : containsLetter(values.password) ? (
                    <Check />
                  ) : (
                    <Cross />
                  )}
                </div>
                <span className="requirements-hint__rule__text">{t("Forms.containOneLetter")}</span>
              </div>
              <div className="requirements-hint__rule">
                <div className="requirements-hint__rule__icon">
                  {(errors.password && errors.password === t("Forms.containOneNumber")) ||
                  (errors.password && values.password === "") ? (
                    <Cross />
                  ) : values.password === "" ? null : containsNumber(values.password) ? (
                    <Check />
                  ) : (
                    <Cross />
                  )}
                </div>
                <span className="requirements-hint__rule__text">{t("Forms.containOneNumber")}</span>
              </div>
            </div>
          </div>

          <div className="input--with-icon">
            <FormsInput
              controlId={"confirmPassword"}
              type={passwordConfirmShown ? "text" : "password"}
              placeholder={t("FormFields.confirmPassword")}
              name="confirmPassword"
            />
            <img
              onClick={() => setPasswordConfirmShown((prev) => !prev)}
              src={eye}
              alt="eye-logo"
              className="input__icon"
            />
          </div>
          <button type="submit" className="btn btn--primary">
            {t("Login.createAccount")}
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};
export default SignUp;
