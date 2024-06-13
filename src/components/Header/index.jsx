import { Container, Content, Logo, Search, Logout, Button, ButtonMenu, Profile } from "./styles";
import { useAuth } from '../../hooks/auth';
import { useCard } from '../../hooks/card';

import { Link } from "react-router-dom";

import { CiUser, CiShoppingBasket, CiHeart } from "react-icons/ci";
import { BiExit } from "react-icons/bi";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { CiReceipt } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";


import logo from '../../assets/img/poligono.svg';

export function Header({search, favoritesFilter}) {
    const { user } = useAuth()
    const { signOut } = useAuth();

    const { card, orders } = useCard();
    
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
                    <IoMenu size={24} />
                    {/* <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span> */}
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
                            <PiMagnifyingGlassThin size={24}/>
                            <input type="text" placeholder="Busque por pratos ou ingredientes" onChange={e => {search(e.target.value)}}/>
                        </label>
                    </Search>

                    {
                        user.isAdmin ?
                            <Link to="/orders">
                                <Button type='button'>
                                    <CiReceipt size={24}/>
                                    Novo prato 
                                    <span>({orders.length})</span>
                                </Button>
                            </Link>
                    :
                            <Link to="/card">
                                <Button type='button'>
                                    <CiReceipt size={24}/>
                                    Pedidos 
                                    <span>({card.length})</span>
                                </Button>
                            </Link>
                    }

                    {
                        user.isAdmin ?
                            <Link to="/profile">
                                <Profile>
                                    <CiUser />
                                </Profile>
                            </Link>
                    :
                        <Profile onClick={userMenu}>
                            <CiUser />
                            <div className="user-menu scale-up-ver-top" id="user-menu">
                                    <Link to="/orderhistory">
                                        <ButtonMenu>
                                            <CiShoppingBasket size={24}/>
                                            Meus Pedidos
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/">
                                        <ButtonMenu onClick={favoritesFilter}>
                                            <CiHeart size={24}/>
                                            Meus Favoritos
                                        </ButtonMenu>
                                    </Link>
                                    
                                    <Link to="/profile">
                                        <ButtonMenu>
                                            <CiUser size={24}/>
                                            Meu Perfil
                                        </ButtonMenu>
                                    </Link>
                            </div>
                        </Profile>
                    }

                    <Logout to="/" onClick={signOut}>
                        <BiExit />
                    </Logout>
                </div>

            </Content>
        </Container>
    );
}