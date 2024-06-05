import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 53.0rem;

    > .buttons {
        display: flex;
        height: 8.1rem;
    } 

    > .buttons button {
        width: 100%;
        background-color: transparent;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
        border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
        border-bottom: none;
        font-size: 1.6rem;
        line-height: 2.4rem;
    }

    .buttons button.active {
        top: 2px;
        left: 1px;
        box-shadow: none;
        background-color: ${({ theme }) => theme.COLORS.GRAY_400};
    } 

    > .buttons img {
        margin-right: 1.4rem;
        vertical-align: middle;
    }

    > .buttons button:first-child {
        border-radius: 0.8rem 0 0;
    }

    > .buttons button:last-child {
        border-radius: 0 0.8rem 0 0;
    }
`;

export const Content = styled.div`
    /* ==== Configs gerais do Card ==== */
    width: 100%;
    max-width: 53.0rem;
    max-height: 48rem;
    font-family: 'Roboto', sans-serif;

    padding: 5.9rem clamp(3rem, 3rem + 5.5vw, 9.1rem) 4.8rem;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    border-radius: 0 0 0.8rem 0.8rem;
    
    /* ==== Tela do Cartão de Crédito ==== */
    .validTo {
        display: flex;
        gap: 1.7rem;
        margin: 3.7rem 0 3.7rem;
    }

    .paymentCredit p {
        margin-bottom: 0.8rem;
    }

    /* ==== Tela do QR Code ==== */
    .paymentPix {
        text-align: center;
    }

    .qr {
        margin: 0 4rem;
    }

    .paymentPix img {
        width: 100%;
        max-width: 27rem;
        margin-bottom: 2rem;
    }

    /* ==== Tela Pós Pagamento ==== */
    .clock,
    .approved,
    .delivered,
    .cart {
        width: 100%;
        text-align: center;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    .clock p,
    .approved p,
    .delivered p,
    .cart p {
        font-size: 2.4rem;
        margin-top: 3rem;
    }

    /* ==== HIDE ==== */
    .hide {
        display: none;
    }

    .flip-card {
        background-color: transparent;
        width: 240px;
        height: 154px;
        perspective: 1000px;
        color: white;
    }

        .heading_8264 {
        position: absolute;
        font-size: 1em;
        top: 0.75em;
        left: 1em;
        font-weight: 600;
        text-shadow: -0.2px -0.2px 0.2px white, 0.2px -0.2px 0.2px gray,
            -0.2px 0.2px 0.2px white, 0.2px 0.2px 0.2px gray;
    }

        .logo {
        position: absolute;
        top: 6.8em;
        left: 11.7em;
    }

        .chip {
        position: absolute;
        top: 2.3em;
        left: 1.5em;
    }

        .contactless {
        position: absolute;
        top: 3.5em;
        left: 12.4em;
    }

        .number {
        position: absolute;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 0.75em;
        top: 7em;
        left: 1.5em;
    }

        .date_8264 {
        position: absolute;
        font-weight: 600;
        font-size: 0.75em;
        top: 9em;
        left: 1.5em;
        letter-spacing: 2px;
    }

        .cvc_number {
        position: absolute;
        font-weight: 600;
        font-size: 0.75em;
        top: 9em;
        left: 8.5em;
        letter-spacing: 2px;
    }

        .cvc {
        position: absolute;
        font-weight: 600;
        font-size: 5px;
        top: 6.9rem;
        left: 8rem;
    }

        .exp {
        position: absolute;
        font-weight: 600;
        font-size: 5px;
        top: 6.9rem;
        left: 3.8rem;
    }

        .name {
        position: absolute;
        font-weight: 400;
        font-size: 8.5px;
        top: 15em;
        left: 2em;
        color: #bea35c;
    }

        .strip {
        position: absolute;
        background-color: white;
        width: 15em;
        height: 2.25em;
        top: 0;
        border-radius: 1rem 1rem 0 0;
    }

        .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

        .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
    }

        .flip-card-front,
        .flip-card-back {
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 1rem;
    }

        .flip-card-front {
        background: linear-gradient(135deg, #edcb78, #f7e4b2, #fee08b);
        border: 1px solid white;
    }

        .flip-card-back {
        background: linear-gradient(135deg, #fee08b, #f7e4b2, #edcb78);
        transform: rotateY(180deg);
    }

`;
