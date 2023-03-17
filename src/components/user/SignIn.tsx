import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ISignInCredentials, useSignInMutation } from "../features/api/apiSlice";
import { Formik, Form as FormikForm, FormikState } from "formik";
import { Store } from "react-notifications-component";
import * as Yup from "yup";
import "yup-phone-lite";

import { FormsInput } from "../../components/utils/Forms";
// import { ISignIn } from "../../app/types";
import { notificationError } from "../../components/modal/Notification";
import Spinner from "../utils/Spinner";
import eye from "../../assets/icons/eye.svg"

interface errorType {
  status: number;
  data: {
    email: string[],
    password: string[],
    username: string[],
    detail: string
  }
}

const SignIn = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const initialFormDataState: ISignInCredentials = {
    username: "",
    email: "",
    password: "",
  };

  const [ signIn, { isLoading }] = useSignInMutation()

  const getUserCredentials = (values: ISignInCredentials): ISignInCredentials => {
    let credentials = { ...values }
    const username = values.email.match(/[^@]*/)
    if (username !== null) {
      credentials = { ...values, username: username[0] }
    }
    return credentials
  }

  const handleFormSubmit = async (
    values: ISignInCredentials,
    resetForm: (nextState?: Partial<FormikState<ISignInCredentials>> | undefined) => void,
  ): Promise<void> => {
    const credentials = getUserCredentials(values)

    try {
      const payload = await signIn({credentials, lang: i18n.language}).unwrap();
      localStorage.setItem("token", payload.access)
      navigate("/profile")
      resetForm();
    } catch (error) {
      const myError = error as errorType
      Store.addNotification({
        ...notificationError,
        title: myError.data.detail,
      });
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Formik
      initialValues={initialFormDataState}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t("Forms.incorrectEmail"))
          .required(t("Forms.required")),
        password: Yup.string()
          .max(30, t("Forms.lengthMax30"))
          .required(t("Forms.required")),
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
            onClick={() => setPasswordShown(prev => !prev)}
            src={eye} alt="eye-logo" 
            className="input__icon" 
          />
        </div>
        <button type="submit" className="btn sign__btn">{t("Login.Login")}</button>
      </FormikForm>
    </Formik>
  )
}

export default SignIn