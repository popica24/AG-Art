import { UserData } from "../../../Utils/types";
import NewsletterSettings from "../Components/NewsletterSettings";
import PaymentSettings from "../Components/PaymentSettings";
import SettingsCard from "../Components/SettingsCard";

type Props = {
  userData: UserData | null;
};

const AccountSettings = (props: Props) => {
  return (
    <div className="h-screen">
      <SettingsCard userData={props.userData} />
      <PaymentSettings />
      <NewsletterSettings />
    </div>
  );
};

export default AccountSettings;
