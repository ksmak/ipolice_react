import { useTranslation } from "react-i18next";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { Alert, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import ProfileForm from "../forms/ProfileForm";

const Profile = () => {
    const { t } = useTranslation();
    const auth = useContext(AuthContext);
    const userId = auth.session?.user.id;

    return (
        <div className="">
            <div className="bg-blue-400 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            <Typography variant="h3" color="blue" className="text-center">{t('userProfile')}</Typography>
            {userId
                ? <ProfileForm userId={userId} />
                : <Alert>{t('errorAccess')}</Alert>}
        </div>
    )
}

export default Profile;