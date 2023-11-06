import { Button, Card, CardBody, CardHeader, Carousel, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Info, UserRole } from "../../../types/types";
import moment from "moment";
import { supabase } from "../../../api/supabase";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import Loading from "../elements/Loading";


interface InfoViewProps {
    infoId: string | undefined
}

const InfoView = ({ infoId }: InfoViewProps) => {
    const { session, roles } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [info, setInfo] = useState<Info>({
        id: null,
        title_ru: null,
        title_kk: null,
        title_en: null,
        text_kk: null,
        text_ru: null,
        text_en: null,
        date_of_action: moment().format('YYYY-MM-DD'),
        data: null,
        photo_path: null
    } as Info);

    useEffect(() => {
        getInfo();
    }, [infoId]);

    const getInfo = async () => {
        if (infoId) {
            const { data } = await supabase
                .from('info')
                .select()
                .eq('id', infoId)
                .single();
            if (data) {
                setInfo(data);
            }
        }
    }

    const title = String(info[`title_${i18n.language}` as keyof typeof info]);
    const text = String(info[`text_${i18n.language}` as keyof typeof info]);
    const date_add = `${moment(info.date_of_action).locale(i18n.language).format('LL')}`;
    const blocksFromHtml = htmlToDraft(text);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    return (
        <div className="h-screen w-full" >
            <div className="flex flex-row justify-end py-4 pr-5">
                {UserRole.admin in roles || (UserRole.info_edit in roles && session?.user.id === info?.user_id)
                    ? <Button
                        className="bg-teal-700 mr-3"
                        size="sm"
                        onClick={() => navigate(`/info/edit/${info.id}`)}
                    >
                        {t('edit')}
                    </Button>
                    : null}
                <Button
                    className=""
                    size="sm"
                    variant="outlined"
                    color="teal"
                    onClick={() => navigate(-1)}
                >
                    {t('close')}
                </Button>
            </div>
            {info.id ? <Card className="bg-blue-gray-50 mt-5 pt-5">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="h-1/2 flex flex-col items-center"
                >
                    <Carousel className="w-1/2 rounded-xl">
                        {info.data?.photos
                            ? info.data.photos.map((photo, index) => {
                                return photo ?
                                    (
                                        <img
                                            className="h-full w-full object-contain object-center"
                                            key={index}
                                            src={photo}
                                            alt={photo}
                                        />
                                    )
                                    : null
                            }
                            )
                            : <img
                                className="h-full w-full object-contain object-center"
                                src="default.png"
                                alt="default"
                            />}
                    </Carousel>
                </CardHeader>
                <CardBody className="flex flex-col">
                    <Typography variant="h3" color="teal" className="self-center">{title}</Typography>
                    <Editor toolbarHidden editorState={editorState} readOnly={true} />
                    <Typography variant="small" className="mt-3">{date_add}</Typography>
                </CardBody>
            </Card>
                : <Loading />}
        </div>
    )
}

export default InfoView;