import Error from "../error/Error";
import {useNavigate} from "react-router-dom";

import "./404.scss"

export const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1);
    }

    return(
        <section className="not-found">
            <Error />
            <button className="not-found__button" onClick={handleClick}>Go to back</button>
        </section>
    )
}