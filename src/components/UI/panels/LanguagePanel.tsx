import { useTranslation } from "react-i18next";

const LanguagePanel = () => {
    const { i18n } = useTranslation();

    return (
        <div className="flex flex-row items-center gap-1">
            <span className={`${i18n.language === 'kk' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white rounded-full h-8 w-8 pt-0.5 text-center text-sm hover:cursor-pointer`}
                onClick={() => i18n.changeLanguage('kk')}
            >
                KZ
            </span>
            <span className={`${i18n.language === 'ru' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white rounded-full h-8 w-8 pt-0.5 text-center text-sm hover:cursor-pointer`}
                onClick={() => i18n.changeLanguage('ru')}
            >
                RU
            </span>
            <span className={`${i18n.language === 'en' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white rounded-full h-8 w-8 pt-0.5 text-center text-sm hover:cursor-pointer`}
                onClick={() => i18n.changeLanguage('en')}
            >
                EN
            </span>
        </div>
    )
}

export default LanguagePanel;