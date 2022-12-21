import React from "react";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

const Saved = () => {
  const { t } = useTranslation();
  return (
    <section className="saved">
      <div className="lks-container">
        <div className="row">
          <div className="col">
            <div className="saved__empty">{t("Nothing")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(Saved);
