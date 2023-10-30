import { Dict, Item } from "../../../types/types";
import ItemCard from "../cards/ItemCard";


interface ItemsPanelProps {
    items: Item[] | undefined,
    regions: Dict[] | undefined,
    districts: Dict[] | undefined,
}

const ItemsPanel = ({ items, regions, districts }: ItemsPanelProps) => {

    return (
        <div className="flex flex-row gap-4 flex-wrap overflow-x-auto">
            {items
                ? items.map((item) => {
                    return (
                        <ItemCard
                            key={item.id}
                            item={item}
                            regions={regions}
                            districts={districts}
                        />)
                })
                : null}
        </div>
    )
}

export default ItemsPanel;