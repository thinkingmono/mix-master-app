import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar"

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const exampleValue = 'outlet context works';
  return (
    <div>
      <Navbar />
      <section className="page">
        {isLoading ?
          <div className="loading"></div> :
          <Outlet context={{exampleValue}}/> /*Must component to render all nested routes when need to render shared content like a nav or footer all across nested pages*/}
      </section>
    </div>
  )
}

export default HomeLayout