import { Container, Content, PaymentCard } from "./styles.js";

import { ThemeProvider } from 'styled-components';
import { ThemeSlider} from "../../components/ThemeSlider";
import { useDarkMode } from '../../styles/modeDarkTheme.js';
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
import { useCart } from '../../hooks/cart';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/img/pix.svg';
import cardImg from '../../assets/img/CreditCard.svg';
import qrCode from '../../assets/img/qrcode.svg';
import cartImg from '../../assets/img/shopping-cart.gif';
import clock from '../../assets/img/clock.svg';
import checkCircle from '../../assets/img/check.svg';

export function Cart() {
    const [ theme, toggleTheme ] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;

    const { user } = useAuth()

    const { cart, total, handleResetCart} = useCart();

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    function handleCreatedCart(cart) {
        return {
          orderStatus: '🔴 Pendente',
          paymentMethod: pixActive ? 'pix': 'creditCard',
          totalPrice: total,
          cart: cart.map(item => (
            {
              id: item.id,
              title: item.title,
              quantity: item.quantity
            }
          ))
        }
    }

    async function handleFinishPayment(cart) {
            
        const newCart = handleCreatedCart(cart)

        if (cart.length < 1) {
            navigate(-1);
            return alert("Oops! Seu carrinho está vazio. Adicione algo antes de tentar pagar.");
        }

        if (!pixActive && num.length < 16) {
            alert("Erro: Número de cartão incompleto!");
            return;
        }

        if (!pixActive && date.length < 4) {
            return alert("Erro: Validade do cartão incompleta!");
        }

        if (!pixActive && cvc.length < 3) {
            return alert("Erro: CVC do cartão incompleto!");
        }

        setLoading(true);

        await api.post("/orders", newCart)
            .then(() => {
                disableButton();
                setTimeout(() => {    
                    alert("Pedido cadastrado com sucesso!");
                    navigate(-1);
                    handleResetCart();

                }, 7000);
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar");
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

    const [isPixVisible, setIsPixVisible] = useState(true);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);

    const handlePaymentPix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };

    const handlePaymentCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
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
                                                cart && 
                                                    cart.map(item => (
                                                        <OrderCard 
                                                            key={String(item.id)} 
                                                            data={item}
                                                        />
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
                                                        icon={BsReceipt}
                                                        style={ { height: 56 } }
                                                        className="finishPaymentButton"
                                                        onClick={()=>{handleFinishPayment(cart)}}
                                                    /> 
                                                </div>
                                            }

                                            {isCreditVisible &&
                                            
                                            <div className="paymentCredit" id="paymentCredit">
                                                <div className="visa-card">
                                                    <div className="logoContainer">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            x="0px"
                                                            y="0px"
                                                            width="23"
                                                            height="23"
                                                            viewBox="0 0 48 48"
                                                            className="svgLogo"
                                                        >
                                                            <path
                                                            fill="#ff9800"
                                                            d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                                                            ></path>
                                                            <path
                                                            fill="#d50000"
                                                            d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                                                            ></path>
                                                            <path
                                                            fill="#ff3d00"
                                                            d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <div className="number-container">
                                                        <label className="input-label" for="cardNumber">Número do Cartão</label>
                                                        <input                                                            
                                                            placeholder="0000 0000 0000 0000"
                                                            className="inputstyle"
                                                            type="number"
                                                            id="num"
                                                            name="num"
                                                            value={num}
                                                            onChange={handleNumChange}
                                                        />
                                                    </div>

                                                    <div className="name-date-cvv-container">
                                                        <div className="name-wrapper">
                                                            <label className="input-label" for="holderName">Nome</label>
                                                            <input
                                                            className="inputstyle"
                                                            id="holderName"
                                                            placeholder="Nome no cartão"
                                                            type="text"
                                                            />
                                                        </div>

                                                        <div className="expiry-wrapper">
                                                            <label className="input-label" for="expiry">Validade</label>
                                                            <input
                                                                className="inputstyle" 
                                                                placeholder="MM/AA"
                                                                type="text"
                                                                id="date"
                                                                name="date"
                                                                maxLength="4"
                                                            />
                                                        </div>
                                                        <div className="cvv-wrapper">
                                                            <label className="input-label" for="cvv">CVC</label>
                                                            <input
                                                                className="inputstyle"
                                                                placeholder="***"
                                                                type="number"
                                                                id="cvc"
                                                                name="cvc"
                                                                value={cvc}
                                                                onChange={handleCvcChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="paymentCreditButton" id="paymentCredit">
                                                    <Button
                                                            title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                                            disabled={loading}
                                                            icon={BsReceipt}
                                                            style={ { height: 56, width: 250 } }
                                                            className="finishPaymentButton"
                                                            onClick={()=>{handleFinishPayment(cart)}}
                                                    />
                                                </div> 
                                            </div>

                                            }

                                            {isClockActive &&

                                                <div className="clock" id="clock">
                                                    <img src={clock} alt="Imagem do QRCode" />
                                                    <p>Aguarde: Estamos processando o seu pagamento</p>
                                                </div>
                                            }

                                            {isApprovedActive &&

                                                <div className="approved" id="approved">
                                                    <img src={checkCircle} alt="Imagem de pagamento aprovado" />
                                                    <p>Oba! Pagamento aprovado! Em breve faremos a entrega!</p>
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