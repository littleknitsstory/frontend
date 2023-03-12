import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import eye from "../../assets/icons/eye.svg"
import { useSignUpMutation } from "../features/api/apiSlice";
import Spinner from "../utils/Spinner";

const SignUp = () => {
  const { i18n, t } = useTranslation()
  const initialFormDataState = {
    email: "",
    password: "",
  };
  
  const [formData, setFormData] = useState(initialFormDataState);
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("")
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [passwordConfirmShown, setPasswordConfirmShown] = useState<boolean>(false)
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<{[key: string]: string[]}>({
    email: [],
    password: []
  })

  const [signUp, { data, isLoading, isError, error }] = useSignUpMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    if (name === "password") {
      setPasswordConfirmError("")
      setErrorMessage(prevState => {
        return {
          ...prevState,
          password: []
        }
      })
    }

    if (name === "email") {
      setErrorMessage(prevState => {
        return {
          ...prevState,
          email: []
        }
      })
    }

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setErrorMessage({
      email: [],
      password: []
    })

    if (formData.password === passwordConfirmInput) {
      if (!isLoading) {
        try {
          await signUp({user: formData, lang: i18n.language}).unwrap();
          
          setFormData(initialFormDataState);
          setPasswordConfirmInput("")
        } catch (error) {
          
          
        }
      }
    } else {
      setPasswordConfirmError("Пароли не совпадают")
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordConfirmError("")
    setPasswordConfirmInput(e.currentTarget.value)
  }
  
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
      password: []
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
          className={`form-control ${passwordConfirmError || errorMessage?.password.length > 0 ? "is-invalid" : ""}`}
          type={passwordShown ? "text" : "password"}
          placeholder={t("Login.LoginForm.password")}
          name="password"
          value={formData.password} 
          aria-label="password" 
          onChange={handleFormChange} 
        />
        <img 
          src={eye} 
          onClick={() => setPasswordShown(prev => !prev)} 
          alt="eye-icon" 
          className="input-group-text" 
        ></img>
      </div>

      <div className="input-group">
        <input 
          className={`form-control ${passwordConfirmError || errorMessage?.password.length > 0 ? "is-invalid" : ""}`}
          type={passwordConfirmShown ? "text" : "password"}
          placeholder={t("Login.LoginForm.confirmPassword")}
          name="passwordConfirm"
          value={passwordConfirmInput} 
          aria-label="password" 
          onChange={handleConfirmChange} 
        />
        <img 
          src={eye} 
          onClick={() => setPasswordConfirmShown(prev => !prev)} 
          alt="eye-icon" 
          className="input-group-text" 
        ></img>
      </div>
      <p className="sign__error-message">{passwordConfirmError}</p>
      {errorMessage?.password.map((item, i) => <p key={item} className="sign__error-message">{item}</p>)}
      
      <button type="submit" className="btn sign__btn" >{t("Login.createAccount")}</button>

      <p className="sign__policy">{t("Login.createPolicy")}</p>
    </Form>
  )
}
export default SignUp