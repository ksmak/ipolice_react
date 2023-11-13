import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import InfoForm from "../forms/InfoForm";
import InfoView from "../views/InfoView";

interface InfoPageProps {
    isEdit: boolean
}

const InfoPage = ({ isEdit }: InfoPageProps) => {
    const { infoId } = useParams();

    return (
        <div>
            <NavigatorPanel />
            {isEdit
                ? <InfoForm infoId={infoId} />
                : <InfoView infoId={infoId} />}
        </div>
    )
}

export default InfoPage;