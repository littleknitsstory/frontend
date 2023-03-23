import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/icons/eye.svg"
import { useSignInMutation } from "../features/api/apiSlice";
import Spinner from "../utils/Spinner";

interface errorType {
  email: string[],
  password: string[],
  username: string[],
  detail: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const initialFormDataState = {
    username: "",
    email: "",
    password: "",
  };
  
  const [formData, setFormData] = useState(initialFormDataState);
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<errorType>(({
    email: [],
    password: [],
    username: [],
    detail: ""
  }))

  const [ signIn, { isError, error, isLoading, isSuccess }] = useSignInMutation()

  const togglePasswordShown = (): void => {
    setPasswordShown(prev => !prev)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    const beforeAtSign = /[^@]*/
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
        username: formData.email.match(beforeAtSign)![0]
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
      if (!isLoading) {
        try {
          const data = await signIn({user: formData, lang: i18n.language}).unwrap();
          setFormData(initialFormDataState);
          localStorage.setItem("tokens", JSON.stringify({ access: data.access, refresh: data.refresh }))
          navigate("/profile/")
        } catch (error) {
          console.log(error)
        }
      }
  };

  useEffect(() => {
    if (isError) {
      if ("data" in error!) {
        setErrorMessage(prevData => {
          return {
            ...prevData,
            ...error.data as {[key: string]: string[]}
          }
        })
      }
    
    } else setErrorMessage({
      email: [],
      password: [],
      username: [],
      detail: ""
    })
  }, [isError])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Form className="sign__form" onSubmit={handleFormSubmit} noValidate>

      <div className="input-group">
        <input
          className={`form-control ${errorMessage.email.length > 0 ? "is-invalid" : ""}`}
          required
          type="email"
          placeholder={t("Login.LoginForm.email")}
          name="email"
          value={formData.email}
          aria-label="email"
          onChange={handleFormChange} 
        />
      </div>
      {errorMessage?.email.map((item, i) => <p key={i} className="sign__error-message">{item}</p>)}

      <div className="input-group">
        <input 
          className={`form-control ${errorMessage.password.length > 0 ? "is-invalid" : ""}`}
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder={t("Login.LoginForm.password")}
          aria-label="password" 
          onChange={handleFormChange} 
        />
        <img src={eye} onClick={togglePasswordShown} alt="eye-icon" className="input-group-text" id="button-addon1"></img>
      </div>

      {errorMessage?.password.map((item, i) => <p key={i} className="sign__error-message">{item}</p>)}
      <p className="sign__error-message">{errorMessage?.detail}</p>
      <button type="submit" className="btn btn--primary btn--centered">{t("Login.Login")}</button>
    </Form>
  )
}

export default SignIn