import { useTranslation } from "react-i18next";
import useWindowSize from "../../hooks/useWindowSize";
import { useNavigate } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import CategoriesPanel from "../panels/CategoriesPanel";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext, MetaDataContext } from "../../../App";
import ItemsPanel from "../panels/ItemsPanel";
import { BsFillPencilFill, BsSearch } from "react-icons/bs";
import ActionsPanel from "../panels/ActionsPanel";
import { UserRole } from "../../../types/types";
import InfoPanel from "../panels/InfoPanel";
import { Link } from "react-router-dom";
import { truncate } from "../../../utils/utils";


const MainPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { categories, regions, districts, infoItems, lastItems, testItems } = useContext(MetaDataContext);
    const { session, role } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const background = '/background.jpg';
    const size = useWindowSize();
    const actions = [
        {
            label: t('appendItem'),
            onclick: () => navigate('/items/new'),
            icon: < BsFillPencilFill />,
        },
        {
            label: t('appendInfo'),
            onclick: () => navigate('/info/new'),
            icon: < BsFillPencilFill />,
        }
    ]

    return (
        <div>
            <div className="relative sm:bg-blue-gray-50 bg-cover bg-no-repeat bg-center backdrop-saturate-50"
                style={size.width === undefined || size.width >= 750 ? { backgroundImage: `url(${background})` } : { backgroundColor: "#ECEFF1" }}
            >
                <div className="filter-none grid grid-cols-4 p-4 gap-4">
                    <div className="col-span-4 justify-self-end">
                        <LanguagePanel />
                    </div>
                    <div className="col-span-4 self-center">
                        <NavigatorPanel />
                    </div>
                    <div className="col-span-4 md:col-start-2 md:col-span-2 shrink-0">
                        <div className="w-full mb-5">
                            <Input
                                placeholder={t('search')}
                                icon={<BsSearch />}
                                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                                crossOrigin=""
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/search?text=${searchText}`)
                                    }
                                }}
                            />
                        </div>
                        <CategoriesPanel categories={categories} />
                    </div>
                </div>
                {testItems && testItems.length
                    ? <div className="invisible lg:visible lg:h-28 lg:w-96 absolute bottom-10 left-10 bg-blue-gray-100 rounded-lg">
                        <Link to={`/tests/${testItems[0].id}`}>
                            <div className="h-full w-full flex flex-row justify-between p-3">
                                <div className="flex flex-col justify-center">
                                    <div className="text-2xl font-bold font-serif text-teal-600 underline">
                                        {t('test')}:
                                    </div>
                                    <div className="font-sans text-teal-900  hover:underline">
                                        {truncate(String(testItems[0][`title_${i18n.language}` as keyof typeof testItems[0]]), 70)}
                                    </div>
                                </div>
                                <img src="icons/arrow.png" alt="arrow" />
                            </div>
                        </Link>
                    </div>
                    : null}
            </div>
            <div className="bg-blue-gray-50">
                <hr className="bg-blue-gray-50 border-2 border-blue-400 mt-5 mx-5" />
                <div className="text-blue-700 uppercase font-bold p-5">
                    {t('infoMenu')}
                </div>
                <div className="px-5">
                    <InfoPanel infoItems={infoItems ? infoItems : []} />
                </div>
                <hr className="bg-blue-gray-50 border-2 border-teal-400 mt-5 mx-5" />
                <div className="text-teal-700 uppercase font-bold p-5">
                    {t('lastAppens')}
                </div>
                <div className="px-5">
                    <ItemsPanel
                        items={lastItems ? lastItems : []}
                        regions={regions}
                        districts={districts}
                    />
                </div>

            </div>
            {session?.user && (role === UserRole.admin || role === UserRole.editor || role === UserRole.operator)
                ? <ActionsPanel actions={actions} />
                : null}
        </div>
    )
}

export default MainPage;