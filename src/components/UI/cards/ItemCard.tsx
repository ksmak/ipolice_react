import { Carousel } from "@material-tailwind/react";
import { Dict, Item } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";
import { truncate } from "../../../utils/utils";


interface ItemCardProps {
    item: Item,
    regions: Dict[] | undefined,
    districts: Dict[] | undefined,
}

const ItemCard = ({ item, regions, districts }: ItemCardProps) => {
    const { t, i18n } = useTranslation();

    const getPlaceInfo = (): string => {
        var place = [];
        if (item.punkt) {
            place.push(item.punkt);
        }
        if (item.district_id) {
            const district = districts?.find(d => d.id === item.district_id);
            if (district) {
                place.push(district[`title_${i18n.language}` as keyof typeof district]);
            }
        }
        if (item.region_id) {
            const region = regions?.find(r => r.id === item.region_id);
            if (region) {
                place.push(region[`title_${i18n.language}` as keyof typeof region]);
            }
        }

        return place.join(', ');
    }

    let title = item[`title_${i18n.language}` as keyof typeof item] as string;
    let text = item[`text_${i18n.language}` as keyof typeof item] as string;
    let place_info = getPlaceInfo();
    let date = item.date_of_action ? moment(item.date_of_action).locale(i18n.language).format('LL') : '';

    return (
        <div className="w-full md:w-96 flex flex-col justify-between border-2 border-teal-600 mt-4">
            <Carousel className="h-64 rounded-sm">
                {item.data?.photos
                    ? item.data.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={photo}
                            className="h-full w-full object-cover object-center"
                        />

                    ))
                    :
                    <img
                        src='default.png'
                        alt="default"
                        className="h-full w-full object-cover object-center"
                    />}
            </Carousel>
            <div
                className="h-24 bg-teal-600 px-2 text-white font-bold text-lg flex flex-col justify-center"
            >
                <Link to={`/items/${item.id}`} className="hover:underline">{truncate(title, 70)}</Link>
            </div>
            <div className="h-20 px-2 indent-3 text-blue-gray-900 font-sans text-sm">
                {truncate(text, 130)}
            </div>
            <div className="h-12 px-2 text-teal-900 font-serif text-sm">
                {place_info}
            </div>
            <div className="h-6 px-2">
                <div className="flex flex-row justify-between">
                    <div
                        className="text-blue-gray-900 font-serif text-sm"
                    >
                        {date}
                    </div>
                    <div
                        className="text-teal-900 font-serif text-sm"
                    >
                        <Link to={`/items/${item.id}`} className="hover:underline">{t('see')}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;