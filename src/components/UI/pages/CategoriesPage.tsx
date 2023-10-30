import { useContext, useEffect, useState } from "react";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { MetaDataContext } from "../../../App";
import Loading from "../elements/Loading";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@material-tailwind/react";
import { CategoryInfo } from "../../../types/types";
import { supabase } from "../../../api/supabase";
import { Link, useNavigate } from "react-router-dom";

const CategoriesPage = () => {
    const { t, i18n } = useTranslation();
    const { categories } = useContext(MetaDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([]);

    const getCategoryInfo = async () => {
        const { data } = await supabase
            .from('category_info')
            .select()
        if (data) {
            setCategoryInfo(data);
        }
    }

    useEffect(() => {
        setLoading(true);
        getCategoryInfo();
        setLoading(false);
    }, [])

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
            <div className="flex flex-row justify-between items-center py-5">
                <Typography
                    className="text-teal-700"
                    variant="h4"
                >
                    {t('categories')}
                </Typography>
                <Button
                    variant="outlined"
                    color="teal"
                    size="sm"
                    onClick={() => navigate(-1)}
                >
                    {t('back')}
                </Button>
            </div>
            {categoryInfo
                ? categories?.map((category) => {
                    let title = category[`title_${i18n.language}` as keyof typeof category] as string;
                    let catInfo = categoryInfo.find(cat => cat.category_id === category.id);
                    if (catInfo) {
                        title = `${title} (${catInfo.count})`
                    }
                    return (
                        <div key={category.id} className="w-full mb-4 bg-blue-gray-50 rounded-md p-3">
                            <Link
                                className="flex flex-row items-center"
                                to={`/search?category=${category.id}`}
                            >
                                <img
                                    className="h-16 w-16 rounded-full object-contain object-center border-2 border-teal-600 p-1 bg-white"
                                    src={category.photo ? category.photo : undefined}
                                    alt={title ? title : undefined}
                                />
                                <Typography variant="lead" className="ml-5 text-teal-700">
                                    {title}
                                </Typography>
                            </Link>
                        </div>
                    )
                })
                : null}
            {loading ? <Loading /> : null}
        </div>
    )
}

export default CategoriesPage;