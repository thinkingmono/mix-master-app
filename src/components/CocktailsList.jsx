import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailsList = ({drinks}) => {
    if(!drinks){
        return <h2>There are no drinks to display</h2>
    }
    const formattedCocktails = drinks.map((drink) => {
        const {idDrink, strAlcoholic, strDrink, strDrinkThumb, strGlass} = drink;
        return {id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass}
    })
    return (
        <Wrapper>
            {formattedCocktails.map((cocktail) => {
                return <CocktailCard key={cocktail.id} {...cocktail} />
            })}
        </Wrapper>
    )
}

export default CocktailsList