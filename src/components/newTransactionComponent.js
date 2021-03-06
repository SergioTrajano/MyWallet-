import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import { ThreeDots } from 'react-loader-spinner';


function NewTransactionComponent({ user }) {
    const { transactionType } = useParams();
    const [transactionValue, setTransactionValue] = useState('');
    const [description, setDescription] = useState('');
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    });

    function submit(e) {
        e.preventDefault();
        setDisable(true);

        if (isNaN(transactionValue)) {
            alert('O valor deve ser um número positivo!');
            setTransactionValue('');
            setDisable(false);
            return;
        }

        const isPositive = transactionType === 'entrada' ? true : false;

        const newTransaction = {
            value: transactionValue,
            description,
            isPositive,
            date: dayjs().format('MM/DD/YYYY'),
        };
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const promise = axios.post('https://back-end-project-mywallet.herokuapp.com/transaction', newTransaction, config);
        promise.then(() => {
            alert('Uma transação foi adicionada a sua carteira!');
            setTransactionValue('');
            setDescription('');
            setDisable(false);
        });
    }

    function checkDisable() {
        if (!disable) return <>Salvar {transactionType}</>;

        return <ThreeDots color='white' />;
    }

    const buttonTag = checkDisable();

    return (
        <Container>
            <h1>Nova {transactionType}</h1>
            <form onSubmit={submit}>
                <input
                    placeholder='Valor'
                    type={'number'}
                    step='any'
                    disabled={disable}
                    value={transactionValue}
                    onChange={(e) => setTransactionValue(e.target.value)}
                    required
                />
                <input 
                    placeholder='Descrição'
                    type={'text'}
                    value={description}
                    disabled={disable}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type='submit' style={{PointerEvent: disable ? 'none' : 'initial'}}>{buttonTag} </button>
            </form>
            <div onClick={() => navigate('/wallet')} style={{pointerEvents: disable ? 'none' : 'initial'}}>Voltar</div>
        </Container>
    );
}

export default NewTransactionComponent;

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 3.74vh 6.4vw 0 6.4vw;
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;

    h1 {
        font-weight: bold;
        font-size: 3.89vh;
        line-height: 4.57vh;
        color: #FFFFFF;
        box-sizing: border-box;
        margin-bottom: 5.99vh;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            width: 86.93vw;
            height: 8.69vh;
            box-sizing: border-box;
            padding-left: 4vw;
            margin-bottom: 1.94vh;
            color: #000000;
            background-color: #FFFFFF;
            border-radius: 5px;
            font-size: 2.99vh;
            line-height: 3.52vh;

            &::placeholder {
                color: gray;
            }

            &:disabled {
                opacity: 0.8;
            }
        }

        button {
            width: 86.93vw;
            height: 6.87vh;
            box-sizing: border-box;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #FFFFFF;
            background-color: #A328D6;
            border: none;
            font-size: 2.99vh;
            line-height: 3.52vh;
        }
    }

    div {
        width: 86.93vw;
        height: 6.87vh;
        background-color: #FFFFFF;
        font-size: 2.99vh;
        line-height: 3.52vh;
        color: #A328D6;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-top: 1.94vh;
        border-radius: 5px;
        font-weight: bold;
    }
`