import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import ItemForm from "../forms/ItemForm";
import ItemView from "../views/ItemView";

interface ItemPageProps {
    isEdit: boolean
}

const ItemPage = ({ isEdit }: ItemPageProps) => {
    const { itemId } = useParams();

    return (
        <div className="">
            <div className="h-fit bg-blue-400 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            {isEdit
                ? <ItemForm itemId={itemId} />
                : <ItemView itemId={itemId} />}
        </div>
    )
}

export default ItemPage;