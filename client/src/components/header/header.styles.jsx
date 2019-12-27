import styled,{css} from 'styled-components'
import {Link} from 'react-router-dom'// was originally imported to header.component.jsx along with scss file

//if your planning to use the CSS multiple times, better declare it
const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor:pointer;
`

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`
//if your styling a component
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

//or we can OptionLink as=div so that we can remove this code and use only OptionDiv for styled component (container)
export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;

//overall: no nested style declaration using css selectors (usuall class) , and each styled component(container) is imported to the main component