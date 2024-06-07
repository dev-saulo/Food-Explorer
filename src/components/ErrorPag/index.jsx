import { Container } from './styles'

import { ButtonText } from '../ButtonText'

import { useNavigate } from 'react-router-dom'
import Error from '../../assets/img/error-404.png'

import { PiArrowLeftLight } from "react-icons/pi";
import { Link } from "react-router-dom";


export function PageError(){
    const navigate = useNavigate()

    function handleGoBack(){
        navigate("/")
    }

    return(
        <Container>
            <header>
                <Link to="/">
                    <ButtonText title="Voltar" icon={PiArrowLeftLight} onClick={handleGoBack}/>
                </Link>
            </header>

            <div className="content">
                <img src={Error} alt="Imagem de erro 404" />

                <div>
                    <h2>Error 404</h2>
                    <span>Oops!</span>
                    <h3>Página não encontrada</h3>
                </div>
            </div>
        </Container>
    )
}