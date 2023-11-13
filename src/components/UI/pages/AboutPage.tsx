import { useTranslation } from "react-i18next";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { useContext, useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router";
import { supabase } from "../../../api/supabase";
import { Comment, Dict } from "../../../types/types";
import { Link } from "react-router-dom";

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

    const contacts: Dict[] = [
        {
            id: 1,
            title_kk: 'Қарағанды облысының полиция департаменті, Қарғанды қаласы, Ерубаева көшесі 37, телефон: 8-(7212)-00-00-00',
            title_ru: 'Департамент полиции Карагандинской области, город Караганда, улица Ерубаева 37, телефон: 8-(7212)-00-00-00',
            title_en: 'Police Department of the Karaganda region, Karaganda city, Erubaeva street 37, phone: 8-(7212)-00-00-00',
        },
        {
            id: 1,
            title_kk: 'Криминалдық полиция басқармасы, телефон: 8-(7212)-00-00-00',
            title_ru: 'Управление криминальной полиции, телефон: 8-(7212)-00-00-00',
            title_en: 'Criminal Police Department, phone: 8-(7212)-00-00-00',
        }
    ];

    return (
        <div>
            <NavigatorPanel />
            <Alert className="bg-blue-400 mb-4" open={openSuccess} onClose={() => setOpenSuccess(false)}>{t('successSendMessage')}</Alert>
            <Alert className="bg-red-500 mb-4" open={openError} onClose={() => setOpenError(false)}>{error}</Alert>
            <div className="flex flex-col items-center gap-2 p-5">
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
                <div className="flex flex-row justify-between gap-2 w-full flex-wrap lg:flex-nowrap">
                    <div className="w-full">
                        <div className="bg-blue-400 text-white text-lg w-full p-4 mt-2">
                            {t('contacts')}
                        </div>
                        {contacts.map((item) => <div className="p-5" key={item.id}>{item[`title_${i18n.language}` as keyof typeof item]}</div>)}
                    </div>
                </div>
                <div className="w-full bg-white my-4">
                    <div className="text-blue-400">{t('feedbackMenu')}</div>
                    <textarea
                        rows={7}
                        className="border-2 border-blue-gray-200 p-1 w-full rounded-md mr-1"
                        value={comment?.text ? comment.text : ''}
                        onChange={(e) => setComment({ ...comment, text: e.target.value })}
                    />
                    <div>
                        <Button className="bg-blue-400 mb-52" size="md" onClick={handleAddComment}>{t('sendMessage')}</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutPage;