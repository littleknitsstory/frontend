import { useState } from "react";
import { Form } from "react-bootstrap";
import eye from "../../assets/icons/eye.svg"

const SignIn = () => {
  const initialFormDataState = {
    email: "",
    password: ""
  };
  
  const [formData, setFormData] = useState(initialFormDataState);
  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const togglePasswordShown = (): void => {
    setPasswordShown(prev => !prev)
  }

  return (
    <Form className="sign__form">
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
      <div className="input-group">
        <input 
          className="form-control" 
          type={passwordShown ? "text" : "password"}
          placeholder="Password" 
          aria-label="password" 
          onChange={handleFormChange} 
        />
        <img src={eye} onClick={togglePasswordShown} alt="eye-icon" className="input-group-text" id="button-addon1"></img>
      </div>
      <button type="submit" className="btn sign__btn">Войти</button>
    </Form>
  )
}
export default SignIn