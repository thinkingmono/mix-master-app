import Wrapper from "../assets/wrappers/ErrorPage"
import { Link, useRouteError } from "react-router-dom"
import img from '../assets/not-found.svg'

const Error = () => {
  const error = useRouteError()
  console.log(error);
  if (error.status === 404) {
    return <Wrapper>
      <div>
        <img src={img} alt='Not Found' />
        <h3>Oh!</h3>
        <p>Seem that we can't find the page you are looking for</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  )
}

export default Error