import { Container } from "./styles";

import imagePlaceholder from '../../assets/img/image-icon.png';

import bolo from '../../assets/Dishes/bolo_de_damasco.png'
import cafe from '../../assets/Dishes/cafe_expresso.png'
import macarrons from '../../assets/Dishes/macarrons.png'
import peachy from '../../assets/Dishes/peachy_pastrie.png'
import pomo from '../../assets/Dishes/pomo_bourbon.png'
import prugna from '../../assets/Dishes/prugna_pie.png'
import salada from '../../assets/Dishes/salada_molla.png'
import saladaRavello from '../../assets/Dishes/salada_ravanello.png'
import spaguetti from '../../assets/Dishes/spaguetti_gambe.png'
import suco from '../../assets/Dishes/suco_de_maracuja.png'
import dautunno from '../../assets/Dishes/te_dautunno.png'
import torrada from '../../assets/Dishes/torradas_de_parma.png'


export function Ingredients({ ingredient }) {

    function fetchImageIngredient(name) {
        let ingredient = name
        
        let ingredientImage;
        
        if (ingredient == "bolo") {
            return ingredientImage = bolo
        
        } else if (ingredient == "cafe") {
            return ingredientImage = cafe

        } else if (ingredient == "macarrons") {
            return ingredientImage = macarrons
        
        } else if (ingredient == "peachy") {
            return ingredientImage = peachy

        } else if (ingredient == "pomo") {
            return ingredientImage = pomo

        } else if (ingredient == "prugna") {
            return ingredientImage = prugna 
            
        } else if (ingredient == "salada") {
            return ingredientImage = salada  

        } else if (ingredient == "saladaRavello") {
            return ingredientImage = saladaRavello  

        } else if (ingredient == "spaguetti") {
            return ingredientImage = spaguetti

        } else if (ingredient == "suco") {
            return ingredientImage = suco

        } else if (ingredient == "dautunno") {
            return ingredientImage = dautunno

        } else if (ingredient == "torrada") {
            return ingredientImage = torrada
        
        } else {
            return ingredientImage = imagePlaceholder
        }
    }

    let ingredientImage = fetchImageIngredient(ingredient)
    
    return(
        <Container>
            <div className="ingredients">
                <div>
                  <img src={ingredientImage} alt="Imagem do ingrediente" />
                  <p>{ingredient}</p>
                </div>
            </div>
        </Container>
    );
}