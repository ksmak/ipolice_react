import { useTranslation } from "react-i18next";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { useContext, useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router";
import { supabase } from "../../../api/supabase";
import { Comment, Dict } from "../../../types/types";

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

    const policeNumbers: Dict[] = [
        {
            id: 1,
            title_kk: '',
            title_ru: '',
            title_en: '',
        }
    ];

    const managementsNumbers: Dict[] = [
        {
            id: 1,
            title_kk: '',
            title_ru: '',
            title_en: '',
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="h-fit bg-blue-gray-50 grid p-4 gap-4 mb-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            <Alert className="bg-teal-500 mb-4" open={openSuccess} onClose={() => setOpenSuccess(false)}>{t('successSendMessage')}</Alert>
            <Alert className="bg-red-500 mb-4" open={openError} onClose={() => setOpenError(false)}>{error}</Alert>
            <div className="flex flex-col items-center gap-2">
                <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.8720597708786!2d73.09116907035765!3d49.80718463963638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42434726c2e4f157%3A0x4566bd5fa4024ff7!2z0JTQnyDQmtCw0YDQsNCz0LDQvdC00LjQvdGB0LrQvtC5INC-0LHQu9Cw0YHRgtC4!5e0!3m2!1sru!2skz!4v1698647748384!5m2!1sru!2skz" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="flex flex-row justify-between gap-2 w-full flex-wrap lg:flex-nowrap">
                    <div className="w-full">
                        <div className="bg-teal-600 text-white text-lg w-full p-4 mt-2">
                            {t('policeNumbers')}
                        </div>
                        {policeNumbers.map((item) => <div key={item.id}>{item[`title_${i18n.language}` as keyof typeof item]}</div>)}
                    </div>
                    <div className="w-full">
                        <div className="bg-teal-600 text-white text-lg w-full p-4 mt-2">
                            {t('managementsNumbers')}
                        </div>
                        {managementsNumbers.map((item) => <div key={item.id}>{item[`title_${i18n.language}` as keyof typeof item]}</div>)}
                    </div>
                </div>
                <div className="w-full bg-white mb-4">
                    <textarea
                        className="border-2 border-blue-gray-200 p-1 w-full rounded-md mr-1"
                        value={comment?.text ? comment.text : ''}
                        onChange={(e) => setComment({ ...comment, text: e.target.value })}
                    />
                    <div>
                        <Button className="bg-teal-600 mb-52" size="md" onClick={handleAddComment}>{t('sendMessage')}</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutPage;