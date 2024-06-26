import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import HeaderPeriodicalDonation from "../../../../layouts/HeaderPeriodicalDonation";
import Back from "../../../../assets/Back.svg";
import { useEffect, useState } from "react";
import { periodicalDonationState } from "../../../../recoil/atoms/periodicalDonationAtom";
import { userState } from "../../../../recoil/atoms/userAtom";
import { readPeriodicalDonation } from "../../../../api";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.color.bg};
`;

const Seperator = styled.div`
    width: 100vw;
    height: 1.5vh;
    background: ${({ theme }) => theme.color.secondary};
`;

const DonationList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    width: 100%;
    flex-grow: 1;
`;

const DonationCenter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.padding.primary};
    gap: 3vw;
    width: 100vw;
    height: 10vh;
    ${(props) =>
        props.islast
            ? `border-top: 1px solid ${props.theme.color.lightgray}`
            : null};
    border-bottom: 1px solid ${({ theme }) => theme.color.lightgray};
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const CenterName = styled.div`
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: ${({ theme }) => theme.fontColor.primary};
`;

const Amount = styled.div`
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.base};
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.padding.primary};
    width: 100%;
`;
const VectorSmall = styled.img`
    height: 1.5vh; /* 10px */
    transform: rotate(180deg);
`;

const EditButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: min(2vw, 8px);
    width: 100%;
    background: ${({ theme }) => theme.color.primary};
    border-radius: min(4vw, 16px);
    border: none;
    color: ${({ theme }) => theme.fontColor.white};
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.medium};
    cursor: pointer;
`;

const CenterNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: min(2vw, 5px);
`;



const PeriodicalDonationManage = () => {
    const [periodicalDonation, setPeriodicalDonation] = useRecoilState(
        periodicalDonationState
    );
    const [user, setUser] = useRecoilState(userState);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result;
                result = await readPeriodicalDonation(user.id);
                setPeriodicalDonation(result);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        };

        fetchData();
    }, []);

    

    const formatNumber = (number) => {
        return number.toLocaleString("ko-KR");
    };

    

    return (
        <Container>
            <HeaderPeriodicalDonation />
            <DonationList>
                {periodicalDonation
                    ? periodicalDonation.map((donation, index) => (
                          <DonationCenter
                              key={index}
                              onClick={() => {
                                  navigate(
                                      "/setting/periodicaldonation/detail",
                                      {
                                          state: {
                                              id:
                                                  donation.id,
                                          },
                                      }
                                  );
                              }}
                              islast={index === 0 ? "true" : "false"}
                          >
                              <Info>
                                  <CenterNameWrapper>
                                      <CenterName>
                                          {donation.centerName}
                                      </CenterName>
                                      <VectorSmall src={Back} />
                                  </CenterNameWrapper>
                                  <Amount style={{ color: "#B5B5B5" }}>
                                      {donation.centerLocation}
                                  </Amount>
                              </Info>
                              <Info>
                                  <Amount>
                                      매달&nbsp;{donation.donationDate}
                                      &nbsp;일
                                  </Amount>
                                  <Amount>
                                      매달&nbsp;{formatNumber(donation.amount)}
                                      &nbsp;원
                                  </Amount>
                              </Info>
                          </DonationCenter>
                      ))
                    : null}
            </DonationList>
            <Seperator />
            <ButtonWrapper>
                <EditButton
                    onClick={() => {
                        navigate("/setting/periodicaldonation/add");
                    }}
                >
                    정기기부 추가하기
                </EditButton>
            </ButtonWrapper>
        </Container>
    );
};

export default PeriodicalDonationManage;
