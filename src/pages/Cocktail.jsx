import { Link, Navigate, useLoaderData } from "react-router-dom"
import axios from "axios"
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return ({
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data
    }
  })
}

export const loader = (queryClient) => async ({ params }) => { /*Destructure params from loader request return*/
  const { id } = params;
  await queryClient.ensureQueryData(singleCocktailQuery(id));
  return { id }
}

const Cocktail = () => {
  const { id } = useLoaderData();
  // if(!data) return <h2>Something went wrong...</h2> First Handlig option if there is no cocktail data to display
  const {data} = useQuery(singleCocktailQuery(id));
  if (!data) return <Navigate to='/' /> /*If there is no data to display just back to home*/
  const singleDrink = data.drinks[0];
  // console.log(singleDrink);

  const { strAlcoholic: info, strDrink: name, strDrinkThumb: image, strGlass: glass, strInstructions: instructions, strCategory: category } = singleDrink;

  const validIngredients = Object.keys(singleDrink).filter((key) => key.startsWith('strIngredient') && singleDrink[key] !== null).map((key) => singleDrink[key]);
  // console.log(validIngredients);

  return (
    <Wrapper>
      <header>
        <Link to='/' className="btn">Back to home</Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p><span className="drink-data">name:</span>{name}</p>
          <p><span className="drink-data">category:</span>{category}</p>
          <p><span className="drink-data">info:</span>{info}</p>
          <p><span className="drink-data">glass:</span>{glass}</p>
          <p><span className="drink-data">ingredients:</span>{validIngredients ? validIngredients.map((ingredient, index) => {
            return <span key={index} className="ing">
              {ingredient}{index < validIngredients.length - 1 ? ',' : ''}
            </span>
          }) : <span>Not found ingredients</span>}</p>
          <p><span className="drink-data">instructions:</span>{instructions}</p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Cocktail