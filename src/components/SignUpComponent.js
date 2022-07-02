import styled from 'styled-components';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();
        setDisable(true);

        if (password !== confirmPassword) {
            alert('As senhas devem ser iguais!');
            setDisable(false);
            setPassword('');
            setConfirmPassword('');
            return;
        }

        const user = {
            name,
            email,
            password,
        }
        const promise = axios.post('http://localhost:5020/users', user);
        promise.then(() => {
            alert('Cadastro realizado! Você já pode realizar o login!');
            navigate('/');
        });
        promise.catch(() => {
            alert('Dados inválidos! Tente novamente.');
            setDisable(false);
        });

    }

    function verifyDisable() {
        if (!disable) {
            return <p>Cadastrar</p>;
        }

        return <ThreeDots color='white' />;
    }

    const buttonComponent = verifyDisable();

    return (
        <Container>
            <h1>MyWallet</h1>
            <form onSubmit={submit}>
                <input
                    placeholder='Nome'
                    type={'text'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={disable}
                    required
                />
                <input
                    placeholder='Email'
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
                <input 
                    placeholder='Confirme a senha'
                    type={'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={disable}
                    required
                />
                <button type='submit'>{buttonComponent}</button>
            </form>
            <Link to={'/'}>
                Já tem uma conta? Entre agora!
            </Link>
        </Container>
    )
}

export default SignUp;

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    align-self: center;
    box-sizing: border-box;
    padding: 14.2vh 0 17vh 0;
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        box-sizing: border-box;
        font-family: 'Saira Stencil One', cursive;
        font-size: 4.7vh;
        line-height: 7.49vh;
        color: #FFFFFF;
        margin-bottom: 4.19vh;
        margin-top: 0;
    }

    form {
        box-sizing: border-box;
        font-size: 2.99vh;
        line-height: 3.4vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            width: 86.9vw;
            height: 8.69vh;
            box-sizing: border-box;
            background-color: #FFFFFF;
            color: #000000;
            padding: 0 0 0 4.6vw;
            margin-bottom: 1.9vh;
            border-radius: 5px;
            border: none;

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
            box-sizing: border-box;
            background-color: #A328D6;
            color: #FFFFFF;
            border-radius: 5px;
            border: none;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    a {
        box-sizing: border-box;
        text-decoration: none;
        font-weight: bold;
        font-size: 2.24vh;
        line-height: 2.54vh;
        color: #FFFFFF;
        margin-top: 4.79vh;
    }
`