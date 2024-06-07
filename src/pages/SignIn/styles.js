import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    max-width: 110.6rem;
    height: 100vh;
    
    margin: auto;
    padding: 14.2rem 4rem;
    
    justify-content: space-between;
    align-items: center;

    animation: fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) both;

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @media (min-width: 999px) {
        flex-direction: row;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    
    max-width: 47.6rem;
    width: 100%;
    height: 54rem;
    
    padding: 6.4rem;
    border-radius: 1rem;

    background-color: ${({ theme }) => theme.COLORS.DARK_GRAY_200};

    > h2 {
        font-family: 'Poppins', sans-serif;
        font-size: 3.2rem;
        font-weight: 500;
        line-height: 6.8rem;
        text-align: center;
        
        margin-bottom: 3.2rem;
    }

    > a {
        margin-top: 3.2rem;
        
        text-align: center;
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    > .inputs {
        margin-bottom: 3.2rem;
    }

    > .inputs p {
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
    }

    @media (max-width: 375px) {    
        padding: 3rem;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.COLORS.BLUE};
    margin-bottom: 4rem;

    h1 {
        font-size: clamp(3rem, 3rem + 1.5vw, 4.248rem);
        white-space: nowrap;
    }
    
    .logo {
        display: flex;
        gap: 1.9rem;
    }

    svg {
        height: 5rem;
        width: 5rem;
    }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  margin-top: 10px;
`;