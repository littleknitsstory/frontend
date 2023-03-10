import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation()
  const initialFormDataState = {
    username: "",
    email: "",
    password: "",
  };
  
  const [formData, setFormData] = useState(initialFormDataState);
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<errorType>()

  const [ signIn, { isError, error, isLoading }] = useSignInMutation()

  const togglePasswordShown = (): void => {
    setPasswordShown(prev => !prev)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
      if (!isLoading) {
        try {
          const data = await signIn({user: formData, lang: i18n.language}).unwrap();
          setFormData(initialFormDataState);
          sessionStorage.setItem("token", data.refresh)
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
            ...error.data as errorType
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
          className="form-control" 
          required
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          aria-label="username"
          onChange={handleFormChange} 
        />
      </div>
      {errorMessage?.username.map((item, i) => <p key={i} className="sign__error-message">{item}</p>)}

      <div className="input-group">
        <input
          className="form-control" 
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          aria-label="email"
          onChange={handleFormChange} 
        />
      </div>
      {errorMessage?.email.map((item, i) => <p key={i} className="sign__error-message">{item}</p>)}
      <div className="input-group">
        <input 
          className="form-control" 
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Password" 
          aria-label="password" 
          onChange={handleFormChange} 
        />
        <img src={eye} onClick={togglePasswordShown} alt="eye-icon" className="input-group-text" id="button-addon1"></img>
      </div>
      {errorMessage?.password.map((item, i) => <p key={i} className="sign__error-message">{item}</p>)}
      <p className="sign__error-message">{errorMessage?.detail}</p>
      <button type="submit" className="btn sign__btn">Войти</button>
    </Form>
  )
}
export default SignIn