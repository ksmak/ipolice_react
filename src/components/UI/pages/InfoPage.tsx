import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../App";
import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { UserRole } from "../../../types/types";
import { Alert } from "@material-tailwind/react";
import InfoForm from "../forms/InfoForm";
import InfoView from "../views/InfoView";

interface InfoPageProps {
    isEdit: boolean
}

const InfoPage = ({ isEdit }: InfoPageProps) => {
    const auth = useContext(AuthContext);
    const { t } = useTranslation();
    const { infoId } = useParams();

    return (
        <div className="container mx-auto p-4">
            <div className="h-fit bg-blue-gray-50 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            {isEdit
                ? auth.role === UserRole.admin || auth.role === UserRole.editor || auth.role === UserRole.operator
                    ? <InfoForm infoId={infoId} />
                    : <Alert className="bg-red-500 my-4">{t('errorAccess')}</Alert>
                : <InfoView infoId={infoId} />
            }
        </div>
    )
}

export default InfoPage;