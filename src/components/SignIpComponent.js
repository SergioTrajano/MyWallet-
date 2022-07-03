import styled from 'styled-components';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIpComponent({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    function checkDisable() {
        if (disable) {
            return <ThreeDots color='white' />;
        }
        return <p>Entrar</p>;
    }

    function submit(e) {
        e.preventDefault();
        setDisable(true);
        const user = {
            headers: {
            email,
            password,
            }
        }
        const promise = axios.get('http://localhost:5020/users', user);
        promise.then( (res) => {
                setUser(res.data);
                navigate('/wallet');
        })
        promise.catch(() => {
            setDisable(false);
            alert("Dados inválidos!");
        })
    }

    const buttonTag = checkDisable();

    return (
        <Container aria-disabled={disable}>
            <h1>MyWallet</h1>
            <form onSubmit={submit}>
                <input
                    placeholder='E-mail'
                    type={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disable}
                    required
                />
                <input 
                    placeholder='Senha'
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={disable}
                    required
                />
                <button type='submit' disabled={disable}>{buttonTag}</button>
            </form>
            <Link to={'/signUp'} style={{pointerEvents: disable ? 'none' : 'initial'}}>
                Primeira vez? Cadastre-se!
            </Link>
        </Container>
    )
}

export default SignIpComponent;

const Container = styled.div`
    min-height: 100vh;
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
    padding: 23.8vh 0 28.8vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 4.8vh;
        line-height: 7.5vh;
        color: #FFFFFF;
        margin-bottom: 3.5vh;
        box-sizing: border-box;
    }

    form {
        font-size: 3vh;
        line-height: 3.4vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            width: 86.9vw;
            height: 8.7vh;
            background-color: #FFFFFF;
            color: #000000;
            border-radius: 5px;
            padding-left: 4.6vw;
            margin-bottom: 1.9vh;
            box-sizing: border-box;
            font-family: 'Raleway', sans-serif;

            &::placeholder {
                color: gray;
            }

            &:disabled {
                opacity: 0.8;
            }
        }

        button {
            width: 86.9vw;
            height: 6.89vh;
            background-color: #A328D6;
            font-weight: bold;
            color: #FFFFFF;
            border-radius: 5px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            font-family: 'Raleway', sans-serif;

            &:disabled {
                opacity: 0.8;
            }
        }
    }

    a {
        font-weight: bold;
        font-size: 2.2vh;
        line-height: 2.6vh;
        color: #FFFFFF;
        margin-top: 5.4vh;
        text-decoration: none;
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
    }
`
