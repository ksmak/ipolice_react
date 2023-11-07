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
            <div className="h-fit bg-blue-400 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            {isEdit
                ? <InfoForm infoId={infoId} />
                : <InfoView infoId={infoId} />}
        </div>
    )
}

export default InfoPage;