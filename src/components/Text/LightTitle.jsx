import styled from "styled-components";

const LightTitleWrapper = styled.h1`
    font-size: ${({theme}) => theme.fontSize.medium};
    font-weight: normal;
`

const LightTitle = (props) => {
    return (
        <LightTitleWrapper>
            {props.children}
        </LightTitleWrapper>
    )
}

export default LightTitle;