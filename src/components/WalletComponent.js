import styled from 'styled-components';
import axios from 'axios';
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import OldTransaction from './OldTransactionComponent.js';

function Wallet({ user, setUser}) {
    const [transactionHistory, setTransactionHIstory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    });

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        const promise = axios.get('http://localhost:5022/transaction', config);
        promise.then((response) => setTransactionHIstory(response.data))
    }, [user]);

    function exit() {
        setUser({});
        navigate('/');
    }

    function formatTransactions() {
        if (!transactionHistory.length) {
            return <Msg>
                <p>Não há registros de entrada ou saída</p>
            </Msg>;
        }

        return transactionHistory.map( (transaction, i) => <OldTransaction key={i} transaction={transaction} />);
    }

    function calculateTotal() {
        if (!transactionHistory.length) return <></>;

        let total = 0;
        transactionHistory.forEach(transaction => {
            if (transaction.isPositive) total += Number(transaction.value);
            else total -= Number(transaction.value);
        });
        let totalColor = total > 0 ? '#03AC00' : '#C70000';

        if (total === 0) totalColor = '#000000';

        return <Total color={totalColor}>
            <span>Saldo</span><span>{Number(total).toFixed(2)}</span>
        </Total>;
    }
    

    const transactions = formatTransactions();
    const total = calculateTotal();

    return (
        <Container> 
            <div>
                <p> Olá, {user.name} </p>
                <div><IoExitOutline color='white' onClick={exit}/></div>
            </div>
            <div>
                {transactions}
                {total}
            </div>
            <div>
                <Link to={'/newTransaction/entrada'} >
                    <div>
                        <AiOutlinePlusCircle color='white' />
                        <p>Nova entrada</p>
                    </div>
                </Link>
                <Link to={'/newTransaction/saída'} >
                    <div>
                        <AiOutlineMinusCircle color='white' />
                        <p>Nova saída</p>
                    </div>
                </Link>
            </div>
        </Container>
    )
}

export default Wallet;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.74vh 6.4vw 2.39vh 6.4vw;
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;

    > div:first-child {
        width: 86.93vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 3.89vh;
        line-height: 4.54vh;
        color: white;
    }

    > div:nth-child(2) {
        width: 86.93vw;
        height: 66.86vh;
        box-sizing: border-box;
        background-color: #FFFFFF;
        padding: 3.44vh 2.93vw 4.49vh 2.93vw;
        margin: 3.29vh 0 1.94vh 0;
        border-radius: 5px;
        position: relative;
    }

    > div:last-child {
        width: 86.93vw;
        height: 17.09vh;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        a {
            width: 40vw;
            height: 17.09vh;
            box-sizing: border-box;
            background-color: #A328D6;
            border-radius: 5px;
            padding: 1.34vh 0 1.34vh 2.13vw;
            text-decoration: none;
            color: white;

            p {
                font-size: 2.54vh;
                line-height: 2.99vh;
                max-width: 20.5vw;
                font-weight: bold;
                margin-top: 4.64vh
            }
        }
    }
`

const Msg = styled.div`
    width: 80.5vw;
    height: 61.9vh;
    background-color: #FFFFFF;
    color: #868686;
    font-family: 'Raleway', sans-serif;
    font-size: 2.99vh;
    line-height: 3.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    p {
        max-width: 48vw;
        text-align: center;
    }
`

const Total = styled.div`
    width: 80vw;
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: absolute;
    bottom: 1.49vh;
    left: 2.93vw;
    font-size: 2.54vh;
    line-height: 2.98vh;

    span:first-child {
        color: #000000;
        font-weight: bold;
    }

    span:last-child {
        color: ${props => props.color};
    }

`