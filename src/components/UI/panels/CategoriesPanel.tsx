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
        <div className="px-5 self-center shadow-md w-full">
            <div className="flex flex-row justify-center">
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
    )
}

export default CategoriesPanel;