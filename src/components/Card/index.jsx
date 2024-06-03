//import do styles
import { Container, Content, CreditCard } from './styles.js'

//import components
import { Button } from '../Button';
import { ButtonText } from "../ButtonText";

//import dos icons e images
import { Receipt } from 'phosphor-icons';
import { Minus, Plus } from 'phosphor-icons';
import { Heart } from 'phosphor-icons'

//import do hooks e da API
import { useAuth } from "../../hooks/auth";
import { useFavorites } from '../../hooks/favorites';
import { useCart } from '../../hooks/cart';
import { Link } from "react-router-dom";
import { api } from '../../services/api';
import { useState } from "react";


export function Card({ data, ...rest }) {

    const { user } = useAuth()
    
    
    const { favorites, addPratoFavorito, removerPratoFavorito } = useFavorites()
    const isFavorite = favorites.some((dish) => dish.title === data.title)

    const { handleAddDishPay, paymentAccept } = useCart();
    
    const [qtd, setQtd] = useState(1);

    const increase = () => {
        if (qtd > 19) {
            alert("Desculpe, você excedeu a quantidade máxima do pedido.")
            return;
        }
        setQtd(count => count + 1);
    };
     
    const decrease = () => {
        if (qtd < 2) {
            alert("Ops!! Escolha ao menos 1 produto.")
            return;
        }
        setQtd(count => count - 1);
    };

    return (
        <Container {...rest}>
            {
                user.isAdmin ?

                    <Content>
                        <div className="container">
                            <img src={imageURL} alt="Imagem do prato" />
                            <Link to={`/details/${data.id}`}>
                                <h3 className="product-title">{data.title}{' >'}</h3>
                            </Link>
                            <p className="description">{data.description}</p>
                            <h1 className="price">R$ {data.price}</h1>
                            <Link to={`/editDish/${data.id}`}>
                                <Button title="editar prato" icon={Receipt} />
                            </Link>
                        </div>
                    </Content>

                :

                    <Content>
                        <button className="favButton" onClick={() => isFavorite ? removerPratoFavorito(data) : addPratoFavorito(data)}>
                            {isFavorite ?
                                <Heart size={32} weight="fill" />
                            :
                                <Heart />
                            }
                        </button>

                        <div className="container">
                            <img src={imageURL} alt="Imagem do prato" />
                            <Link to={`/details/${data.id}`}>
                                <h3 className="product-title">{data.title}{' >'} </h3>
                            </Link>
                            <p className="description">{data.description}</p>
                            <h1 className="price">R$ {data.price}</h1>

                            <CreditCard>
                                <div className="counter">
                                    <ButtonText icon={Minus} onClick={decrease} />
                                    <span>{qtd.toString().padStart(2, '0')}</span>
                                    <ButtonText icon={Plus} onClick={increase} />
                                </div>
                                <Button title="incluir" icon={Receipt} onClick={() => handleAddDishPay(data, qtd, imageURL)} style={ { height: 56, width: 92, padding: '12px 4px' } } />
                            </CreditCard>
                        </div>
                    </Content>
                }
        </Container>
    );
}