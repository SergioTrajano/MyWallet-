import styled from "styled-components";
import dayjs from 'dayjs';
import { IoIosClose } from "react-icons/io";

function OldTransaction({ transaction }) {

    const priceColor = transaction.isPositive ? '#03AC00' : '#C70000';

    return (
        <Container lastSpanColor={priceColor}>
            <div>
                <span>{dayjs(transaction.date).format('DD/MM')}</span>
                <p>{transaction.description}</p>
            </div>
            <div>
                <span>{Number(transaction.value).toFixed(2)}</span>
                <IoIosClose color='grey' />
            </div>
        </Container>
    )
}

export default OldTransaction;

const Container = styled.div`
    width: 80vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5vh;

    div {
        display: flex;
        align-items: center;

        p {
            font-family: 'Raleway', sans-serif;
            font-size: 2.39vh;
            color: #000000;
            max-width: 42.66vw;
        }

        span:first-child {
                color: #C6C6C6;
                font-size: 2.39vh;
                line-height: 2.78vh;
                font-family: 'Raleway', sans-serif;
                margin-right: 4.5vw;
                box-sizing: border-box;
        }
    }


    div:last-child {
        display: flex;
        

        span {
            color: ${props => props.lastSpanColor};
            font-size: 2.39vh;
            line-height: 2.78vh;
            font-family: 'Raleway', sans-serif;
        }
    }

`