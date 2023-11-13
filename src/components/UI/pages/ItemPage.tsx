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
            <NavigatorPanel />
            {isEdit
                ? <ItemForm itemId={itemId} />
                : <ItemView itemId={itemId} />}
        </div>
    )
}

export default ItemPage;