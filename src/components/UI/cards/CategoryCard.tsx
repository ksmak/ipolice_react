import { Link } from "react-router-dom";
import { Category } from "../../../types/types";
import { useTranslation } from "react-i18next";

interface CategoryProps {
    category: Category
}

const CategoryCard = ({ category }: CategoryProps) => {
    const { i18n } = useTranslation();

    let title = category[`title_${i18n.language}` as keyof typeof category] as string;

    return (
        <Link
            className="w-28 text-center m-3"
            to={`/search?category=${category.id}`}
        >
            <img
                className="h-28 w-28 rounded-full object-contain object-center border-4 border-teal-600 p-3 bg-white"
                src={category.photo ? category.photo : undefined}
                alt={title ? title : undefined}
            />
            <p className="mt-3 text-white bg-teal-700 h-14">
                {title}
            </p>
        </Link>
    )
}

export default CategoryCard;