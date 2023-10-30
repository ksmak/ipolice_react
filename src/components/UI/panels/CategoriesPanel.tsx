import { useTranslation } from "react-i18next";
import { Category } from "../../../types/types";
import CategoryCard from "../cards/CategoryCard";
import { Link } from "react-router-dom";

interface CategoriesPanelProps {
    categories: Category[] | undefined,
}

const CategoriesPanel = ({ categories }: CategoriesPanelProps) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-md self-center justify-self-end">
            <div className="flex flex-row justify-between">
                <p className="uppercase text-sm text-white bg-teal-800 p-2 font-bold">
                    {t('categories')}
                </p>
                <p className="text-sm text-white bg-teal-800 p-2 lowercase font-bold">
                    <Link to="/categories">{t('seeAll')}</Link>
                </p>
            </div>
            <div className="overflow-x-scroll w-full content-center">
                <div className="flex flex-row w-fit">
                    {categories
                        ? categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                            />
                        ))
                        : null}
                </div>
            </div>
        </div>
    )
}

export default CategoriesPanel;