import { Container, Content, Logo } from "./styles"
import logo_footer from "../../assets/img/poligono-footer.svg"

export function Footer() {
    return (
        <Container>
            <Content>
                <Logo>
                    <div className="logo">
                        <img src={logo_footer} alt="Logo Food Explorer" />
                        <span>food explorer</span>
                    </div>
                </Logo>
                <p>© 2024 - Todos os direitos reservados.</p>
            </Content>
        </Container>
    )
}