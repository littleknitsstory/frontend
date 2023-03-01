import vk from "../assets/icons/logo-vk_white.svg";
import facebook from "../assets/icons/logo-facebook_white.svg";
import pinterest from "../assets/icons/logo-pinterest_white.svg";
import instagram from "../assets/icons/logo-instagram_white.svg";

const Social = () => {
  return (
    <div className="social">
      <div className="social-circle">
        <a
          href="https://vk.com/littleknitsstory"
          target="_blank"
          rel="noreferrer"
        >
          <img src={vk} alt="vk" />
        </a>
      </div>

      <div className="social-circle">
        <a
          href="https://www.facebook.com/littleknitsstory/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook} alt="facebook" />
        </a>
      </div>
      <div className="social-circle">
        <a
          href="https://www.instagram.com/littleknitsstory/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="instagram" />
        </a>
      </div>
      <div className="social-circle">
        <a
          href="https://www.pinterest.ru/littleknitsstory/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={pinterest} alt="pinterest" />
        </a>
      </div>
    </div>
  );
};

export default Social;
