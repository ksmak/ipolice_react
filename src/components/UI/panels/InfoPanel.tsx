import { Info } from "../../../types/types";
import InfoCard from "../cards/InfoCard";

interface InfoPanelProps {
    infoItems: Info[] | []
}
const InfoPanel = ({ infoItems }: InfoPanelProps) => {
    return (
        <div
            className="flex flex-row gap-4 flex-wrap"
        >
            {infoItems.map((info) => (
                <InfoCard key={info.id} info={info} />
            ))}
        </div>
    )
}

export default InfoPanel;