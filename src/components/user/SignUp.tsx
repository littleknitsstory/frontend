import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikState } from "formik";
import { Store } from "react-notifications-component";
import * as Yup from "yup";
import "yup-phone-lite";
import eye from "../../assets/icons/eye.svg"
import { useSignUpMutation } from "../features/api/apiSlice";
import { FormsInput } from "../../components/utils/Forms";
import Spinner from "../utils/Spinner";
import { useNavigate } from "react-router-dom";
import { notificationError } from "../../components/modal/Notification";
import { ISignUp } from "../../app/types";

interface errorType {
  status: number;
  data: {
    [key: string]: string
  };
}

const SignUp = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [passwordConfirmShown, setPasswordConfirmShown] = useState<boolean>(false)
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
      const payload = await signUp({user: values, lang: i18n.language}).unwrap();
      localStorage.setItem("token", payload.access)
      navigate("/profile")
      resetForm();
    } catch (error) {
      const myError = error as errorType
      checkErrors(myError)
    }
  };

  const checkErrors = (error: errorType) => {
    const errorDataFields = Object.keys(error.data)
    errorDataFields.forEach(field => {
      Store.addNotification({
        ...notificationError,
        title: error.data[field],
      });
    })
  }

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
          .min(8, t("Forms.lengthMin8"))
          .max(30, t("Forms.lengthMax30"))
          .required(t("Forms.required"))
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, t("Forms.weakPassword")),
          // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "test"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
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
        <div className="input--with-icon">
          <FormsInput
            controlId={"confirmPassword"}
            type={passwordConfirmShown ? "text" : "password"}
            placeholder={t("FormFields.confirmPassword")}
            name="confirmPassword"
          />
          <img 
            onClick={() => setPasswordConfirmShown(prev => !prev)}
            src={eye} alt="eye-logo" 
            className="input__icon" 
          />
        </div>
        <button type="submit" className="btn sign__btn" >{t("Login.createAccount")}</button>
      </FormikForm>
    </Formik>
  )
}
export default SignUp