import { Container, Content, PaymentCard } from "./styles.js";


import { ThemeProvider } from 'styled-components';
import { ThemeSlider} from "../../components/ThemeSlider";
import { useDarkMode } from '../../styles/modeDarkTheme';
import GlobalStyles from '../../styles/global'
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/theme';

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { OrderCard } from "../../components/Order";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PageError } from "../../components/ErrorPag";

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useCard } from '../../hooks/card';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { CiReceipt } from "react-icons/ci";
import logoPix from '../../assets/img/pix.svg';
import cardImg from '../../assets/img/CreditCard.svg';
import qrCode from '../../assets/img/qrcode.svg';
import clock from '../../assets/img/clock.svg';
import check from '../../assets/img/check.svg';

export function Card() {
    const [ theme, toggleTheme ] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;

    const { user } = useAuth()

    const { Card, total, handleResetCard} = useCard();

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    function handleCreatedCard(Card) {
        return {
          orderStatus: '🔴 Pendente',
          paymentMethod: pixActive ? 'pix': 'creditCard',
          totalPrice: total,
          Card: Card.map(item => (
            {
              id: item.id,
              title: item.title,
              quantity: item.quantity
            }
          ))
        }
    }

    async function handleFinishPayment(Card) {
            
        const newCard = handleCreatedCard(Card)

        if (Card.length < 1) {
            navigate(-1);
            return alert("Eita! Seu pedido está vazio, para efeturar comprar adicione seu pedido.");
        }

        if (!pixActive && num.length < 16) {
            alert("Digite o numero do cartão");
            return;
        }

        if (!pixActive && date.length < 4) {
            return alert("Digite a validade do cartão");
        }

        if (!pixActive && cvc.length < 3) {
            return alert("Digite o CVC do cartão");
        }

        setLoading(true);

        await api.post("/orders", newCard)
            .then(() => {
                disableButton();
                setTimeout(() => {    

                    alert("Pedido realizado com sucesso!");
                    navigate(-1);
                    handleResetCard();

                }, 7000);
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Não foi fazer seu pedido");
                }
            });

        setLoading(false);
    }

    const [num, setNum] = useState('');
    const [cvc, setCvc] = useState('');

    const handleNumChange = event => {
        const limit = 16;
        setNum(event.target.value.slice(0, limit));
    };

    const handleCvcChange = event => {
        const limit = 3;
        setCvc(event.target.value.slice(0, limit));
    };

    const [isPixVisible, setIsPixVisible] = useState(false);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(true);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);

    const handlePaymentPix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setIsCardVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };

    const handlePaymentCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setIsCardVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };

    const [disabledButton, setDisabledButton] = useState(false);

    const disableButton = () => {
        setDisabledButton(true);

        setIsCreditVisible(false);
        setIsPixVisible(false);
        
        setIsClockActive(true);
        setIsApprovedActive(false);
        setTimeout(() => {    

            setIsClockActive(false);
            setIsApprovedActive(true);

        }, 4000);
    }
    
    return(
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
                <Container>
                    <Header />

                        {
                            user.isAdmin ?

                            <PageError />

                        :

                            <Content>

                                <ThemeSlider theme={theme} toggleTheme={toggleTheme}/>

                                <div className="card-wrapper">
                                
                                    <div className="order-wrapper">
                                        <h2>Meu pedido</h2>
                                        <div className="details">
                                            {
                                                Card && 
                                                    Card.map(item => (
                                                        <OrderCard key={String(item.id)} data={item} />
                                                    ))
                                            }
                                        </div>

                                        <div className="total">
                                            <p>Total: R$<span>{total}</span></p>
                                        </div>
                                    </div>
                                
                                    <PaymentCard>
                                        <div className="paymentHeader">
                                            <h2>Pagamento</h2>
                                        
                                            <div className="buttons">
                                                <button className={pixActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentPix}>
                                                    <img src={logoPix} alt="Logo Pix"/>
                                                    PIX
                                                </button>
                                                
                                                <button className={creditActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentCredit}>
                                                    <img src={cardImg} alt="Logo Cartão de Crédito"/>
                                                    Crédito
                                                </button>
                                            </div>
                                        </div>

                                        <div className="paymentBody">
                                            
                                            {isPixVisible &&
                                                <div className={pixActive === false ? 'active' : ''} id="paymentPix">
                                                    <div className="qr">
                                                        <img src={qrCode} alt="Imagem do QRCode" />
                                                    </div>

                                                    <Button
                                                        title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                                        disabled={loading}
                                                        icon={CiReceipt}
                                                        style={ { height: 56 } }
                                                        className="finishPaymentButton"
                                                        onClick={()=>{handleFinishPayment(Card)}}
                                                    /> 
                                                </div>
                                            }

                                            {isCreditVisible &&
                                                <div className="paymentCredit" id="paymentCredit">

                                                    <div className="inputs">
                                                        <p>Número do Cartão</p>
                                                        <Input
                                                            placeholder="0000 0000 0000 0000"
                                                            type="number"
                                                            id="num"
                                                            name="num"
                                                            value={num}
                                                            onChange={handleNumChange}
                                                        />
                                                    </div>

                                                    <div className="validTo">
                                                        <div>
                                                            <p>Validade</p>
                                                            <Input
                                                                placeholder="04/25"
                                                                type="text"
                                                                maxLength="5"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p>CVC</p>
                                                            <Input
                                                                placeholder="***"
                                                                type="number"
                                                                id="cvc"
                                                                name="cvc"
                                                                value={cvc}
                                                                onChange={handleCvcChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <Button
                                                            title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                                            disabled={loading}
                                                            icon={CiReceipt}
                                                            style={ { height: 56 } }
                                                            className="finishPaymentButton"
                                                            onClick={()=>{handleFinishPayment(Card)}}
                                                    /> 
                                                </div>
                                            }

                                            {isClockActive &&

                                                <div className="clock" id="clock">
                                                    <img src={clock} alt="Imagem do QRCode" />
                                                    <p>Aguardando pagamento no caixa</p>
                                                </div>
                                            }

                                            {isApprovedActive &&

                                                <div className="approved" id="approved">
                                                    <img src={check} alt="Imagem de pagamento aprovado" />
                                                    <p>Pagamento aprovado!</p>
                                                </div>
                                            }
                                        </div>
                                    </PaymentCard>
                                </div>
                            </Content>
                        }
                    <Footer />
                </Container>
    </ThemeProvider>
  );
}