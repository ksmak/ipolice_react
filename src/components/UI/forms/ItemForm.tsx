import { Alert, Button } from "@material-tailwind/react";
import SelectField from "../elements/SelectField";
import { Detail, Field, Item, Photo } from "../../../types/types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MetaDataContext } from "../../../App";
import InputField from "../elements/InputField";
import TextareaField from "../elements/TextareaField";
import DetailsTable from "../elements/DetailsTable";
import PhotosTable from "../elements/PhotosTable";
import uuid from 'react-uuid';
import { supabase } from "../../../api/supabase";
import { useNavigate, useParams } from "react-router";
import Loading from "../elements/Loading";
import { getFileFromUrl, googleTranslate, uploadFiles } from "../../../utils/utils";
import moment from "moment";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";

const ItemForm = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { categories, regions, districts } = useContext(MetaDataContext);
    const [fields, setFields] = useState<Field[]>([]);
    const [detailError, setDetailError] = useState(false);
    const [photoError, setPhotoError] = useState(false);
    const [isSuccesSave, setIsSuccesSave] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [details, setDetails] = useState<Detail[]>([]);
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
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        getItem();
    }, [itemId]);

    useEffect(() => {
        if (item?.category_id) {
            const category = categories?.find(category => category.id === item.category_id);
            if (category && category.fields) {
                setFields(category.fields);
            }
        }
    }, [item?.category_id, categories])

    const getItem = async () => {
        if (itemId) {
            const { data } = await supabase
                .from('item')
                .select()
                .eq('id', itemId)
                .single();
            if (data) {
                const prunedData = data as Item;
                setItem(prunedData);
                getPhotos(prunedData);
                getDetails(prunedData);
            }
        }
    }

    const getPhotos = (item: Item) => {
        if (item?.data?.details) {
            setDetails(item.data.details);
        }
    }

    const getDetails = async (item: Item) => {
        if (item?.data?.photos) {
            let photosFromBase: Photo[] = [];
            for (const url of item.data.photos) {
                const id = uuid();
                const file = await getFileFromUrl(url, id);
                photosFromBase.push({
                    id: id,
                    file: file
                })
            }
            setPhotos(photosFromBase);
        }
    }

    const handleSave = async () => {
        let newId = '';
        setErrors('');
        setIsError(false);
        setIsSuccesSave(false);
        setLoading(true);
        const photo_path = item?.photo_path ? item.photo_path : `items/${uuid()}`;
        const { uploadError, urls } = await uploadFiles('crimeinfo_storage', photo_path, photos);
        if (uploadError) {
            setLoading(false);
            setErrors(uploadError.message);
            setIsError(true);
            setIsSuccesSave(false);
            return;
        }
        if (item?.id) {
            const { error } = await supabase.from('item')
                .update({
                    category_id: item.category_id,
                    title_kk: item.title_kk ? item.title_kk : item.title_ru,
                    title_ru: item.title_ru ? item.title_ru : item.title_kk,
                    title_en: item.title_en ? item.title_en : item.title_ru ? item.title_ru : item.title_kk,
                    text_kk: item.text_kk ? item.text_kk : item.text_ru,
                    text_ru: item.text_ru ? item.text_ru : item.text_kk,
                    text_en: item.text_en ? item.text_en : item.text_ru ? item.text_ru : item.text_kk,
                    region_id: item.region_id,
                    district_id: item.district_id,
                    punkt_kk: item.punkt_kk ? item.punkt_kk : item.punkt_ru,
                    punkt_ru: item.punkt_ru ? item.punkt_kk : item.punkt_kk,
                    punkt_en: item.punkt_en ? item.punkt_en : item.punkt_ru ? item.punkt_ru : item.punkt_kk,
                    date_of_action: item.date_of_action,
                    time_of_action: item.time_of_action,
                    photo_path: photo_path,
                    data: { details: details, photos: urls },
                })
                .eq('id', item.id);
            if (error) {
                setLoading(false);
                setErrors(error.message);
                setIsError(true);
                setIsSuccesSave(false);
                return;
            }
        } else {
            const { data, error } = await supabase.from('item')
                .insert({
                    category_id: item.category_id,
                    title_kk: item.title_kk ? item.title_kk : item.title_ru,
                    title_ru: item.title_ru ? item.title_ru : item.title_kk,
                    title_en: item.title_en ? item.title_en : item.title_ru ? item.title_ru : item.title_kk,
                    text_kk: item.text_kk ? item.text_kk : item.text_ru,
                    text_ru: item.text_ru ? item.text_ru : item.text_kk,
                    text_en: item.text_en ? item.text_en : item.text_ru ? item.text_ru : item.text_kk,
                    region_id: item.region_id,
                    district_id: item.district_id,
                    punkt_kk: item.punkt_kk ? item.punkt_kk : item.punkt_ru,
                    punkt_ru: item.punkt_ru ? item.punkt_kk : item.punkt_kk,
                    punkt_en: item.punkt_en ? item.punkt_en : item.punkt_ru ? item.punkt_ru : item.punkt_kk,
                    date_of_action: item.date_of_action,
                    time_of_action: item.time_of_action,
                    photo_path: photo_path,
                    data: { details: details, photos: urls },
                })
                .select()
                .single();
            if (error) {
                setLoading(false);
                setErrors(error.message);
                setIsError(true);
                setIsSuccesSave(false);
                return;
            }
            if (data) {
                setItem(data);
                newId = data.id;
            }
        }
        setLoading(false);
        setIsError(false);
        setIsSuccesSave(true);
        setInterval(() => setIsSuccesSave(false), 3000);
        if (newId) {
            navigate(`/items/edit/${newId}`);
        }
    }

    const handleClose = () => {
        navigate(-1);
    }


    const handleAddDetail = (fieldName: string | undefined, value: string | undefined) => {
        setDetailError(false);
        if (!fieldName || !value) {
            setDetailError(true);
            return;
        }
        setDetails([...details, { field_name: fieldName, value: value }]);
        setOpenDetail(false);
    }

    const handleRemoveDetail = (index: number) => {
        setDetails([
            ...details.slice(0, index),
            ...details.slice(index + 1, details.length)
        ]);
    }

    const handleAddPhoto = () => {
        setPhotoError(false);
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (e.target && files) {
                const file = files[0];
                const file_id = uuid()
                setPhotos([...photos, { id: file_id, file: file }]);
            }
        };
        input.click();
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos([
            ...photos.slice(0, index),
            ...photos.slice(index + 1, photos.length)
        ]);
    }

    const handleTranslateRusToKaz = async () => {
        setLoading(true);
        if (item.title_ru && item.title_kk?.trim() !== '') {
            const { data } = await googleTranslate('ru', 'kk', String(item.title_kk));
            setItem({ ...item, title_kk: data });
        }
        if (item.text_ru && item.text_kk?.trim() !== '') {
            const { data } = await googleTranslate('ru', 'kk', String(item.text_kk));
            setItem({ ...item, text_kk: data });
        }
        setLoading(false);
    }

    const handleTranslateRusToEng = async () => {
        setLoading(true);
        if (item.title_ru && item.title_kk?.trim() !== '') {
            const { data } = await googleTranslate('ru', 'kk', String(item.title_kk));
            setItem({ ...item, title_kk: data });
        }
        if (item.text_ru && item.text_kk?.trim() !== '') {
            const { data } = await googleTranslate('ru', 'kk', String(item.text_kk));
            setItem({ ...item, text_kk: data });
        }
        setLoading(false);
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
            <form method="post" action="/item" className="mt-4">
                <div className="flex flex-row justify-end py-4">
                    {i18n.language === 'kk'
                        ? <Button
                            className="bg-teal-700 mr-4"
                            size="sm"
                            onClick={handleTranslateRusToKaz}
                        >
                            {t('translate')}
                        </Button>
                        : null}
                    {i18n.language === 'en'
                        ? <Button
                            className="bg-teal-700 mr-4"
                            size="sm"
                            onClick={handleTranslateRusToEng}
                        >
                            {t('translate')}
                        </Button>
                        : null}
                    <Button
                        className="bg-teal-700 mr-4"
                        size="sm"
                        onClick={handleSave}
                    >
                        {t('save')}
                    </Button>
                    <Button
                        className=""
                        variant="outlined"
                        size="sm"
                        color="teal"
                        onClick={handleClose}
                    >
                        {t('close')}
                    </Button>
                </div>
                <Alert className="bg-teal-500 mb-4" open={isSuccesSave} onClose={() => setIsSuccesSave(false)}>{t('successSave')}</Alert>
                <Alert className="bg-red-500 mb-4" open={isError} onClose={() => setIsError(false)}>{errors}</Alert>
                <div className="w-full mb-4">
                    <SelectField
                        name='category_id'
                        label={t('category')}
                        value={String(item?.category_id)}
                        onChange={(e) => setItem({ ...item, category_id: Number(e.target.value) })}
                        dict={categories}
                        required={true}
                    />
                </div>
                {i18n.language === 'kk'
                    ? <div>
                        <div className="w-full bg-white mb-4">
                            <InputField
                                type='text'
                                name='title_kk'
                                label={t('title_kk')}
                                value={item.title_kk ? item.title_kk : ''}
                                onChange={(e) => setItem({ ...item, title_kk: e.target.value })}
                                required={true}
                            />
                        </div>
                        <div className="w-full bg-white mb-4">
                            <TextareaField
                                rows={7}
                                name='text_kk'
                                label={t('text_kk')}
                                value={item.text_kk ? item.text_kk : ''}
                                onChange={(e) => setItem({ ...item, text_kk: e.target.value })}
                                required={true}
                            />
                        </div>
                    </div>
                    : i18n.language === 'ru'
                        ? <div>
                            <div className="w-full bg-white mb-4">
                                <InputField
                                    type='text'
                                    name='title_ru'
                                    label={t('title_ru')}
                                    value={item.title_ru ? item.title_ru : ''}
                                    onChange={(e) => setItem({ ...item, title_ru: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="w-full bg-white mb-4">
                                <TextareaField
                                    rows={7}
                                    name='text_ru'
                                    label={t('text_ru')}
                                    value={item.text_ru ? item.text_ru : ''}
                                    onChange={(e) => setItem({ ...item, text_ru: e.target.value })}
                                    required={true}
                                />
                            </div>
                        </div>
                        : i18n.language === 'en'
                            ? <div>
                                <div className="w-full bg-white mb-4">
                                    <InputField
                                        type='text'
                                        name='title_en'
                                        label={t('title_en')}
                                        value={item.title_en ? item.title_en : ''}
                                        onChange={(e) => setItem({ ...item, title_en: e.target.value })}
                                        required={true}
                                    />
                                </div>
                                <div className="w-full bg-white mb-4">
                                    <TextareaField
                                        rows={7}
                                        name='text_en'
                                        label={t('text_en')}
                                        value={item.text_en ? item.text_en : ''}
                                        onChange={(e) => setItem({ ...item, text_en: e.target.value })}
                                        required={true}
                                    />
                                </div>
                            </div>
                            : null}
                <div className="w-44 bg-white mb-4">
                    <InputField
                        type='date'
                        name='date_of_action'
                        label={t('date')}
                        value={item.date_of_action}
                        onChange={(e) => setItem({ ...item, date_of_action: e.target.value })}
                        required={true}
                    />
                </div>
                <div className="w-44 bg-white mb-4">
                    <InputField
                        type='time'
                        name='time_of_action'
                        label={t('time')}
                        value={item.time_of_action}
                        onChange={(e) => setItem({ ...item, time_of_action: e.target.value })}
                        required={true}
                    />
                </div>
                <div className="w-full mb-4">
                    <SelectField
                        name='region_id'
                        label={t('region')}
                        value={String(item.region_id)}
                        dict={regions}
                        onChange={(e) => setItem({ ...item, region_id: Number(e.target.value) })}
                        required={true}
                    />
                </div>
                <div className="w-full mb-4">
                    <SelectField
                        name='district_id'
                        label={t('district')}
                        value={String(item.district_id)}
                        dict={districts}
                        onChange={(e) => setItem({ ...item, district_id: Number(e.target.value) })}
                        required={true}
                    />
                </div>
                {i18n.language === 'kk'
                    ? <div>
                        <div className="w-full bg-white mb-4">
                            <InputField
                                type='text'
                                name='punkt_kk'
                                label={t('punkt')}
                                value={item.punkt_kk ? item.punkt_kk : ''}
                                onChange={(e) => setItem({ ...item, punkt_kk: e.target.value })}
                                required={true}
                            />
                        </div>
                    </div>
                    : i18n.language === 'ru'
                        ? <div>
                            <div className="w-full bg-white mb-4">
                                <InputField
                                    type='text'
                                    name='punkt_ru'
                                    label={t('punkt')}
                                    value={item.punkt_ru ? item.punkt_ru : ''}
                                    onChange={(e) => setItem({ ...item, punkt_ru: e.target.value })}
                                    required={true}
                                />
                            </div>
                        </div>
                        : i18n.language === 'en'
                            ? <div>
                                <div className="w-full bg-white mb-4">
                                    <InputField
                                        type='text'
                                        name='punkt_en'
                                        label={t('punkt')}
                                        value={item.punkt_en ? item.punkt_en : ''}
                                        onChange={(e) => setItem({ ...item, punkt_en: e.target.value })}
                                        required={true}
                                    />
                                </div>
                            </div>
                            : null}
            </form >
            <div className="w-full bg-white mb-4">
                <DetailsTable
                    details={details}
                    fields={fields}
                    handleAddDetail={handleAddDetail}
                    handleRemoveDetail={handleRemoveDetail}
                    showError={detailError}
                    openDetail={openDetail}
                    setOpenDetail={setOpenDetail}
                />
            </div>
            <div className="w-full bg-white mb-4">
                <PhotosTable
                    photos={photos}
                    handleAddPhoto={handleAddPhoto}
                    handleRemovePhoto={handleRemovePhoto}
                    showError={photoError}
                />
            </div>
            {loading ? <Loading /> : null}
        </div >
    )
}

export default ItemForm;