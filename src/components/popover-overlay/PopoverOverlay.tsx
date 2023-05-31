"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { toast } from "react-toastify";
import telegram from "@/assets/icons/social/telegram.svg";
import facebook from "@/assets/icons/social/facebook.svg";
import pinterest from "@/assets/icons/social/pinterest.svg";
import chain from "@/assets/icons/chain.svg";
import classes from "./popover.module.scss";

interface Props {
  icon: string;
  dictionary: Dictionary;
}

interface Dictionary {
  article: {
    copyLink: string;
    CopiedToClipboard: string;
  };
}

const PopoverOverlay = ({ icon, dictionary }: Props) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(currentUrl);
    toast.success(dictionary.article.CopiedToClipboard);
  };

  const popoverShare = (
    <Popover className={classes.popoverShare}>
      <Popover.Body>
        <div className="text text--18 text--bold d-flex flex-column gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            className="d-flex align-items-center gap-2 p-1"
          >
            <Image src={facebook} alt="facebook" />
            <p className="m-0">Facebook</p>
          </a>
          <a
            href={`https://t.me/share/url?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center gap-2 post__share-btn p-1"
          >
            <Image src={telegram} alt="telegram" />
            <p className="m-0">Telegram</p>
          </a>
          <div className="d-flex align-items-center gap-2 post__share-btn p-1">
            <Image src={pinterest} alt="pinterest" />
            <p className="m-0">Pinterest</p>
          </div>
          <div
            className="d-flex align-items-center gap-2 post__share-btn p-1"
            onClick={copyToClipboard}
          >
            <Image src={chain} alt="chain" role="button" />
            <p className="m-0" role="button">
              {dictionary.article.copyLink}
            </p>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popoverShare}
      rootClose={true}
    >
      <Image src={icon} alt="shareIcon" role="button" />
    </OverlayTrigger>
  );
};

export default PopoverOverlay;
