import { useOutletContext } from "react-router-dom";
import { IUserData } from "../../app/types";
import { useEffect, useState } from "react";
import { ITokens } from "../../pages/User/Profile";
import { useGetUserQuery, useUpdateUserMutation } from "../features/api/apiSlice";
import { Store } from "react-notifications-component";
import { notificationSuccess } from "../modal/Notification";
import { useTranslation } from "react-i18next";
import { ReactComponent as TelegramLogo } from "../../assets/icons/social/telegram.svg";
import { ReactComponent as InstagramLogo } from "../../assets/icons/social/instagram.svg";
import { ReactComponent as FacebookLogo } from "../../assets/icons/social/facebook.svg";
import { ReactComponent as Cross } from "../../assets/icons/cross.svg";
import { Modal } from "react-bootstrap";
import Spinner from "../utils/Spinner";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const { tokens, user }: { tokens: ITokens; user: IUserData[] } = useOutletContext();
  const [showModal, setShowModal] = useState({
    instagram: false,
    facebook: false,
    telegram: false,
  });

  const { data: userFromAPI, isLoading } = useGetUserQuery({
    token: tokens.access,
    username: user[0].username,
  });

  const [userUpdatedData, setUserUpdatedData] = useState<IUserData>({
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

  useEffect(() => {
    if (userFromAPI) {
      setUserUpdatedData(userFromAPI);
    }
  }, [userFromAPI]);

  const [updateUser, { isError: isUpdateError, error: updateError }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserUpdatedData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // shallow compare to user object
  const shallowEqual = (object1: IUserData, object2: IUserData): boolean => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }

    if (object2) {
      for (let key of keys1) {
        if (object1[key as keyof IUserData] !== object2[key as keyof IUserData]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleUpdateUser = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (userFromAPI) {
      if (!shallowEqual(userUpdatedData, userFromAPI)) {
        // temporarily update userData to satisfy the API requirements
        const updatedUser: IUserData = {
          ...userUpdatedData,
          avatar: "test",
        };
        try {
          const data = await updateUser({ user: updatedUser, token: tokens.access }).unwrap();
          Store.addNotification({
            ...notificationSuccess,
            title: "Профиль обновлен",
          });
          setUserUpdatedData(data);
        } catch (error) {}
      }
    }
  };

  const clearSocialLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const social: string = e.currentTarget.dataset.social!;
    const updatedUser: IUserData = {
      ...userUpdatedData,
      [social]: null,
      avatar: "test",
    };
    try {
      const data = await updateUser({ user: updatedUser, token: tokens.access }).unwrap();
      Store.addNotification({
        ...notificationSuccess,
        title: "Профиль обновлен",
      });
      setUserUpdatedData(data);
    } catch (error) {}
  };

  const handleCloseModal = (social: string): void => {
    setShowModal((prev) => {
      return {
        ...prev,
        [social]: false,
      };
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-info">
      <h2 className="profile-info__title">{t("profile.personalData")}</h2>

      <form action="" className="profile-info__form">
        <div className="profile-info__form-group">
          <label htmlFor="first_name" className="profile-info__form-label">
            {t("profile.firstName")}
          </label>
          <input
            type="text"
            className="profile-info__form-input form-control"
            id="first_name"
            name="first_name"
            value={userUpdatedData.first_name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
          />
        </div>
        <div className="profile-info__form-group">
          <label htmlFor="last_name" className="profile-info__form-label">
            {t("profile.lastName")}
          </label>
          <input
            type="text"
            className="profile-info__form-input form-control"
            id="last_name"
            name="last_name"
            value={userUpdatedData.last_name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
            // placeholder="Фамилия"
          />
        </div>
        <div className="profile-info__form-group">
          <label htmlFor="email" className="profile-info__form-label">
            {t("profile.email")}
          </label>
          <input
            type="email"
            className="profile-info__form-input form-control"
            id="email"
            name="email"
            value={userUpdatedData.email ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
          />
        </div>
        <div className="profile-info__form-group">
          <label htmlFor="phone_number" className="profile-info__form-label">
            {t("profile.phone")}
          </label>
          <input
            type="phone_number"
            className="profile-info__form-input form-control"
            id="phone_number"
            name="phone_number"
            value={userUpdatedData.phone_number ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
          />
        </div>
        <div className="profile-info__form-group">
          <h2 className="profile-info__title">{t("profile.deliveryAddress")}</h2>
          <label htmlFor="address" className="profile-info__form-label">
            {t("profile.address")}
          </label>
          <input
            type="address"
            className="profile-info__form-input form-control"
            id="address"
            name="address"
            value={userUpdatedData.address ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
          />
        </div>
      </form>

      <h2 className="profile-info__title">{t("profile.socials")}</h2>
      <div className="profile-info__socials">
        <div className="profile-info__social">
          <a href={userUpdatedData.inst_profile} target="_blank" rel="noreferrer">
            <InstagramLogo /> Instagram
          </a>
          {userUpdatedData.inst_profile && (
            <button
              className="btn btn--transparent"
              data-social="inst_profile"
              onClick={clearSocialLink}
            >
              <Cross />
            </button>
          )}
          {!userUpdatedData.inst_profile && (
            <button
              className="btn btn--transparent"
              onClick={() =>
                setShowModal((prev) => {
                  return { ...prev, instagram: true };
                })
              }
            >
              {t("profile.linkSocial")}
            </button>
          )}
          <Modal show={showModal.instagram} onHide={() => handleCloseModal("instagram")} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t("profile.modalTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="profile-info__form-input form-control"
                id="instagram"
                name="inst_profile"
                value={userUpdatedData.inst_profile ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn--primary btn--centered"
                onClick={() => handleCloseModal("instagram")}
              >
                {t("profile.linkSocial")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="profile-info__social">
          <a href={userUpdatedData.tg_profile} target="_blank" rel="noreferrer">
            <TelegramLogo /> Telegram
          </a>
          {userUpdatedData.tg_profile && (
            <button
              className="btn btn--transparent"
              data-social="tg_profile"
              onClick={clearSocialLink}
            >
              <Cross />
            </button>
          )}
          {!userUpdatedData.tg_profile && (
            <button
              className="btn btn--transparent"
              onClick={() =>
                setShowModal((prev) => {
                  return { ...prev, telegram: true };
                })
              }
            >
              {t("profile.linkSocial")}
            </button>
          )}
          <Modal show={showModal.telegram} onHide={() => handleCloseModal("telegram")} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t("profile.modalTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="profile-info__form-input form-control"
                id="telegram"
                name="tg_profile"
                value={userUpdatedData.tg_profile ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn--primary btn--centered"
                onClick={() => handleCloseModal("telegram")}
              >
                {t("profile.linkSocial")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="profile-info__social">
          <a href={userUpdatedData.fb_profile} target="_blank" rel="noreferrer">
            <FacebookLogo /> Facebook
          </a>
          {userUpdatedData.fb_profile && (
            <button className="btn btn--transparent" data-social="fb_profile">
              <Cross />
            </button>
          )}
          {!userUpdatedData.fb_profile && (
            <button
              className="btn btn--transparent"
              onClick={() =>
                setShowModal((prev) => {
                  return { ...prev, facebook: true };
                })
              }
            >
              {t("profile.linkSocial")}
            </button>
          )}
          <Modal show={showModal.facebook} onHide={() => handleCloseModal("facebook")} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t("profile.modalTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="profile-info__form-input form-control"
                id="facebook"
                name="fb_profile"
                value={userUpdatedData.fb_profile ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateUser(e)}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn--primary btn--centered"
                onClick={() => handleCloseModal("facebook")}
              >
                {t("profile.linkSocial")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfo;
