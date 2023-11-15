import { useTranslation } from "react-i18next";
import NavigatorPanel from "../panels/NavigatorPanel";
import { useContext, useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router";
import { supabase } from "../../../api/supabase";
import { Comment } from "../../../types/types";

const AboutPage = () => {
    const { t, i18n } = useTranslation();
    const { session } = useContext(AuthContext);
    const navigate = useNavigate();
    const [comment, setComment] = useState<Comment>({ about: true });
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleAddComment = async () => {
        setError('');
        setOpenError(false);
        if (!session?.user) {
            navigate('/login')
        }
        if (!comment.text || comment.text.trim() === '') {
            setError(t('errorEmptyMessage'));
            setOpenError(true);
            return;
        }
        const { error } = await supabase
            .from('comments')
            .insert(comment)
        if (error) {
            setError(error.message);
            setOpenError(true);
        }
        setComment({ about: true });
        setOpenSuccess(true);
        setInterval(() => setOpenSuccess(false), 3000);
    }

    const contacts = [
        {
            title_kk: 'Криминалдық полиция басқармасы',
            title_ru: 'Управление криминальной полиции',
            title_en: 'Criminal Police Department',
            phone: '8-(7212)-42-90-07'
        },
        {
            title_kk: 'Экстремизмге қарсы күрес департаменті',
            title_ru: 'Управление по противодействию экстремизму',
            title_en: 'Department for Combating Extremism',
            phone: '8-(7212)-42-90-45'
        },
        {
            title_kk: 'Есірткі қылмысына қарсы күрес басқармасы',
            title_ru: 'Управление по противодействию наркопреступности',
            title_en: 'Department for Combating Drug Crime',
            phone: '8-(7212)-42-70-45'
        },
        {
            title_kk: 'Тергеу басқармасы',
            title_ru: 'Следственное управление',
            title_en: 'Investigative Department',
            phone: '8-(7212)-42-90-29'
        },
        {
            title_kk: 'Анықтау басқармасы',
            title_ru: 'Управление дознания',
            title_en: 'Inquiry Management',
            phone: '8-(7212)-42-90-82'
        },
        {
            title_kk: 'Жергілікті полиция қызметі басқармасы',
            title_ru: 'Управление местной полицейской службы',
            title_en: 'Local Police Service Department',
            phone: '8-(7212)-42-78-02'
        },
        {
            title_kk: 'Әкімшілік полиция басқармасы',
            title_ru: 'Управление административной полиции',
            title_en: 'Administrative Police Department',
            phone: '8-(7212)-42-78-78'
        },
        {
            title_kk: 'Көші-қон қызметі басқармасы',
            title_ru: 'Управление миграционной службы',
            title_en: 'Department of Migration Service',
            phone: '8-(7212)-42-70-27'
        },
    ];

    return (
        <div>
            <NavigatorPanel />
            <Alert className="bg-primary-500 mb-4" open={openSuccess} onClose={() => setOpenSuccess(false)}>{t('successSendMessage')}</Alert>
            <Alert className="bg-red-500 mb-4" open={openError} onClose={() => setOpenError(false)}>{error}</Alert>
            <div className="flex flex-col items-center gap-2 p-5 h-[calc(100vh-5.75rem)] overflow-y-auto">
                <div className="flex flex-row justify-between gap-2 w-full flex-wrap lg:flex-nowrap">
                    <div className="w-full flex flex-col">
                        <div className="bg-primary-500 text-white text-lg w-full p-4">
                            {t('contacts')}
                        </div>
                        <div className="pt-5 px-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4 items-center">
                                <a
                                    className="font-bold text-white bg-red-400 border-2 border-red-400 p-3 rounded-full w-fit flex flex-row gap-4"
                                    href={`tel:${process.env.REACT_APP_102_PHONE}`
                                    }
                                >
                                    {t('bell-102')}
                                    <img src="/icons/phone-white.png" alt="phone" />
                                </a>
                                <a
                                    className="text-primary-500 underline flex flex-row gap-4 items-center"
                                    href="https://play.google.com/store/apps/details?id=kz.q19.sos&hl=ru&gl=US"
                                    target="_blank" rel="noreferrer"
                                >
                                    {t('app-102')}
                                    <img className="h-24" src="/icons/102.webp" alt="phone" />
                                </a>
                            </div>
                            <strong>{t('department')}:</strong>
                            <div className="w-2/3 flex flex-row justify-between">
                                <p className="lowercase">{t('address')}:</p>
                                <p>г.Караганда, улица Ерубаева 37</p>
                            </div>
                            <div className="w-2/3 flex flex-row justify-between">
                                <p className="lowercase">{t('dejurka')}:</p>
                                <p>8-(7212)-42-90-25</p>
                            </div>
                            <div className="w-2/3 flex flex-row justify-between">
                                <p className="lowercase">{t('front-office')}:</p>
                                <p>8-(7212)-42-90-90</p>
                            </div>
                            <div className="w-2/3 flex flex-row justify-between">
                                <p className="lowercase">{t('helpline')}:</p>
                                <p>8-(7212)-42-93-39</p>
                            </div>
                            <strong>{t('departments')}:</strong>
                            {contacts.map((item, index) => {
                                return (
                                    <div key={index} className="w-2/3 flex flex-row justify-between">
                                        <p>{item[`title_${i18n.language}` as keyof typeof item]}</p>
                                        <p>{item.phone}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full">
                        <iframe
                            className="w-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.8720597708786!2d73.09116907035765!3d49.80718463963638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42434726c2e4f157%3A0x4566bd5fa4024ff7!2z0JTQnyDQmtCw0YDQsNCz0LDQvdC00LjQvdGB0LrQvtC5INC-0LHQu9Cw0YHRgtC4!5e0!3m2!1sru!2skz!4v1698647748384!5m2!1sru!2skz"
                            width="600"
                            height="450"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="karaganda police department"
                        >
                        </iframe>
                        <div className="pt-5">
                            <div className="text-primary-500">{t('feedbackMenu')}</div>
                            <textarea
                                rows={7}
                                className="border-2 border-blue-gray-200 p-1 w-full rounded-md mr-1"
                                value={comment?.text ? comment.text : ''}
                                onChange={(e) => setComment({ ...comment, text: e.target.value })}
                            />
                            <div>
                                <Button className="bg-primary-500 mb-52" size="md" onClick={handleAddComment}>{t('sendMessage')}</Button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default AboutPage;