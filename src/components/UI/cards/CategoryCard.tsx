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
                className="h-28 w-28 rounded-full object-contain object-center border-4 border-blue-gray-400 p-3 bg-white"
                src={category.photo ? category.photo : undefined}
                alt={title ? title : undefined}
            />
            <p className="mt-3 text-white bg-blue-400 h-20 rounded-md border-2 border-white">
                {title}
            </p>
        </Link>
    )
}

export default CategoryCard;