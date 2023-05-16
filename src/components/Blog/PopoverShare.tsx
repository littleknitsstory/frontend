import Image from "next/image";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Store } from "react-notifications-component";
import { notificationSuccess } from "../Modals/Notification";
import { useTranslation } from "next-i18next";
import ShareWhiteSVG from "../SVG/ShareWhiteSVG";

const PopoverShare = () => {
  const { t } = useTranslation("common");
  let sharedLink = "";

  if (typeof window !== "undefined") {
    sharedLink = window.location.href;
  }

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(sharedLink);

    Store.addNotification({
      ...notificationSuccess,
      title: t("copiedToClipboard"),
    });
  };

  const popover = (
    <Popover className="post__popover-share">
      <Popover.Body>
        <div className="text text--18 text--bold d-flex flex-column gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${sharedLink}`}
            className="d-flex align-items-center gap-2 p-1 post__share-btn"
          >
            <Image src="/icons/socials/facebook.svg" alt="Facebook Logo" width={30} height={30} />
            <p className="m-0">Facebook</p>
          </a>
          <a
            href={`https://t.me/share/url?url=${sharedLink}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center gap-2 post__share-btn p-1"
          >
            <Image src="/icons/socials/telegram.svg" alt="Telegram Logo" width={30} height={30} />
            <p className="m-0">Telegram</p>
          </a>
          {/* <div className="d-flex align-items-center gap-2 post__share-btn p-1">
            <PinterestIcon />
            <p className="m-0">Pinterest</p>
          </div> */}
          <div
            className="d-flex align-items-center gap-2 post__share-btn p-1"
            onClick={copyToClipboard}
          >
            <Image src="/icons/chain.svg" alt="Chain Icon" width={30} height={30} />
            <p className="m-0">{t("copyLink")}</p>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose={true}>
      <div>
        <ShareWhiteSVG />
      </div>
    </OverlayTrigger>
  );
};
export default PopoverShare;
