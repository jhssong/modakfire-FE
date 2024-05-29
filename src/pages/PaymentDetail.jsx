import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBack from "../layouts/HeaderBack";
import Bill from "../layouts/Bill";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff;
`;

const BillWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:100%;
`;

const PaymentButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    width: 100%;
    height: 67px;
    background: #ff8a3d;
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
`;

const PaymentDetail = () => {
    const { inputValue } = useParams();
    let navigate = useNavigate();

    const navigateToPayfinish = () => {
        navigate(`/payment/paymentfinish${inputValue}`);
    };

    return (
        <Container>
            <HeaderBack></HeaderBack>
            <BillWrapper>
                <Bill amount={inputValue}></Bill>
            </BillWrapper>
            <PaymentButton onClick={() => navigateToPayfinish()}>
                기부하기
            </PaymentButton>
        </Container>
    );
};

export default PaymentDetail;