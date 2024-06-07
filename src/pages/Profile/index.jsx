import { Container, Content, Form, Avatar, Infos, Logo } from './styles';

import { ThemeProvider } from 'styled-components';
import { ThemeSlider} from "../../components/ThemeSlider";
import { useDarkMode } from '../../styles/modeDarkTheme';
import GlobalStyles from '../../styles/global'
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/theme';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useState } from 'react';
import { Link } from "react-router-dom";

import { CiUser, CiLock, CiCamera } from 'react-icons/ci';
import { LiaShoppingBagSolid, LiaEnvelope  } from "react-icons/lia";
import { AiOutlinePlus } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import avatarImg from '../../assets/img/avatar.png';
import logo from '../../assets/img/poligono.svg';

export function Profile() {
    const [ theme, toggleTheme ] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;

    const { user, updateProfile, loading } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarImg;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const updated = { name, email, password: passwordNew, old_password: passwordOld, }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
                <Container>
                    <Header />
                        <Content>
                            
                            <ThemeSlider theme={theme} toggleTheme={toggleTheme}/>

                            <div className='card'>
                                <Form>
                                    <Avatar>
                                        <img src={avatar} alt="Foto do usuário" />

                                        <label htmlFor="avatar">
                                            <CiCamera />

                                            <input id="avatar" type="file" accept="image/*" onChange={handleChangeAvatar} />
                                        </label>
                                    </Avatar>

                                    <div className='inputs'>
                                        <label>
                                            <CiUser  size={20}/>
                                            <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                                        </label>

                                        <label>
                                            <LiaEnvelope size={20}/>
                                            <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                        </label>

                                        <label>
                                            <CiLock  size={20}/>
                                            <input type="password" placeholder="Senha atual" onChange={e => setPasswordOld(e.target.value)} />
                                        </label>

                                        <label>
                                            <CiLock  size={20}/>
                                            <input type="password" placeholder="Nova senha" onChange={e => setPasswordNew(e.target.value)} />
                                        </label>
                                    </div>

                                    <Button title={loading ? "Salvando" : "Salvar"} onClick={handleUpdate} disabled={loading} />
                                </Form>

                                {
                                    user.isAdmin ?

                                        <Infos>
                                            <Logo>
                                                <div className="logo">
                                                    <img src={logo} alt="" />
                                                </div>
                                            </Logo>
                                            
                                            <p>Olá <span>{name}</span>, acesse a opção desejada:</p>

                                            <Link to="/orders">
                                                <Button title="Ver pedidos" icon={LiaShoppingBagSolid} />
                                            </Link>

                                            <Link to="/createdish">
                                                <Button title="Novo prato" icon={AiOutlinePlus} />
                                            </Link>
                                        </Infos>

                                    :

                                        <Infos>
                                            <Logo>
                                                <div className="logo">
                                                        <img src={logo} alt="" />
                                                </div>
                                            </Logo>
                                            
                                            <p>Olá <span>{name}</span>, acesse a opção desejada:</p>

                                            <Link to="/orders">
                                                <Button title="Meus pedidos" icon={LiaShoppingBagSolid} />
                                            </Link>

                                            <Button title="Contato por e-mail" icon={LiaEnvelope} onClick={() => window.location = 'mailto:contato@foodexplorer.com'} />

                                            <Button title="WhatsApp" icon={FaWhatsapp} onClick={() => window.open("https://api.whatsapp.com/send?phone=+999999999999&text=Oi ! =)", '_blank')} />
                                        </Infos>
                                }
                            </div>
                        </Content>
                    <Footer />
                </Container>
        </ThemeProvider>
    );
}