import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import AuthSocial from "../../components/utils/AuthSocial";
import SignIn from "../../components/user/SignIn";
import SignUp from "../../components/user/SignUp";
import PageError from "../PageError";
import { ITokens } from "./Profile";
import { ROUTES } from "../../app/routes";

const LoginPage = () => {
  const { data: feature } = useGetFeaturesQuery();
  const [selectedForm, setSelectedForm] = useState("signIn");
  const { t } = useTranslation();

  const tokens: ITokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens") || "")
    : { tokens: { access: "", refresh: "" } };
  const { data: user } = useGetAllUsersQuery(tokens.access);

  if (!feature?.account) {
    return <PageError errorStatus={404} />;
  }
  if (user) {
    return <Navigate to={ROUTES.PROFILE} />;
  }

  return (
    <>
      {feature?.account && (
        <div className="login__wrapper">
          <div className="login__select-form">
            <button
              className={`btn login__btn ${selectedForm === "signIn" ? "active" : ""}`}
              onClick={() => setSelectedForm("signIn")}
            >
              {t("Login.singIn")}
            </button>
            <button
              className={`btn login__btn ${selectedForm === "signUp" ? "active" : ""}`}
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
            <AuthSocial />
          </div>
        </div>
      )}
    </>
  );
};
export default LoginPage;
