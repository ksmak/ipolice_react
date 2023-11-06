import { useContext, useState } from "react";
import { AuthContext } from "../../../App";
import { TestType, UserRole } from "../../../types/types";
import { Alert } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

interface TestFormProps {
    testId: string | undefined
}

const TestForm = ({ testId }: TestFormProps) => {
    const { session, roles } = useContext(AuthContext);
    const { t } = useTranslation();
    const [test, setTest] = useState<TestType>({
        id: null,
        title_ru: null,
        title_kk: null,
        title_en: null,
        data: null,
        user_id: null,
    } as TestType);

    return (
        <div>
            {UserRole.admin in roles || (UserRole.test_edit in roles && session?.user.id === test?.user_id)
                ? <div>TestForm</div>
                : <Alert className="bg-red-500 my-4">{t('errorAccess')}</Alert>}
        </div>
    )
}

export default TestForm;