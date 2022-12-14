import React from "react";

const Social = ({ vk, instagram, facebook, pinterest }) => {
  return (
    <div className="social">
      <div className="dark-circle">
        <a href="https://vk.com/littleknitsstory" target="_blank">
          <img src={vk} alt="vk" />
        </a>
      </div>

      <div className="dark-circle">
        <a href="https://www.facebook.com/littleknitsstory/" target="_blank">
          <img src={facebook} alt="facebook" />
        </a>
      </div>
      <div className="dark-circle">
        <a href="https://www.instagram.com/littleknitsstory/" target="_blank">
          <img src={instagram} alt="instagram" />
        </a>
      </div>
      <div className="dark-circle">
        <a href="https://www.pinterest.ru/littleknitsstory/" target="_blank">
          <img src={pinterest} alt="pinterest" />
        </a>
      </div>
    </div>
  );
};

export default Social;
