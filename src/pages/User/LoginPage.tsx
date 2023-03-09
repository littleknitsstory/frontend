import { useState } from "react"
import Social from "../../components/Social"

const LoginPage = () => {
  const [selectedForm, setSelectedForm] = useState("signIn")

  const handleSelect = (arg: string): void => {
    setSelectedForm(arg)
  }
  // console.log(selectedForm)
  console.log(selectedForm === "signIn")

  return (
    <div className="login__wrapper">
      <div className="login__select-form">
        <button 
          className={`btn btn__link login__btn ${selectedForm === "signIn" ? "active" : ""}`}
          onClick={() => setSelectedForm("signIn")}
          >
          Вход
        </button>
        <button 
          className={`btn btn__link login__btn ${selectedForm === "signUp" ? "active" : ""}`}
          onClick={() => setSelectedForm("signUp")}
        >
          Регистрация
        </button>

      {/* Placeholder for Sign-in Sign-up forms */}

      </div>
      <div className="login__footer">
        <p className="login__forgot-password">Забыли пароль?</p>
        <p>Быстрый доступ с</p>
        <Social />
      </div>
    </div>
  )
}
export default LoginPage