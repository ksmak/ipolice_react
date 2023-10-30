import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <Link to="/">
                <img
                    className="h-16 w-48 object-cover object-center"
                    src="/logo.png"
                    alt="crime info"
                />
            </Link>
        </div>
    )
}

export default Logo;