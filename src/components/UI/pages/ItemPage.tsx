import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { useParams } from "react-router";
import { useContext } from "react";
import ItemView from "../views/ItemView";
import ItemForm from "../forms/ItemForm";
import { AuthContext } from "../../../App";
import { UserRole } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { Alert } from "@material-tailwind/react";

interface ItemPageProps {
    isEdit: boolean
}

const ItemPage = ({ isEdit }: ItemPageProps) => {
    const auth = useContext(AuthContext);
    const { t } = useTranslation();
    const { itemId } = useParams();

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
                    ? <ItemForm
                        itemId={itemId}
                    />
                    : <Alert className="bg-red-500 my-4">{t('errorAccess')}</Alert>
                : <ItemView
                    itemId={itemId}
                />
            }
        </div>
    )
}

export default ItemPage;