import { useState } from "react";
import { Form } from "react-bootstrap";
import eye from "../../assets/icons/eye.svg"

const SignUp = () => {
  const initialFormDataState = {
    email: "",
    password: "",
    password_confirm: ""
  };
  
  const [formData, setFormData] = useState(initialFormDataState);
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [passwordConfirmShown, setPasswordConfirmShown] = useState<boolean>(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

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
        <img src={eye} onClick={() => setPasswordShown(prev => !prev)} alt="eye-icon" className="input-group-text" id="button-addon1"></img>
      </div>
      <div className="input-group">
        <input 
          className="form-control" 
          type={passwordConfirmShown ? "text" : "password"}
          placeholder="Password" 
          aria-label="password" 
          onChange={handleFormChange} 
        />
        <img src={eye} onClick={() => setPasswordConfirmShown(prev => !prev)} alt="eye-icon" className="input-group-text" id="button-addon1"></img>
      </div>
      <button type="submit" className="btn sign__btn">Создать учетную запись</button>
    </Form>
  )
}
export default SignUp