import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

type SingleMenuItemProps = {
    link: string,
    title: string,
}

export default function SingleMenuItem({ link, title }: SingleMenuItemProps) {
    return (
        <Button
            className="flex items-center gap-3 text-sm tracking-normal font-normal normal-case text-primary-500 hover:bg-blue-400 hover:text-white"
            variant="text"
            color="blue"
        >
            <Link to={link} className="flex items-center">
                {title}
            </Link>
        </Button>
    )
}