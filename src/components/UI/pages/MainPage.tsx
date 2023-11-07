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
            <div>
                <div className="filter-none grid grid-cols-4 p-4 gap-4 bg-blue-400">
                    <div className="col-span-4 place-self-center text-white text-sm md:text-base font-bold tracking-normal shrink">{t('citate')}</div>
                    <div className="col-span-4 grid grid-cols-3 gap-4">
                        <div className="col-span-2 place-self-end text-white text-sm md:text-base font-bold tracking-normal italic shrink">{t('prezident')}</div>
                        <div className="col-start-3 place-self-end">
                            <LanguagePanel />
                        </div>
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
                <div className="text-end text-sm p-2 text-blue-gray-600">Icons by <a href="https://icons8.ru/">Icons8</a></div>
                {/* {testItems && testItems.length
                    ? <div className="invisible lg:visible lg:h-28 lg:w-80 absolute bottom-10 left-10 bg-blue-gray-100 rounded-lg">
                        <Link to={`/tests/${testItems[0].id}`}>
                            <div className="h-full w-full flex flex-row justify-between p-3">
                                <div className="flex flex-col justify-center">
                                    <div className="text-xl font-bold font-serif text-blue-400 underline">
                                        {t('test')}:
                                    </div>
                                    <div className="font-sans text-blue-400  hover:underline text-sm">
                                        {truncate(String(testItems[0][`title_${i18n.language}` as keyof typeof testItems[0]]), 70)}
                                    </div>
                                </div>
                                <img src="icons/arrow.png" alt="arrow" />
                            </div>
                        </Link>
                    </div>
                    : null} */}
            </div>
            <div className="text-blue-400 uppercase font-bold p-5 hover:cursor-pointer flex flex-row items-center gap-4" onClick={() => setOpenInfo(!openInfo)}>
                {t('infoMenu')}
                <BsChevronDown
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${openInfo ? "rotate-180" : ""
                        }`}
                />
            </div>
            {/* <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-end items-center px-4">
                        <div className="h-8 w-8 mr-2">
                            <a href="https://www.instagram.com/policeofkaraganda/" target="_blank" rel="noreferrer"><img className="h-full w-full object-cover object-center" src="/icons/instagram.png" alt="instagram" /></a>
                        </div>
                        <div className="h-8 w-8 mr-2">
                            <img className="h-full w-full object-cover object-center" src="/icons/telegram.png" alt="telegram" />
                        </div>
                        <div className="h-10 w-10 mr-2">
                            <img className="h-full w-full object-cover object-center" src="/icons/whatsapp.png" alt="whatsapp" />
                        </div>
                    </div>
                </div> */}
            <hr className="bg-blue-gray-50 border-2 border-blue-400 mx-5" />
            <div className="px-5">
                <InfoPanel infoItems={infoItems ? infoItems : []} openInfo={openInfo} />
            </div>
            <div className="text-blue-400 uppercase font-bold p-5 hover:cursor-pointer flex flex-row items-center gap-4" onClick={() => setOpenItems(!openItems)}>
                {t('lastAppens')}
                <BsChevronDown
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${openInfo ? "rotate-180" : ""
                        }`}
                />
            </div>
            <hr className="bg-blue-gray-50 border-2 border-blue-400 mx-5" />
            <div className="px-5">
                <ItemsPanel
                    items={lastItems ? lastItems : []}
                    regions={regions}
                    districts={districts}
                    openItems={openItems}
                />
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