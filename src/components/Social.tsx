import vk from "../assets/icons/logo-vk_white.svg";
import facebook from "../assets/icons/logo-facebook_white.svg";
import pinterest from "../assets/icons/logo-pinterest_white.svg";
import instagram from "../assets/icons/logo-instagram_white.svg";

const Social = () => {
  return (
    <div className="social">
      <a href="https://vk.com/littleknitsstory" target="_blank" rel="noreferrer">
        <div className="social-circle">
          <img src={vk} alt="vk" />
        </div>
      </a>
      <a href="https://www.facebook.com/littleknitsstory/" target="_blank" rel="noreferrer">
        <div className="social-circle">
          <img src={facebook} alt="facebook" />
        </div>
      </a>
      <a href="https://www.instagram.com/littleknitsstory/" target="_blank" rel="noreferrer">
        <div className="social-circle">
          <img src={instagram} alt="instagram" />
        </div>
      </a>
      <a href="https://www.pinterest.ru/littleknitsstory/" target="_blank" rel="noreferrer">
        <div className="social-circle">
          <img src={pinterest} alt="pinterest" />
        </div>
      </a>
    </div>
  );
};

export default Social;
