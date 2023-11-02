import { Alert, Button, Card, CardBody, CardHeader, Carousel, Chip, Typography } from "@material-tailwind/react";
import { Comment, Item, UserRole } from "../../../types/types";
import { useTranslation } from "react-i18next";
import moment from "moment";
import 'moment/locale/ru';
import 'moment/locale/kk';
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../../api/supabase";
import { AuthContext, MetaDataContext } from "../../../App";
import CommentsPanel from "../panels/CommentsPanel";
import Loading from "../elements/Loading";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";

const ItemView = () => {
    const { itemId } = useParams();
    const auth = useContext(AuthContext);
    const { categories, regions, districts } = useContext(MetaDataContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const role = auth.role;
    const [comment, setComment] = useState<Comment>({});
    const [error, setError] = useState('');
    const [item, setItem] = useState<Item>({
        id: null,
        category_id: null,
        title_kk: null,
        title_ru: null,
        title_en: null,
        text_kk: null,
        text_ru: null,
        text_en: null,
        region_id: null,
        district_id: null,
        punkt_kk: null,
        punkt_ru: null,
        punkt_en: null,
        date_of_action: moment().format('YYYY-MM-DD'),
        time_of_action: moment().format('HH:MM'),
        data: null,
        created_at: '',
        user_id: ''
    } as Item);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (itemId) {
            getItem(itemId);
            getComments(itemId);
        }
    }, [itemId]);

    const getItem = async (itemId: string) => {
        const { data } = await supabase
            .from('item')
            .select()
            .eq('id', itemId)
            .single();
        if (data) {
            const prunedData = data as Item;
            setItem(prunedData);
        }
    }

    const getComments = async (itemId: string) => {
        const { data } = await supabase
            .from('comments')
            .select()
            .eq('item_id', itemId);
        if (data) {
            const prunedData = data as Comment[];
            setComments(prunedData);
        }
    }

    const getPlaceInfo = (): string => {
        var place = [];
        const punkt = item[`punkt_${i18n.language}` as keyof typeof item];
        if (punkt) {
            place.push(punkt);
        }
        if (item.district_id) {
            const district = districts?.find(d => d.id === item.district_id);
            if (district) {
                place.push(district[`title_${i18n.language}` as keyof typeof district]);
            }
        }
        if (item.region_id) {
            const region = regions?.find(r => r.id === item.region_id);
            if (region) {
                place.push(region[`title_${i18n.language}` as keyof typeof region]);
            }
        }
        let date = moment(`${item.category_id} ${item.time_of_action}`).locale(i18n.language).format('LLLL');
        place.push(date);
        return place.join(', ');
    }
    const title = item[`title_${i18n.language}` as keyof typeof item] as string;
    const place_info = getPlaceInfo();
    const text = item[`text_${i18n.language}` as keyof typeof item] as string;
    const date_add = `${t('dateAdd')}: ${moment(item.created_at).locale(i18n.language).format('LL')}`;

    const handleClose = () => {
        navigate(-1);
    }

    const handleAddComment = async () => {
        if (!auth.session?.user) {
            navigate('/login')
        }

        setComment({ ...comment, item_id: item.id })

        const { data, error } = await supabase
            .from('comments')
            .insert(comment)
            .select()
            .single();
        if (error) {
            setError(error.message);
        }
        if (data) {
            if (item.id) {
                getComments(String(item.id));
            }
        }
    }

    const handleRemoveComment = async (id: number | null | undefined) => {
        if (id) {
            const { error } = await supabase.from('comments').delete().eq('id', id);
            if (error) {
                setError(error.message);
                return;
            }
            if (item.id) {
                getComments(String(item.id));
            }
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="h-fit bg-blue-gray-50 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            <Alert className="bg-red-500" open={error !== ''}>{error}</Alert>
            <div className="flex flex-row justify-end py-4 pr-5">
                {role === UserRole.admin || role === UserRole.editor || (role === UserRole.operator && auth.session?.user.id === item?.user_id)
                    ? <Button
                        className="bg-teal-700 mr-3"
                        size="sm"
                        onClick={() => navigate(`/items/edit/${item.id}`)}
                    >
                        {t('edit')}
                    </Button>
                    : null}
                <Button
                    className=""
                    size="sm"
                    variant="outlined"
                    color="teal"
                    onClick={handleClose}
                >
                    {t('close')}
                </Button>
            </div>
            {item.id
                ? <div><Card className="bg-blue-gray-50 mt-5 pt-5">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="h-1/2 flex flex-col items-center"
                    >
                        <Carousel className="w-1/2 rounded-xl">
                            {item.data?.photos
                                ? item.data.photos.map((photo, index) => {
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
                    <CardBody>
                        <Typography variant="h3" color="teal">{title}</Typography>
                        <Typography variant="h6" color="teal" className="uppercase mt-4">{t('placeAndTime')}</Typography>
                        <Typography variant="small">{place_info}</Typography>
                        <Typography variant="h6" color="teal" className="uppercase mt-4">{t('text')}</Typography>
                        <Typography variant="small">{text}</Typography>
                        <Typography variant="h6" color="teal" className="uppercase mt-4">{t('details')}</Typography>
                        <div className="flex flex-row flex-wrap gap-2">
                            {item.data?.details
                                ? item.data.details.map((detail, index) => {
                                    let category = categories?.find(category => category.id === item.category_id);
                                    let field = category?.fields.find(field => field.field_name === detail.field_name);
                                    let title = field ? field[`title_${i18n.language}` as keyof typeof field] as string : '';
                                    let display = `${title}:${detail.value}`;
                                    return (
                                        <Chip key={index} value={display} size="sm" className="bg-teal-800" />
                                    )
                                })
                                : null}
                        </div>
                        <Typography variant="small" className="mt-3">{date_add}</Typography>
                    </CardBody>
                </Card>
                    <div className="w-full bg-white mt-6">
                        <CommentsPanel comments={comments} handleRemoveComment={handleRemoveComment} />
                    </div>
                    <div className="w-full bg-white mb-4">
                        <textarea
                            className="border-2 border-blue-gray-200 p-1 w-full rounded-md mr-1"
                            value={comment?.text ? comment.text : ''}
                            onChange={(e) => setComment({ ...comment, text: e.target.value })}
                        />
                        <div>
                            <Button className="bg-teal-600 mb-52" size="sm" onClick={handleAddComment}>{t('addComment')}</Button>
                        </div>
                    </div>
                </div> : <Loading />}
        </div>
    )
}

export default ItemView;