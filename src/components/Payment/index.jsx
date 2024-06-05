import { Container, Content } from "./styles";
import { useState } from 'react';

import { Input } from "../Input";
import { Button } from "../Button";

import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/img/pix.svg';
import cardImg from '../../assets/CreditCard.svg';
import qrCode from '../../assets/img/qrcode.svg';
import clock from '../../assets/img/clock.svg';
import check from '../../assets/img/check.svg';
import knife from '../../assets/img/forkKnife.svg';

import { useCart } from '../../hooks/cart';
import { useAuth } from "../../hooks/auth";

export function PaymentCard() { 
    const { handleResetCart} = useCart();
    const { user } = useAuth()

    // Cartão de crédito
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

    // Botões
    const [isPixVisible, setIsPixVisible] = useState(false);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);

    const handlePix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };
    
    const handleCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };

    const [disabledButton, setDisabledButton] = useState(false);
    const btn = document.getElementById('finishPaymentButton');
    const disableButton = () => {
        setDisabledButton(true);

        setIsCreditVisible(false);
        setIsPixVisible(false);
        
        setIsClockActive(true);
        setIsApprovedActive(false);
        setTimeout(() => {    
            // 👇️ Elementos que vão ser alterados
            setIsClockActive(false);
            setIsApprovedActive(true);
    
            // 👇️ Delay para a alteração
        }, 5000);
    }

    return(
        <Container>

            <div className="buttons">
            
                <button className={pixActive === true ? 'active' : ''} id="pix" disabled={disabledButton} onClick={handlePix}><img src={logoPix} alt="Logo Pix"/>PIX</button>
                
                <button className={creditActive === true ? 'active' : ''} id="credit" disabled={disabledButton} onClick={handleCredit}><img src={cardImg} alt="Logo Cartão de Crédito" />Crédito</button>

            </div>
            
            <Content>

                {isPixVisible &&
                    <div className="paymentPix" id="paymentPix">
                        <div className="qr">
                            <img src={qrCode} alt="Imagem do QRCode" />
                        </div>

                        <Button
                            title='Finalizar pagamento'
                            id="finishPaymentButton"
                            icon={BsReceipt}
                            style={ { height: 56 } }
                            className="finishPaymentButton"
                            onClick={()=>{disableButton(); handleResetCart(user.id)}}
                        /> 
                    </div>
                }

                {isCreditVisible &&
                    <div className="paymentCredit" id="paymentCredit">

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                            <p className="heading_8264">Gold Plated</p>
                            <svg
                                className="logo"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="36"
                                height="36"
                                viewBox="0 0 48 48"
                            >
                                <path
                                fill="#e0e0e0"
                                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                                ></path>
                                <path
                                fill="#c0c0c0"
                                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                                ></path>
                                <path
                                fill="#d0d0d0"
                                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                                ></path>
                            </svg>
                            <svg
                                version="1.1"
                                className="chip"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="30px"
                                height="30px"
                                viewBox="0 0 50 50"
                                xml:space="preserve"
                            >
                                <image
                                id="image0"
                                width="50"
                                height="50"
                                x="0"
                                y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
                                    fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
                                    ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
                                    e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
                                    ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
                                    u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
                                    fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
                                    lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
                                    tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
                                    g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
                                    /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
                                    orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
                                    GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
                                    OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
                                    I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
                                    lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
                                    JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
                                    qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
                                    1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
                                    BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
                                    amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
                                    S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
                                    cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                                    MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
                                    LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                                ></image>
                            </svg>
                            <p className="name">CREDIT CARD</p>
                            </div>
                            <div className="flip-card-back">
                            <div className="strip"></div>
                            <svg
                                version="1.1"
                                className="contactless"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="50px"
                                viewBox="0 0 50 50"
                                xml:space="preserve"
                            >
                                <image
                                id="image0"
                                width="30"
                                height="30"
                                x="0"
                                y="20"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                            cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
                            lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
                            fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
                            GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
                            VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
                            HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
                            bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
                            DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
                            qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
                            sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
                            Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
                            XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
                            cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
                            nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
                            xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
                            MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
                            OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
                            MDowMIXeN6gAAAAASUVORK5CYII="
                                ></image>
                            </svg>
                            <div className="number">
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
                                    <p className="exp">EXP</p>
                                    <Input
                                        className="date_8264"
                                        placeholder="04/25"
                                        type="text"
                                        maxLength="5"
                                    />
                                </div>

                                <div>
                                    <p className="cvc">CVC</p>
                                    <Input
                                        className="cvc_number"
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
                        </div>
                    </div>

                        <Button
                                title='Finalizar pagamento'
                                icon={BsReceipt}
                                style={ { height: 56 } }
                                className="finishPaymentButton"
                                onClick={disableButton}
                        /> 
                    </div>
                }

                {isClockActive &&
                    <div className="clock" id="clock">
                        <div className="clk">
                            <img src={clock} alt="Imagem do relógio" />
                        </div>
                        <p>Aguardando pagamento no caixa</p>
                    </div>
                }

                {isApprovedActive &&
                    <div className="approved" id="approved">
                        <img src={check} alt="Imagem de check" />
                        <p>Pagamento aprovado!</p>
                    </div>
                }

                <div className="delivered hide" id="delivered">
                    <img src={knife} alt="Imagem de um garfo e uma faca" />
                    <p>Pedido entregue!</p>
                </div>
            
            </Content>

        </Container>
    )
}