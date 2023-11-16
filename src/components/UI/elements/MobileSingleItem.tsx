import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

type ModileSingleItemProps = {
    link: string,
    title: string,
}

export default function ModileSingleItem({ link, title }: ModileSingleItemProps) {
    return (
        <Typography
            as="li"
            className="p-1 text-sm font-normal hover:underline text-primary-500"
        >
            <Link to={link} className="flex items-center">
                {title}
            </Link>
        </Typography>
    )
}