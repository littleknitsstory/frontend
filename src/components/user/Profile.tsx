import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useUpdateProfileMutation } from "../features/api/apiSlice";
import { Form, Col, Container } from "react-bootstrap";
import Spinner from "../utils/Spinner";

interface IUserData {
  username: string;
  avatar: "";
  first_name: string;
  last_name: string;
  birth_data: string;
  country: string;
  city: string;
  address: string;
  email: string;
  is_email_confirmed: boolean;
  is_profile_full: boolean;
  phone_number: string;
  vk_profile: string;
  fb_profile: string;
  inst_profile: string;
  tg_profile: string;
}

interface errorType {
  [key: string]: string[];
}

const Profile = () => {
  const tokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens") || "")
    : { tokens: { access: "", refresh: "" } };
  const [errorMessage, setErrorMessage] = useState<errorType>();
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    avatar: "",
    first_name: "",
    last_name: "",
    birth_data: "",
    country: "",
    city: "",
    address: "",
    email: "",
    is_email_confirmed: false,
    is_profile_full: false,
    phone_number: "",
    vk_profile: "",
    fb_profile: "",
    inst_profile: "",
    tg_profile: "",
  });
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tokens");
    navigate("/login/");
  };

  const { data: user, isLoading, isError } = useGetProfileQuery(tokens.access);

  const [updateProfile, { isError: isUpdateError, error: updateError }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setUserData(user[0]);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isLoading) {
      try {
        await updateProfile({ user: userData, token: tokens.access }).unwrap();
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (isUpdateError) {
      if ("data" in updateError!) {
        setErrorMessage((prevData) => {
          return {
            ...prevData,
            ...(updateError.data as errorType),
          };
        });
      }
    } else
      setErrorMessage({
        email: [],
        country: [],
        avatar: [],
        username: [],
        first_name: [],
        last_name: [],
      });
  }, [isUpdateError, updateError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Navigate to="/login/" />;
  }

  return (
    <div className="profile">
      {userData && (
        <div className="profile__wrapper">
          <h3 className="profile__title">Welcome, {user[0].username}</h3>
          <Container className="profile__form-wrapper">
            <Col xs={12} sm={12} md={8} lg={6} xl={4}>
              <Form className="profile__form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  disabled
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userData.username}
                  aria-label="username"
                  onChange={handleChange}
                />
                <label htmlFor="avatar">Avatar</label>
                <input
                  id="avatar"
                  className="form-control"
                  type="test"
                  placeholder=""
                  name="avatar"
                  value={userData.avatar ? userData.avatar : ""}
                  aria-label="avatar"
                  onChange={handleChange}
                />
                {errorMessage?.avatar.map((item, i) => (
                  <p key={i} className="sign__error-message">
                    {item}
                  </p>
                ))}
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  className="form-control"
                  type="text"
                  placeholder=""
                  name="country"
                  value={userData.country ? userData.country : ""}
                  aria-label="country"
                  onChange={handleChange}
                />
                {errorMessage?.country.map((item, i) => (
                  <p key={i} className="sign__error-message">
                    {item}
                  </p>
                ))}

                <label htmlFor="last_name">First Name</label>
                <input
                  id="first_name"
                  className="form-control"
                  type="text"
                  placeholder=""
                  name="first_name"
                  value={userData.first_name ? userData.first_name : ""}
                  aria-label="first_name"
                  onChange={handleChange}
                />
                {errorMessage?.first_name.map((item, i) => (
                  <p key={i} className="sign__error-message">
                    {item}
                  </p>
                ))}
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  className="form-control"
                  type="text"
                  placeholder=""
                  name="last_name"
                  value={userData.last_name ? userData.last_name : ""}
                  aria-label="last_name"
                  onChange={handleChange}
                />
                {errorMessage?.last_name.map((item, i) => (
                  <p key={i} className="sign__error-message">
                    {item}
                  </p>
                ))}
                <button type="submit" className="btn btn--primary">
                  Update
                </button>
              </Form>
            </Col>
          </Container>
        </div>
      )}
      <button className="btn btn--primary mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
export default Profile;
