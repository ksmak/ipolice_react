import { IconButton } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const LanguagePanel = () => {
    const { i18n } = useTranslation();

    return (
        <div>
            <IconButton
                variant="text"
                size="sm"
                className={`mr-1 rounded-full ${i18n.language === 'kk' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white`}
                onClick={() => i18n.changeLanguage('kk')}
            >
                kz
            </IconButton>
            <IconButton
                variant="text"
                size="sm"
                className={`mr-1 rounded-full ${i18n.language === 'ru' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white`}
                onClick={() => i18n.changeLanguage('ru')}
            >
                ru
            </IconButton>
            <IconButton
                variant="text"
                size="sm"
                className={`mr-1 rounded-full ${i18n.language === 'en' ? 'bg-teal-600' : 'bg-blue-gray-300'} text-white border-4 border-white`}
                onClick={() => i18n.changeLanguage('en')}
            >
                en
            </IconButton>
        </div>
    )
}

export default LanguagePanel;