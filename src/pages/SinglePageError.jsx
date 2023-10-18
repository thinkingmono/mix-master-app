import { useRouteError } from "react-router-dom"

const SinglePageError = () => {
    const error = useRouteError();
    return (
        <h3>There was an error</h3>
    )
}

export default SinglePageError