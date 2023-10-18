import { RouterProvider, createBrowserRouter } from "react-router-dom"; /*React Router Imports*/
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from './pages/index'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loader as landingLoader } from './pages/Landing' /*Loader import with an alias*/
import { loader as singleCocktailLoader } from './pages/Cocktail' /*Loader import with an alias*/
import { action as newsletterAction } from './pages/Newsletter' /*Action import with an alias*/
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5 /*Time react query will preserve queries*/
    }
  }
});

/*Router and routes creation*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient) /*Asociate loader with landing page. Handle fetch drinks when page loads. Invoke directly to pass queryClient as a parameter an then use it to verify if searchTerm was already query*/
      },
      {
        path: 'cocktail/:id', /*id parameter specification for details button on cocktails*/
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient) /*Asociate loader with cocktail page. Handle fetch drink's info when page loads. Invoke directly to pass queryClient as a parameter an then use it to verify if drink was already query*/
      },
      {
        path: 'Newsletter',
        element: <Newsletter />,
        action: newsletterAction /*Action addition to newletter page to handle submit form with post method*/
      },
      {
        path: 'about',
        element: <About />
      },
    ]
  },
])

const App = () => {
  /*Return QueryClient Provider with Router Provider*/
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};
export default App;
