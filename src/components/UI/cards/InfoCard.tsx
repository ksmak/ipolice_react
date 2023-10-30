import { Carousel } from "@material-tailwind/react";
import { Info } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Link } from "react-router-dom";
import { truncate } from "../../../utils/utils";
import { useEffect, useState } from "react";

interface InfoCardProps {
    info: Info,
}

const InfoCard = ({ info }: InfoCardProps) => {
    const { t, i18n } = useTranslation();
    const title = info[`title_${i18n.language}` as keyof typeof info] as string;
    const [content, setContent] = useState('');

    useEffect(() => {
        try {
            const text = info[`text_${i18n.language}` as keyof typeof info] as string;
            const blocksFromHtml = htmlToDraft(text);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setContent(editorState.getCurrentContent().getPlainText('\u0001'));
        } catch (e) {
            console.log(e);
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className="w-full md:w-96 flex flex-col justify-between border-2 border-blue-600 mt-4">
            <Carousel className="h-64 rounded-sm">
                {info.data?.photos
                    ? info.data.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={photo}
                            className="h-full w-full object-cover object-center"
                        />

                    ))
                    :
                    <img
                        src='default.png'
                        alt="default"
                        className="h-full w-full object-cover object-center"
                    />}
            </Carousel>
            <div className="h-18 bg-blue-600 w-full p-2 text-white font-bold text-lg py-4">
                <Link to={`/info/${info.id}`} className="hover:underline">{truncate(title, 70)}</Link>
            </div>
            <div className="h-14 p-2 text-blue-900 text-sm">
                {truncate(content, 130)}
            </div>
            <div className="h-8 text-end p-2 text-blue-900 font-serif text-sm">
                <Link to={`/info/${info.id}`} className="hover:underline">{t('readAll')}</Link>
            </div>
        </div>
    )
}

export default InfoCard;