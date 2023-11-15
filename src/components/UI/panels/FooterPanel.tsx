import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FooterPanel() {
    const { t, i18n } = useTranslation();
    const outerLinks = [
        {
            href: "https://www.gov.kz/memleket/entities/qriim?lang=ru",
            title_kk: "ҚР Ішкі істер министрлігінің сайты",
            title_ru: "Сайт Министерства внутренних дел РК",
            title_en: "Website of the Ministry of Internal Affairs of the RK"
        },
        {
            href: "https://polisia.kz/ru/",
            title_kk: "POLISIA.KZ ақпараттық медиа-порталы",
            title_ru: "Информационный медиа-портал POLISIA.KZ",
            title_en: "Information media portal POLISIA.KZ"
        },
        {
            href: "https://t.me/s/POLICE_of_KZ",
            title_kk: "POLISIA.KZ телеграм каналы",
            title_ru: "Телеграм-канал POLISIA.KZ",
            title_en: "Telegram channel POLISIA.KZ"
        },

    ];

    const contacts = [
        {
            id: 1,
            title_kk: 'Қарағанды облысының полиция департаменті, Қарғанды қаласы, Ерубаева көшесі 37, телефон деж.части: 8-(7212)-42-90-25',
            title_ru: 'Департамент полиции Карагандинской области, город Караганда, улица Ерубаева 37, кезекші бөлім телефоны: 8-(7212)-42-90-25',
            title_en: 'Police Department of the Karaganda region, Karaganda city, Erubaeva street 37, phone: 8-(7212)-42-90-25',
        },
        {
            id: 2,
            title_kk: 'Криминалдық полиция басқармасы, телефон: 8-(7212)-42-90-07',
            title_ru: 'Управление криминальной полиции, телефон: 8-(7212)-42-90-07',
            title_en: 'Criminal Police Department, phone: 8-(7212)-42-90-07',
        }
    ];

    return (
        <footer className="hidden absolute bottom-0 w-full bg-blue-gray-50 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-4 py-4 border-t-2 border-primary-500">
            <div className="pb-2 basis-72 flex flex-col gap-2">
                <div className="text-xs uppercase font-bold text-blue-gray-600">
                    крим-инфо
                </div>
                <Link to='/categories' className="text-xs font-bold text-blue-gray-500 hover:underline">
                    {t('categories')}
                </Link>
                <Link to='/search' className="text-xs font-bold text-blue-gray-500 hover:underline">
                    {t('searching')}
                </Link>
                <Link to='/about' className="text-xs font-bold text-blue-gray-500 hover:underline">
                    {t('feedbackMenu')}
                </Link>
            </div>
            <div className="pb-2 basis-72 flex flex-col gap-2">
                <div className="text-xs uppercase font-bold text-blue-gray-600">
                    {t('outerLinks')}
                </div>
                {outerLinks.map((item, index) => (
                    <Link key={index} to={item.href} className="text-xs font-bold text-blue-gray-500 hover:underline">
                        {item[`title_${i18n.language}` as keyof typeof item]}
                    </Link>
                ))}
            </div>
            <div className="pb-2 basis-72 flex flex-col gap-2">
                <div className="text-xs uppercase font-bold text-blue-gray-600">
                    {t('documents')}
                </div>
                <a
                    className="text-xs font-bold text-blue-gray-500 hover:underline"
                    href='https://docs.google.com/document/d/1Sdo4xzNa6ywcNoG3R5vlFcFR5h0dQRChzG2WGbMRBx0/edit?usp=sharing'
                    target="_blank"
                    rel="noreferrer"
                >
                    {t('requisites')}
                </a>
                <a
                    className="text-xs font-bold text-blue-gray-500 hover:underline"
                    href='https://docs.google.com/document/d/1yLOptVQUHeKoJwv5cjNe2hbEdAkUcerIVBXPJXvfVts/edit?usp=sharing'
                    target="_blank"
                    rel="noreferrer"
                >
                    {t('policy')}
                </a>
            </div>
            <div className="pb-2 basis-72 flex flex-col gap-2">
                <div className="text-xs uppercase font-bold text-blue-gray-600">
                    {t('contacts')}
                </div>
                {contacts.map((item, index) => (
                    <div key={index} className="text-xs font-bold text-blue-gray-500">
                        {item[`title_${i18n.language}` as keyof typeof item]}
                    </div>
                ))}
            </div>
        </footer>
    )
}