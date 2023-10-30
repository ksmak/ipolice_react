import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Button, Card, CardBody, CardFooter, Collapse, Input } from "@material-tailwind/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../../api/supabase";
import { Detail, Field, Item } from "../../../types/types";
import LanguagePanel from "../panels/LanguagePanel";
import ItemsPanel from "../panels/ItemsPanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import Loading from "../elements/Loading";
import InputField from "../elements/InputField";
import SelectField from "../elements/SelectField";
import { MetaDataContext } from "../../../App";

type FilterType = {
    searchText?: string | undefined,
    category?: string | undefined,
    region?: string | undefined,
    district?: string | undefined,
    punkt?: string | undefined,
    date_of_action?: string | undefined,
    time_of_action?: string | undefined,
    details?: Detail[] | undefined,
}

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const { categories, regions, districts } = useContext(MetaDataContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [findItems, setFindItems] = useState<Item[]>([]);
    const [filter, setFilter] = useState<FilterType>({
        searchText: searchParams.get('text'),
        category: searchParams.get('category')
    } as FilterType);
    const [loading, setLoading] = useState(false);
    const [openFilter, SetOpenFilter] = useState(false);
    const [fields, setFields] = useState<Field[]>();
    const [count, setCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const getCount = () => {
        let count = 0;
        if (filter.region) count++;
        if (filter.district) count++;
        if (filter.punkt) count++;
        if (filter.date_of_action) count++;
        if (filter.time_of_action) count++;
        if (filter.details) count += filter.details.length;
        setCount(count);
    }

    const handleSearchItems = async () => {
        setLoading(true);
        let query = supabase
            .from('item')
            .select();
        if (filter.searchText) {
            query = query.or(`title_kk.like.%${filter.searchText}%, title_ru.like.%${filter.searchText}%, title_en.like.%${filter.searchText}%, text_kk.like.%${filter.searchText}%, text_ru.like.%${filter.searchText}%, text_en.like.%${filter.searchText}%`);
        }
        if (filter.category) {
            query = query.eq('category_id', filter.category);
        }
        if (filter.region) {
            query = query.eq('region_id', filter.region);
        }
        if (filter.district) {
            query = query.eq('district_id', filter.district);
        }
        if (filter.punkt) {
            query = query.like('punkt', `%${filter.punkt}%`);
        }
        if (filter.date_of_action) {
            query = query.eq('date_of_action', filter.date_of_action);
        }
        if (filter.time_of_action) {
            query = query.eq('time_of_action', filter.time_of_action);
        }
        if (filter.details) {
            filter.details.forEach((detail) => {
                query = query.like(detail.field_name, `%${detail.value}%`);
            })
        }
        const { data, error } = await query;
        if (error) {
            setErrorMessage(error.message);
            setShowError(true);
            setLoading(false);
            return;
        }
        if (data) {
            const prunedData = data as Item[];
            setFindItems(prunedData);
        }
        setLoading(false);
    }

    const handleClean = () => {
        setFilter({ searchText: filter.searchText });
    }

    const handleChangeCategory = (value: string) => {
        setFilter({ ...filter, category: value, details: undefined });
        const category = categories?.find(category => category.id === +value);
        setFields(category?.fields);
    }

    useEffect(() => {
        getCount();
        // eslint-disable-next-line
    }, [filter]);

    useEffect(() => {
        handleSearchItems();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="h-fit bg-blue-gray-50 grid p-4 gap-4 mb-8">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            <div className="">
                <Alert className="bg-red-500 mb-4" open={showError} onClose={() => setShowError(false)}>{errorMessage}</Alert>
                <div className="flex flex-row justify-end items-center pb-5">
                    <Button
                        variant="outlined"
                        color="teal"
                        size="sm"
                        onClick={() => navigate(-1)}
                    >
                        {t('back')}
                    </Button>
                </div>
                <div className="w-full bg-white mb-4 flex flex-row gap-4">
                    <Input
                        placeholder={t('search')}
                        icon={<BsSearch />}
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        crossOrigin=""
                        value={filter.searchText ? filter.searchText : ''}
                        onChange={(e) => setFilter({ ...filter, searchText: e.target.value })}
                    />
                    <Button className="bg-teal-600" onClick={() => handleSearchItems()}>{t('searchButton')}</Button>
                </div>
                <div className="w-full mb-4">
                    <SelectField
                        name='category_id'
                        label={t('category')}
                        value={filter.category ? filter.category : ''}
                        onChange={(e) => handleChangeCategory(e.target.value)}
                        dict={categories}
                        required={true}
                    />
                </div>
                <div className="flex flex-row justify-end">
                    <Badge content={count} invisible={count === 0}>
                        <Button variant="outlined" className="flex items-center gap-3" onClick={() => SetOpenFilter(!openFilter)}>
                            {t('filter')}
                            <BsFilter />
                        </Button>
                    </Badge>
                </div>
                <Collapse open={openFilter}>
                    <Card className="bg-blue-gray-50 my-4">
                        <CardBody>
                            <div className="w-44 mb-4">
                                <InputField
                                    type='date'
                                    name='date_of_action'
                                    label={t('date')}
                                    value={filter.date_of_action ? filter.date_of_action : ''}
                                    onChange={(e) => setFilter({ ...filter, date_of_action: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="w-44 mb-4">
                                <InputField
                                    type='time'
                                    name='time_of_action'
                                    label={t('time')}
                                    value={filter.time_of_action ? filter.time_of_action : ''}
                                    onChange={(e) => setFilter({ ...filter, time_of_action: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="w-full mb-4">
                                <SelectField
                                    name='region_id'
                                    label={t('region')}
                                    value={filter.region ? filter.region : ''}
                                    dict={regions}
                                    onChange={(e) => setFilter({ ...filter, region: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="w-full mb-4">
                                <SelectField
                                    name='district_id'
                                    label={t('district')}
                                    value={filter.district ? filter.district : ''}
                                    dict={districts}
                                    onChange={(e) => setFilter({ ...filter, district: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="w-full mb-4">
                                <InputField
                                    type='text'
                                    name='punkt'
                                    label={t('punkt')}
                                    value={filter.punkt ? filter.punkt : ''}
                                    onChange={(e) => setFilter({ ...filter, punkt: e.target.value })}
                                    required={true}
                                />
                            </div>
                            {fields
                                ? fields.map((field, index) => {
                                    let val = '';
                                    if (field.field_name) {
                                        const detail = filter.details?.find(det => det.field_name === field.field_name);
                                        if (detail) {
                                            val = detail.value;
                                        }
                                    }
                                    const handleChangeDetail = (val: string) => {
                                        if (field.field_name && val && val !== '') {
                                            let newDetail: Detail = {
                                                field_name: field.field_name,
                                                value: val
                                            }
                                            let details = filter.details ? filter.details : [];
                                            const index = details.findIndex(det => det.field_name === field.field_name);
                                            if (index >= 0) {
                                                details.splice(index, 1, newDetail);
                                            } else {
                                                details.push(newDetail);
                                            }
                                            setFilter({ ...filter, details: details });
                                        }
                                    }
                                    return (
                                        <div className="w-full mb-4" key={field.field_name}>
                                            <InputField
                                                type='text'
                                                name={field.field_name ? field.field_name : `field_${index + 1}`}
                                                label={String(field[`title_${i18n.language}` as keyof typeof field])}
                                                value={val}
                                                onChange={(e) => handleChangeDetail(e.target.value)}
                                                required={false}
                                            />
                                        </div>
                                    )
                                })
                                : null}
                        </CardBody>
                        <CardFooter className="pt-0 text-end">
                            <Button variant="outlined" size="sm" className="text-red-600 border-red-600 mr-4" onClick={() => handleClean()}>{t('clean')}</Button>
                            <Button variant="outlined" size="sm" className="text-teal-600 border-teal-600" onClick={() => SetOpenFilter(!openFilter)}>{t('close')}</Button>
                        </CardFooter>
                    </Card>
                </Collapse>
            </div>
            {findItems.length && findItems.length > 0
                ? <div>
                    <div className="text-teal-700 uppercase font-bold">
                        {`${t('find')}: ${findItems.length}`}
                    </div>
                    <ItemsPanel
                        items={findItems}
                        regions={regions}
                        districts={districts}
                    />
                </div>
                : filter ? <p className="text-teal-700">{t('nothingResult')}</p> : ''}
            {loading ? <Loading /> : null}
        </div>
    )
}

export default SearchPage;