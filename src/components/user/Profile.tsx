import { useState, useEffect } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useUpdateProfileMutation } from "../features/api/apiSlice";
import Spinner from "../utils/Spinner";
import { ROUTES } from "../../app/routes";

interface errorType {
  [key: string]: string[];
}

export interface ITokens {
  access: string;
  refresh: string;
}

const Profile = () => {
  const tokens: ITokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens") || "")
    : { tokens: { access: "", refresh: "" } };
  const [errorMessage, setErrorMessage] = useState<errorType>();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tokens");
    navigate("/login/");
  };

  const { data: user, isLoading, isError } = useGetProfileQuery(tokens.access);

  // const [updateProfile, { isError: isUpdateError, error: updateError }] =
  //   useUpdateProfileMutation();

  // useEffect(() => {
  //   if (isUpdateError) {
  //     if ("data" in updateError!) {
  //       setErrorMessage((prevData) => {
  //         return {
  //           ...prevData,
  //           ...(updateError.data as errorType),
  //         };
  //       });
  //     }
  //   } else
  //     setErrorMessage({
  //       email: [],
  //       country: [],
  //       avatar: [],
  //       username: [],
  //       first_name: [],
  //       last_name: [],
  //     });
  // }, [isUpdateError, updateError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div className="profile">
      <nav className="profile__nav">
        <ul className="profile__links">
          <li className="profile__list">
            <NavLink to={ROUTES.PROFILE} className="profile__link">
              Личные данные
            </NavLink>
          </li>
          <li className="profile__list">
            <NavLink to={ROUTES.PROFILE + "courses"} className="profile__link">
              Мои курсы
            </NavLink>
          </li>
          <li className="profile__list">
            <NavLink to={ROUTES.PROFILE + "articles"} className="profile__link">
              Мои посты
            </NavLink>
          </li>
          <li className="profile__list">
            <NavLink to={ROUTES.PROFILE + "orders"} className="profile__link">
              Мои заказы
            </NavLink>
          </li>
          <li className="profile__list">
            <NavLink to={ROUTES.PROFILE + "bookmarks"} className="profile__link">
              Список для чтения
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet context={{ user: user, tokens: tokens }} />
    </div>
  );
};
export default Profile;
