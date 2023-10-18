import { useLoaderData } from "react-router-dom"
import axios from "axios"
import CocktailsList from "../components/CocktailsList";
import SearchForm from "../components/SearchForm";
const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
import { useQuery } from "@tanstack/react-query";

/*useQuery function to query drinks every time new searchTerm submits. Enables search terms cache for faster look ups*/
const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`); /*Fetch drinks based on search term to api*/
      return response.data.drinks
    }
  }
}

/*Loader creation to get searTerm from form and verify if term is already cached*/
export const loader = (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url); /*Creates an URL instance with current site's url*/
    // console.log(request, url);
    const searchTerm = url.searchParams.get('search') || ''; /*Capture search input value from url when submit or returns empty string other case*/
    // console.log(searchTerm);
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm)); /*Allows to display queries already cached instantly*/

    return { searchTerm }
  }


const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailsList drinks={drinks} />
    </>
  )
}

export default Landing