import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetFeaturesQuery } from "../../components/features/api/featuresSlice";
import Social from "../../components/Social";
import SignIn from "../../components/user/SignIn";
import SignUp from "../../components/user/SignUp";

const LoginPage = () => {
  const { data } = useGetFeaturesQuery();
  const [selectedForm, setSelectedForm] = useState("signIn");
  const { t } = useTranslation();

  return (
    <div className="login__wrapper">
      {data?.account ? (
        <>
          <div className="login__select-form">
            <button
              className={`btn btn__link login__btn ${selectedForm === "signIn" ? "active" : ""}`}
              onClick={() => setSelectedForm("signIn")}
            >
              {t("Login.singIn")}
            </button>
            <button
              className={`btn btn__link login__btn ${selectedForm === "signUp" ? "active" : ""}`}
              onClick={() => setSelectedForm("signUp")}
            >
              {t("Login.singUp")}
            </button>
          </div>
          {selectedForm === "signIn" && <SignIn />}
          {selectedForm === "signUp" && <SignUp />}
          {/* Placeholder for Sign-in Sign-up forms */}
          <div className="login__footer">
            <p className="login__forgot-password">{t("Login.forgotPassword")}</p>
            <p>{t("Login.quickAccess")}</p>
            <Social />
          </div>
        </>
      ) : null}
    </div>
  );
};
export default LoginPage;
