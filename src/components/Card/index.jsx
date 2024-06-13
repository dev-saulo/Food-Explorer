import { Container, Content, CreditCard } from './styles.js'

import { Button } from '../Button';
import { ButtonText } from "../ButtonText";

import { CiReceipt } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import imagePlaceholder from '../../assets/img/image-icon.png';

import { useAuth } from "../../hooks/auth";
import { useFavorites } from '../../hooks/favorites';
import { useCard } from '../../hooks/card.jsx';
import { Link } from "react-router-dom";
import { api } from '../../services/api';
import { useState } from "react";


export function Card({ data, ...rest }) {

    const { user } = useAuth()

    const imageURL = data.image ? `${api.defaults.baseURL}/files/${data.image}` : imagePlaceholder;
    
    const { favorites, addPratoFavorito, removerPratoFavorito } = useFavorites()
    const isFavorite = favorites.some((dish) => dish.title === data.title)

    const { handleAddDishPay, paymentAccept } = useCard();
    
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
                                <Button title="editar prato" icon={CiReceipt} />
                            </Link>
                        </div>
                    </Content>

                :

                    <Content>
                        <button className="favButton" onClick={() => isFavorite ? removerPratoFavorito(data) : addPratoFavorito(data)}>
                            {isFavorite ?
                                <CiHeart size={32} weight="fill" />
                            :
                                <CiHeart />
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
                                    <ButtonText icon={AiOutlineMinus} onClick={decrease} />
                                    <span>{qtd.toString().padStart(2, '0')}</span>
                                    <ButtonText icon={AiOutlinePlus} onClick={increase} />
                                </div>
                                <Button title="incluir" icon={CiReceipt} onClick={() => handleAddDishPay(data, qtd, imageURL)} style={ { height: 56, width: 92, padding: '12px 4px' } } />
                            </CreditCard>
                        </div>
                    </Content>
                }
        </Container>
    );
}