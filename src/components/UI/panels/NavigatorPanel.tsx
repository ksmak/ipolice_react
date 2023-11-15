import {
    Collapse,
    Typography,
    IconButton,
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Logo from "../elements/Logo";
import { supabase } from "../../../api/supabase";
import { useTranslation } from "react-i18next";
import { AuthContext, MetaDataContext } from '../../../App';
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { Site } from "../../../types/types";
import LanguagePanel from "./LanguagePanel";
import WeatherPanel from "../pages/WeatherPanel";

type LoginViewProps = {
    openLogin?: boolean,
    setOpenLogin?: Dispatch<SetStateAction<boolean>>,
}


const NavigatorPanel = ({ openLogin, setOpenLogin }: LoginViewProps) => {
    const { t, i18n } = useTranslation();
    const auth = useContext(AuthContext);
    const [openNav, setOpenNav] = useState(false);
    const { categories, infoItems, testItems } = useContext(MetaDataContext);
    const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
    const [openInfoMenu, setOpenInfoMenu] = useState(false);
    const [openTestMenu, setOpenTestMenu] = useState(false);
    const [openSiteMenu, setOpenSiteMenu] = useState(false);
    const [openCategoryMenuMobile, setOpenCategoryMenuMobile] = useState(false);
    const [openInfoMenuMobile, setOpenInfoMenuMobile] = useState(false);
    const [openTestMenuMobile, setOpenTestMenuMobile] = useState(false);
    const [openSiteMenuMobile, setOpenSiteMenuMobile] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const siteItems: Site[] = [
        {
            href: "https://qamqor.gov.kz/missing",
            title_kk: "Хабар-ошарсыз жоғалғандарды іздестіру - Құқықтық статистика және арнайы есепке алу органдарының порталы ",
            title_ru: "Розыск без вести пропавших - Портал органов правовой статистики и специальных учетов",
            title_en: "Search for missing persons - Portal of legal statistics and special accounts"
        },
        {
            href: "https://aisoip.adilet.gov.kz/debtors",
            title_kk: "Борышкерлердің бірыңғай тізілімі - Қазақстан Республикасының Әділет министрлігі ",
            title_ru: "Единый реестр должников - Министерство юстиции Республики Казахстан",
            title_en: "Unified Register of Debtors - Ministry of Justice of the Republic of Kazakhstan"
        }
    ]


    const handleLogout = async () => {
        await supabase.auth.signOut();
        auth.logout();
    }

    return (
        <div className="w-full">
            <div
                className="h-20 flex flex-row justify-between items-center border-b-2 px-5 lg:px-10"
            >
                <div className="shrink-0 lg:w-72 flex flex-row justify-between items-center">
                    <div className="h-14 w-48">
                        <Logo />
                    </div>
                    <div className="hidden lg:flex">
                        <WeatherPanel />
                    </div>
                </div>
                <div className="grow w-full flex flex-col mr-2">
                    <div className="hidden lg:block">
                        <div className="flex flex-row justify-center items-center">
                            <ul className="h-full flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:flex-wrap bg-blue-50 rounded-md">
                                <li>
                                    <Menu open={openCategoryMenu} handler={setOpenCategoryMenu} allowHover>
                                        <MenuHandler>
                                            <Button
                                                variant="text"
                                                className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                            >
                                                {t('categories')}{" "}
                                                <BsChevronDown
                                                    strokeWidth={1}
                                                    className={`h-3.5 w-3.5 transition-transform ${openCategoryMenu ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </Button>
                                        </MenuHandler>
                                        {categories
                                            ? <MenuList className="hidden w-[36rem] overflow-visible lg:grid" color="light-blue">
                                                {categories?.map((item) => (
                                                    <a href={`/search?category=${item.id}`} key={item.id}>
                                                        <MenuItem className="hover:bg-blue-50">
                                                            <Typography variant="paragraph" color="light-blue" className="mb-1 text-blue-gray-700">
                                                                {String(item[`title_${i18n.language}` as keyof typeof item])}
                                                            </Typography>
                                                        </MenuItem>
                                                    </a>
                                                ))}
                                            </MenuList>
                                            : null}
                                    </Menu>
                                </li>
                                <li>
                                    <Menu open={openSiteMenu} handler={setOpenSiteMenu} allowHover>
                                        <MenuHandler>
                                            <Button
                                                variant="text"
                                                color="blue"
                                                className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                            >
                                                {t('siteMenu')}{" "}
                                                <BsChevronDown
                                                    strokeWidth={1}
                                                    className={`h-3.5 w-3.5 transition-transform ${openSiteMenu ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </Button>
                                        </MenuHandler>
                                        {siteItems
                                            ? <MenuList className="hidden w-[36rem] overflow-visible lg:grid">
                                                {siteItems.map((site, index) => (
                                                    <a href={site.href} key={index} target="_blank" rel="noreferrer">
                                                        <MenuItem className="hover:bg-blue-50">
                                                            <Typography variant="paragraph" color="light-blue" className="mb-1 text-blue-gray-700">
                                                                {String(site[`title_${i18n.language}` as keyof typeof site])}
                                                            </Typography>
                                                        </MenuItem>
                                                    </a>
                                                ))}
                                            </MenuList>
                                            : null}
                                    </Menu>
                                </li>
                                <li>
                                    <Menu open={openTestMenu} handler={setOpenTestMenu} allowHover>
                                        <MenuHandler>
                                            <Button
                                                variant="text"
                                                color="blue"
                                                className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                            >
                                                {t('testMenu')}{" "}
                                                <BsChevronDown
                                                    strokeWidth={1}
                                                    className={`h-3.5 w-3.5 transition-transform ${openTestMenu ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </Button>
                                        </MenuHandler>
                                        {testItems
                                            ? <MenuList className="hidden w-[36rem] overflow-visible lg:grid">
                                                {testItems.map((test) => (
                                                    <a href={`/tests/${test.id}`} key={test.id}>
                                                        <MenuItem className="hover:bg-blue-50">
                                                            <Typography variant="paragraph" color="light-blue" className="mb-1 text-blue-gray-700">
                                                                {String(test[`title_${i18n.language}` as keyof typeof test])}
                                                            </Typography>
                                                        </MenuItem>
                                                    </a>
                                                ))}
                                            </MenuList>
                                            : null}
                                    </Menu>
                                </li>
                                <li>
                                    <Menu open={openInfoMenu} handler={setOpenInfoMenu} allowHover>
                                        <MenuHandler>
                                            <Button
                                                variant="text"
                                                color="blue"
                                                className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                            >
                                                {t('infoMenu')}{" "}
                                                <BsChevronDown
                                                    strokeWidth={1}
                                                    className={`h-3.5 w-3.5 transition-transform ${openInfoMenu ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </Button>
                                        </MenuHandler>
                                        {infoItems
                                            ? <MenuList className="hidden w-[36rem] overflow-visible lg:grid">
                                                {infoItems?.map((info) => (
                                                    <a href={`/info/${info.id}`} key={info.id}>
                                                        <MenuItem className="hover:bg-blue-50">
                                                            <Typography variant="paragraph" color="light-blue" className="mb-1 text-blue-gray-700">
                                                                {String(info[`title_${i18n.language}` as keyof typeof info])}
                                                            </Typography>
                                                        </MenuItem>
                                                    </a>
                                                ))}
                                            </MenuList>
                                            : null}
                                    </Menu>
                                </li>
                                <li>
                                    <Button
                                        variant="text"
                                        color="blue"
                                        className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                    >
                                        <Link to="/about" className="flex items-center">
                                            {t('feedbackMenu')}
                                        </Link>
                                    </Button>
                                </li>
                                {auth.session?.user
                                    ? <div className="text-end text-primary-500 text-sm px-5">
                                        <div className="">{auth.session.user.email}</div>
                                        <div>
                                            <Link to="/profile" className="underline cursor-pointer mr-1 lowercase">{t('profile')}</Link>
                                            <span className="underline cursor-pointer lowercase" onClick={handleLogout}>{t('exit')}</span>
                                        </div>
                                    </div>
                                    : <li>
                                        <Button
                                            variant="text"
                                            color="blue"
                                            className="px-5 flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
                                            onClick={() => setOpenLogin ? setOpenLogin(!openLogin) : null}
                                        >
                                            {t('enterOrRegister')}
                                        </Button>
                                    </li>}
                            </ul>
                        </div>
                    </div>
                    <IconButton
                        variant="text"
                        className="mr-5 self-end ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>

                </div>
                <div className="shrink-0 w-72 flex flex-row gap-6">
                    <img className="hidden h-14 lg:flex" src="/logo_karaganda.png" alt="karaganda_logo" />
                    <LanguagePanel />
                </div>
            </div >
            <Collapse open={openNav}>
                <div className="container mx-auto p-2">
                    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
                        <li>
                            <Button
                                variant="text"
                                color="blue"
                                className="p-1 flex items-center gap-3 text-sm tracking-normal font-normal normal-case"
                                onClick={() => setOpenCategoryMenuMobile(!openCategoryMenuMobile)}
                            >
                                {t('categories')}{" "}
                                <BsChevronDown
                                    strokeWidth={1}
                                    className={`h-3.5 w-3.5 transition-transform ${openCategoryMenuMobile ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                            <Collapse open={openCategoryMenuMobile}>
                                <div className="flex flex-col px-4">
                                    {categories?.map((item, index) => {
                                        return (
                                            <a href={`/search?category=${item.id}`} key={index} className="p-1 font-normal hover:underline text-blue-gray-700 hover:cursor-pointer">
                                                {String(item[`title_${i18n.language}` as keyof typeof item])}
                                            </a>
                                        )
                                    })}
                                </div>
                            </Collapse>
                        </li>
                        <li>
                            <Button
                                variant="text"
                                color="blue"
                                className="p-1 flex items-center gap-3 text-sm tracking-normal font-normal normal-case"
                                onClick={() => setOpenSiteMenuMobile(!openSiteMenuMobile)}
                            >
                                {t('siteMenu')}{" "}
                                <BsChevronDown
                                    strokeWidth={1}
                                    className={`h-3.5 w-3.5 transition-transform ${openSiteMenuMobile ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                            <Collapse open={openSiteMenuMobile}>
                                <div className="flex flex-col px-4">
                                    {siteItems?.map((site, index) => {
                                        return (
                                            <a href={site.href} key={index} target="_blank" rel="noreferrer" className="p-1 font-normal hover:underline text-blue-gray-700 hover:cursor-pointer">
                                                {String(site[`title_${i18n.language}` as keyof typeof site])}
                                            </a>
                                        )
                                    })}
                                </div>
                            </Collapse>
                        </li>
                        <li>
                            <Button
                                variant="text"
                                color="blue"
                                className="p-1 flex items-center gap-3 text-sm tracking-normal font-normal normal-case"
                                onClick={() => setOpenTestMenuMobile(!openTestMenuMobile)}
                            >
                                {t('testMenu')}{" "}
                                <BsChevronDown
                                    strokeWidth={1}
                                    className={`h-3.5 w-3.5 transition-transform ${openTestMenuMobile ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                            <Collapse open={openTestMenuMobile}>
                                <div className="flex flex-col px-4">
                                    {testItems?.map(test => {
                                        return (
                                            <Link key={test.id} to={`/tests/${test.id}`} className="p-1 font-normal hover:underline text-blue-gray-700 hover:cursor-pointer">
                                                {String(test[`title_${i18n.language}` as keyof typeof test])}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </Collapse>
                        </li>
                        <li>
                            <Button
                                variant="text"
                                color="blue"
                                className="p-1 flex items-center gap-3 text-sm tracking-normal font-normal normal-case"
                                onClick={() => setOpenInfoMenuMobile(!openInfoMenuMobile)}
                            >
                                {t('infoMenu')}{" "}
                                <BsChevronDown
                                    strokeWidth={1}
                                    className={`h-3.5 w-3.5 transition-transform ${openInfoMenuMobile ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                            <Collapse open={openInfoMenuMobile}>
                                <div className="flex flex-col px-4">
                                    {infoItems?.map(info => {
                                        return (
                                            <Link key={info.id} to={`/info/${info.id}`} className="p-1 font-normal hover:underline text-blue-gray-700 hover:cursor-pointer">
                                                {String(info[`title_${i18n.language}` as keyof typeof info])}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </Collapse>
                        </li>
                        <Typography
                            as="li"
                            className="p-1 text-sm font-normal hover:underline text-primary-500"
                        >
                            <Link to="/about" className="flex items-center">
                                {t('feedbackMenu')}
                            </Link>
                        </Typography>
                        {auth.session?.user
                            ? <div className="text-primary-500 text-sm p-1">
                                <div className="">{auth.session.user.email}</div>
                                <div>
                                    <Link to="/profile" className="underline cursor-pointer mr-1 lowercase">{t('profile')}</Link>
                                    <span className="underline cursor-pointer lowercase" onClick={handleLogout}>{t('exit')}</span>
                                </div>
                            </div>
                            : <Typography
                                as="li"
                                className="p-1 font-normal hover:cursor-pointer text-primary-500 text-sm"
                                onClick={() => setOpenLogin ? setOpenLogin(!openLogin) : null}
                            >
                                <div className="flex items-center">
                                    {t('enterOrRegister')}
                                </div>
                            </Typography>}
                    </ul>
                </div>
            </Collapse>
        </div>
    )
}

export default NavigatorPanel;