import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../features/api/apiSlice";
import { Formik, Form as FormikForm, FormikState } from "formik";
import { Store } from "react-notifications-component";
import * as Yup from "yup";
import "yup-phone-lite";

import { FormsInput } from "../../components/utils/Forms";
import { notificationError } from "../../components/modal/Notification";
import Spinner from "../utils/Spinner";
import eye from "../../assets/icons/eye.svg";
import { ISignIn } from "../../app/types";
import { ROUTES } from "../../app/routes";

interface errorType {
  status: number;
  data: {
    email: string[];
    password: string[];
    username: string[];
    detail: string;
  };
}

const SignIn = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const initialFormDataState = {
    username: "",
    email: "",
    password: "",
  };

  const [signIn, { isLoading }] = useSignInMutation();

  const handleFormSubmit = async (
    values: ISignIn,
    resetForm: (nextState?: Partial<FormikState<ISignIn>> | undefined) => void,
  ): Promise<void> => {
    const username = values.email.split("@")[0];
    const credentials = { ...values, username };

    try {
      const payload = await signIn({ credentials, lang: i18n.language }).unwrap();
      const { access, refresh } = payload;
      localStorage.setItem("tokens", JSON.stringify({ access, refresh }));
      navigate(ROUTES.PROFILE);
      resetForm();
    } catch (error) {
      const myError = error as errorType;
      Store.addNotification({
        ...notificationError,
        title: myError.data.detail,
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={initialFormDataState}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(t("Forms.incorrectEmail")).required(t("Forms.required")),
        password: Yup.string().required(t("Forms.required")),
      })}
      onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
    >
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
        <button type="submit" className="btn btn--primary">
          {t("Login.Login")}
        </button>
      </FormikForm>
    </Formik>
  );
};

export default SignIn;
