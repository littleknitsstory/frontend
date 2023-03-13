import Contacts from "./Contacts";
import Instagram from "../../components/Instagram";
import { useGetFeaturesQuery } from "../../components/features/api/featuresSlice";

const ContactPage = () => {
  const { data } = useGetFeaturesQuery();
  return (
    <>
      {data?.contacts ? (
        <>
          <Contacts />
          <Instagram />
        </>
      ) : null}
    </>
  );
};
export default ContactPage;
