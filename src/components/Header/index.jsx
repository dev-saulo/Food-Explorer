import { Container, Content, Logo, Search, Logout, Button, ButtonMenu, Profile } from "./styles";
import { useAuth } from '../../hooks/auth';

import { Link } from "react-router-dom";

import { MagnifyingGlass, LogOut, UserCircle, Basket, Heart } from 'phosphor-icons';
import { Receipt } from "phosphor-icons";

import logo from '../../assets/img/poligono.svg';

export function Header({search, favoritesFilter}) {
    const { user } = useAuth()
    const { signOut } = useAuth();

    const { cart, orders } = useCart();
    
    function mobileMenu() {
        document.getElementById('hamburger').classList.toggle('active')
        document.getElementById('nav-menu').classList.toggle('active')
    }

    function userMenu() {
        document.getElementById('user-menu').classList.toggle('active')
    }

    return (
        <Container>
            <Content>
                <div className="hamburger" id="hamburger" onClick={mobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <Logo>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                            <h1>food explorer</h1>
                        </Link>
                    </div>
                </Logo>


                <div className="nav-menu" id="nav-menu">

                    <Search>
                        <label>
                            <MagnifyingGlass size={24}/>
                            <input type="text" placeholder="Busque por pratos ou ingredientes" onChange={e => {search(e.target.value)}}/>
                        </label>
                    </Search>

                    {
                        user.isAdmin ?
                            <Link to="/orders">
                                <Button type='button'>
                                    <Receipt size={24}/>
                                    Novo prato 
                                    <span>({orders.length})</span>
                                </Button>
                            </Link>
                    :
                            <Link to="/cart">
                                <Button type='button'>
                                    <Receipt size={24}/>
                                    Pedidos 
                                    <span>({cart.length})</span>
                                </Button>
                            </Link>
                    }

                    {
                        user.isAdmin ?
                            <Link to="/profile">
                                <Profile>
                                    <UserCircle />
                                </Profile>
                            </Link>
                    :
                        <Profile onClick={userMenu}>
                            <UserCircle />
                            <div className="user-menu" id="user-menu">
                                    <Link to="/orders">
                                        <ButtonMenu>
                                            <Basket size={24}/>
                                            Meus Pedidos
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/">
                                        <ButtonMenu onClick={favoritesFilter}>
                                            <Heart size={24}/>
                                            Meus Favoritos
                                        </ButtonMenu>
                                    </Link>
                                    
                                    <Link to="/profile">
                                        <ButtonMenu>
                                            <UserCircle size={24}/>
                                            Meu Perfil
                                        </ButtonMenu>
                                    </Link>
                            </div>
                        </Profile>
                    }

                    <Logout to="/" onClick={signOut}>
                        <LogOut />
                    </Logout>
                </div>

            </Content>
        </Container>
    );
}