import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import Spinner from "../../components/utils/Spinner";
import { ROUTES } from "../../app/routes";
import { useTranslation } from "react-i18next";
import PageError from "../PageError";

interface errorType {
  [key: string]: string[];
}

export interface ITokens {
  access: string;
  refresh: string;
}

const Profile = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { t } = useTranslation();
  const tokens: ITokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens") || "")
    : { tokens: { access: "", refresh: "" } };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tokens");
    navigate("/login/");
  };

  //! DELETE: getUser by ID instead of username
  const { data: user, isLoading, isError } = useGetAllUsersQuery(tokens.access);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  //? when loading feature flags can return error
  if (!feature?.account) {
    return <PageError errorStatus={404} />;
  }

  return (
    <>
      {feature?.account && (
        <div className="profile">
          <nav className="profile__nav">
            <ul className="profile__links">
              <li className="profile__list">
                <NavLink to={ROUTES.PROFILE} end className="profile__link">
                  {t("profile.userInfo")}
                </NavLink>
              </li>
              {feature?.course && (
                <li className="profile__list">
                  <NavLink to={ROUTES.PROFILE_COURSES} className="profile__link">
                    {t("profile.courses")}
                  </NavLink>
                </li>
              )}

              <li className="profile__list">
                <NavLink to={ROUTES.PROFILE_ARTICLES} className="profile__link">
                  {t("profile.posts")}
                </NavLink>
              </li>
              <li className="profile__list">
                <NavLink to={ROUTES.PROFILE_ORDERS} className="profile__link">
                  {t("profile.orders")}
                </NavLink>
              </li>
              {/* <li className="profile__list">
          <NavLink to={ROUTES.BOOKMARKS} className="profile__link">
            {t("profile.bookmarks")}
          </NavLink>
        </li> */}
            </ul>
          </nav>
          <Outlet context={{ user: user, tokens: tokens }} />
        </div>
      )}
    </>
  );
};
export default Profile;
