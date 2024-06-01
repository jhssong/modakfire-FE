import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Present from "../assets/Present.svg";
import { useEffect } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
    height: 100vh;
    background: #ffffff;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 20px;
`;

const HomeButton = styled.div`
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

const LogoImage = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: min(20vw, 250px);
    width: min(20vw, 250px);
`;

const PresentComment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Noto Sans KR";
    font-weight: 900;
    font-size: 32px;
    line-height: 46px;
    color: "black";
`;

const PaymentFinish = () => {
    let navigate = useNavigate();
    
    useEffect(() => {
        const preventGoBack = () => {
          // change start
          history.pushState(null, '', location.href);
          // change end
          navigate('/');
        };
        
        history.pushState(null, '', location.href);
        window.addEventListener('popstate', preventGoBack);
        
        return () => window.removeEventListener('popstate', preventGoBack);
      }, []);   
      
    return (
        <Container>
            <CommentContainer>
                <LogoImage src={Present} />
                <PresentComment>기부 완료</PresentComment>
            </CommentContainer>

            <HomeButton onClick={() => {navigate('/')}}>홈으로</HomeButton>
        </Container>
    );
};

export default PaymentFinish;
