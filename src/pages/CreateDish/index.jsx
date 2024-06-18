import { Container, Content, Form } from "./styles.js";

import { ThemeProvider } from 'styled-components';
import { ThemeSlider} from "../../components/ThemeSlider/index.jsx";
import { useDarkMode } from '../../styles/modeDarkTheme.js';
import GlobalStyles from '../../styles/global.js'
import lightTheme from '../../styles/lightTheme.js';
import darkTheme from '../../styles/theme.js';

import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { Input } from "../../components/Input/index.jsx";
import { Ingredients } from "../../components/Ingredients/index.jsx";
import { Textarea } from "../../components/Textarea/index.jsx";
import { PageError } from "../../components/ErrorPag/index.jsx";

import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PiArrowLeftLight } from "react-icons/pi";
import { VscCloudUpload } from "react-icons/vsc";

export function CreateDish( ) {
    const [ theme, toggleTheme ] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;
    
    const { user } = useAuth()
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const [ingredients, setIngredients] = useState([]);
    const [addIngredient, setAddIngredient] = useState("");

    function handleAddIngredient() {
        if (addIngredient.length < 3) {
            return alert("Erro: Você está tentando inserir um nome de ingrediente inválido!");
        } else {
            setIngredients(prevState => [...prevState, addIngredient]);
            setAddIngredient("");
        }
    }

    function handleRemoveIngredient(deleted){
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);


    async function handleNewDish() {
        if (!image) {
            return alert("Atenção, é necessário inserir a imagem do prato.");
        }
        
        if (!title) {
            return alert("Atenção, é necessário inserir o nome do prato.");
        }

        if (ingredients.length < 1) {
            return alert("É necessário adicionar ao menos um ingrediente!")
        }

        if (addIngredient) {
            return alert("Erro: Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique no sinal de + para adicionar!");
        }

        if (!category) {
            return alert("Atenção, é necessário selecionar a categoria do prato.");
        }

        if (!price) {
            return alert("Atenção, é necessário inserir o preço do prato.");
        }

        if (!description) {
            return alert("Atenção, é necessário colocar a descrição do prato.");
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))

        await api
            .post("/dishes", formData)
            .then(alert("Prato criado com sucesso!"), navigate("/"))
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Falha ao criar o prato!");
                }
            });  

        setLoading(false);
    }
      
    return(
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
                <Container>
                    <Header />
                        {
                            user.isAdmin ?
                                <Content>
                                <ThemeSlider theme={theme} toggleTheme={toggleTheme}/>
                                <Form>
                                    <header>
                                        <Link to="/">
                                            <ButtonText title="Voltar" icon={PiArrowLeftLight}/>
                                        </Link>
                                        <h1>Adicionar prato</h1>
                                    </header>

                                    <div className="details">
                                        <div className="dishImage">
                                            <p>Imagem do Prato</p>
                                            <label htmlFor="image">
                                                <VscCloudUpload size={24}/> 
                                                Selecione imagem 
                                            </label>
                                            <Input type="file" id="image" name="image" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                                        </div>
                                        
                                        <div className="dish">
                                            <p>Nome</p>
                                            <Input placeholder="Ex.: Salada Ceasar" type="text" onChange={e => setTitle(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="ingredientsTag">
                                        <div>
                                            <p>Ingredientes</p>
                                            <div className="ingredients">
                                                {
                                                    ingredients.map((ingredient, index) => (
                                                        <Ingredients key={String(index)} value={ingredient} onClick={() => handleRemoveIngredient(ingredient) } />
                                                    ))
                                                }

                                                <Ingredients isNew placeholder="Adicionar" onChange={e => setAddIngredient(e.target.value)} value={addIngredient} onClick={handleAddIngredient} />
                                            </div>
                                        </div>

                                        <div className="dishCategory">
                                            <p>Categoria</p>

                                            <select defaultValue={'default'} onChange={e => setCategory(e.target.value)}>
                                                <option value="default" disabled>Refeição</option>
                                                <option value="dishes">Pratos</option>
                                                <option value="drinks">Bebidas</option>
                                                <option value="dessert">Sobremesas</option>
                                            </select> 
                                        </div>

                                        <div className="price">
                                            <p>Preço</p>
                                            <Input placeholder="R$ 00,00" type="number" onChange={e => setPrice(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="textarea">
                                        <p>Descrição</p>
                                        <Textarea placeholder="Fale brevemente sobre o prato, seus ingredientes e composição" onChange={e => setDescription(e.target.value)} />
                                    </div>
                                </Form>

                                <div className="button">
                                    <Button title={loading ? "Salvando alterações" : "Salvar alterações"} onClick={handleNewDish} disabled={loading} />
                                </div>
                                </Content>

                            :

                                <PageError />
                        }
                    
                        <Footer />
                </Container>
        </ThemeProvider>
    );
}