import React from 'react'
import styled from 'styled-components'
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { App } from '../Layout';
import { useContext } from 'react';
import Wallet from './Wallet';


export default function HeaderRight() {
    const ThemeToggler = useContext(App);

    return (
        <HeaderRightWrapper>
            <Wallet/>
            <ThemeToggle onClick={ThemeToggler.changeTheme}>
                {ThemeToggler.theme == "light" ? <NightlightIcon  /> : <LightModeIcon  />}
            </ThemeToggle>

        </HeaderRightWrapper>
    )
}

const HeaderRightWrapper = styled.div`
display: flex;
justify-content: center;
align-items:center;
margin-right: 15px;
height: 50%;
`
const ThemeToggle = styled.div`
display: flex;
justify-content: center;
align-items:center;
background-color: ${(props) => props.theme.bgDiv};
padding: 10px;


border-radius: 50px;
cursor: pointer;
`