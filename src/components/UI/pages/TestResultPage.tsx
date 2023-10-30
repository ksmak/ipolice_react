import { useContext } from "react";
import { AuthContext } from "../../../App";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { UserRole } from "../../../types/types";
import TestResultView from "../views/TestResultView";
import { Alert } from "@material-tailwind/react";

const TestResultPage = () => {
    const { role } = useContext(AuthContext);
    const { t } = useTranslation();
    const { testId } = useParams();
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
            {role === UserRole.admin || role === UserRole.editor || role === UserRole.operator
                ? <TestResultView testId={testId} />
                : <Alert className="bg-red-500 my-4">{t('errorAccess')}</Alert>
            }
        </div>
    )
}

export default TestResultPage;