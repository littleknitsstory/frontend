import { useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import Contacts from "./Contacts";
import Instagram from "../../components/Instagram";
import PageError from "../PageError";

const ContactPage = () => {
  const { data: feature } = useGetFeaturesQuery();

  if (!feature?.contacts) {
    return <PageError errorStatus={404} />;
  }

  return (
    <>
      {feature?.contacts && (
        <>
          <Contacts />
          <Instagram />
        </>
      )}
    </>
  );
};
export default ContactPage;
