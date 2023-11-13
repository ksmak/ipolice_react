import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import CategoriesPanel from "../panels/CategoriesPanel";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext, MetaDataContext } from "../../../App";
import ItemsPanel from "../panels/ItemsPanel";
import { BsChevronDown, BsFillPencilFill, BsSearch } from "react-icons/bs";
import ActionsPanel from "../panels/ActionsPanel";
import { UserRole } from "../../../types/types";
import InfoPanel from "../panels/InfoPanel";
import { Link } from "react-router-dom";


const MainPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { categories, regions, districts, infoItems, lastItems } = useContext(MetaDataContext);
    const { session, roles } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [openInfo, setOpenInfo] = useState(false);
    const [openItems, setOpenItems] = useState(false);
    const actions = [
        {
            label: t('appendItem'),
            onclick: () => navigate('/items/new'),
            icon: < BsFillPencilFill />,
            role: UserRole.item_edit,
        },
        {
            label: t('appendInfo'),
            onclick: () => navigate('/info/new'),
            icon: < BsFillPencilFill />,
            role: UserRole.info_edit,
        },
        {
            label: t('appendTest'),
            onclick: () => navigate('/tests/new'),
            icon: < BsFillPencilFill />,
            role: UserRole.test_edit,
        }
    ]

    return (
        <div className="relative">
            <div className="flex flex-col">
                <NavigatorPanel />
                <div className=" bg-blue-gray-50 shadow-md">
                    <p className="text-sm text-blue-400 pt-2 px-2 lowercase underline font-bold text-end">
                        <Link to="/categories">{t('seeAll')}</Link>
                    </p>
                    <div className="overflow-x-auto">
                        <CategoriesPanel categories={categories} />
                    </div>
                </div>
                <div className="px-10 pt-4 text-blue-800 italic text-right font-serif text-xl">{t('citate')}</div>
                <div className="px-10 py-1 text-blue-800 italic text-right font-serif text-lg">{t('prezident')}</div>
                <div className="container mx-auto w-full my-5 px-5">
                    <Input
                        placeholder={t('search')}
                        icon={<BsSearch />}
                        className="!border !border-gray-500 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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
            </div>
            {session?.user && (
                roles.includes(UserRole.admin) ||
                roles.includes(UserRole.item_edit) ||
                roles.includes(UserRole.info_edit) ||
                roles.includes(UserRole.test_edit))
                ? <ActionsPanel actions={actions} />
                : null}
        </div>
    )
}

export default MainPage;