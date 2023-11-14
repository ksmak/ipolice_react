import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import NavigatorPanel from "../panels/NavigatorPanel";
import CategoriesPanel from "../panels/CategoriesPanel";
import { Input } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext, MetaDataContext } from "../../../App";
import { BsFillPencilFill, BsSearch } from "react-icons/bs";
import ActionsPanel from "../panels/ActionsPanel";
import { UserRole } from "../../../types/types";
import { Link } from "react-router-dom";
import FirstView from "../views/FirstView";
import i18n from "../../../i18n";
import LoginView from "../views/LoginView";

const MainPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { categories } = useContext(MetaDataContext);
    const { session, roles } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [first, setFirst] = useState(false);
    const [login, setLogin] = useState(false);
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

    useEffect(() => {
        const first = localStorage.getItem('first');
        if (!first) {
            setFirst(true);
            localStorage.setItem('first', 'first');
            i18n.changeLanguage('kk');
        }
    }, [])

    return (
        <div className="h-[calc(100vh-5.75rem)]">
            <div className="flex flex-col w-full">
                <NavigatorPanel openLogin={login} setOpenLogin={setLogin} />
                <div className=" bg-blue-gray-50 shadow-md flex flex-col w-full">
                    <p className="text-sm text-primary-500 pt-2 px-2 lowercase underline font-bold text-end">
                        <Link to="/categories">{t('seeAll')}</Link>
                    </p>
                    <div className="">
                        <CategoriesPanel categories={categories} />
                    </div>
                </div>
                <div className="px-10 pt-4 text-primary-500 text-right text-xl font-lobster">{t('citate')}</div>
                <div className="px-10 py-1 text-primary-500 text-right text-lg font-lobster">{t('prezident')}</div>
                <div className="w-full md:w-1/2 my-5 px-5 self-center">
                    <Input
                        placeholder={t('search')}
                        icon={<BsSearch />}
                        className="!border !border-blue-300 bg-white text-blue-500 shadow-lg shadow-blue-400/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-900 focus:!border-t-blue-900 focus:ring-blue-400/10"
                        // className="!border-primary-500 bg-white text-primary-500 shadow-lg shadow-blue-100 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary-500 focus:!border-t-primary-500 focus:ring-primary-500/10"
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
            <div className="text-end sticky bottom-5 mr-10">
                {session?.user && (
                    roles.includes(UserRole.admin) ||
                    roles.includes(UserRole.item_edit) ||
                    roles.includes(UserRole.info_edit) ||
                    roles.includes(UserRole.test_edit))
                    ? <ActionsPanel actions={actions} />
                    : null}
            </div>
            <FirstView open={first} setOpen={setFirst} />
            <LoginView open={login} setOpen={setLogin} />
            <footer className="absolute bottom-0 w-full h-44 bg-gray-100  00 flex flex-row flex-wrap justify-center gap-4 py-4">
                <div className="basis-56">
                    <div className="text-xs uppercase font-bold text-blue-gray-600">
                        {t('links')}
                    </div>
                </div>
                <div className="basis-56">
                    <div className="text-xs uppercase font-bold text-blue-gray-600">
                        {t('documents')}
                    </div>
                </div>
                <div className="basis-56">
                    <div className="text-xs uppercase font-bold text-blue-gray-600">
                        {t('contacts')}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MainPage;