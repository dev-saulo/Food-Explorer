import { Container } from "./styles";

import { AiOutlinePlus } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";

export function IngredientsTag({ isNew, value, onClick, ...rest }) {
    return (
        <Container isNew={isNew}>
            <input type="text" value={value} readOnly={!isNew} {...rest} list="ingredientName" />

            <datalist id="ingredientName">
                <option value="Alface">Alface</option>
                <option value="Aspargo">Aspargo</option>
                <option value="Café">Café</option>
                <option value="Bacon">Bacon</option>
                <option value="Batata">Batata</option>
                <option value="Camarão">Camarão</option>
                <option value="Cebola">Cebola</option>
                <option value="Filé">Filé</option>
                <option value="Maçã">Maçã</option>
                <option value="Manjericão">Manjericão</option>
                <option value="Maracujá">Maracujá</option>
                <option value="Massa">Massa</option>
                <option value="Morango">Morango</option>
                <option value="Pão">Pão</option>
                <option value="Pão Naan">Pão Naan</option>
                <option value="Pepino">Pepino</option>
                <option value="Pêssego">Pêssego</option>
                <option value="Queijo">Queijo</option>
                <option value="Rabanete">Rabanete</option>
                <option value="Tomate">Tomate</option>
            </datalist>

            <button
                type="button"
                onClick={onClick}
                className={isNew ? "button-add" : "button-delete"}
            >
                { isNew ? <AiOutlinePlus /> : <VscClose />}
            </button>
        </Container>
    );
}