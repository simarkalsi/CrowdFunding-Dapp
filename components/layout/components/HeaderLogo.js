import React from 'react'
import styled from 'styled-components'
import Image from "next/image"
import pic from '../../../style/logo.png'


export default function HeaderLogo() {
  return (
    <LogoWrapper>
      
      <Logo>FUNDCHAIN</Logo>
    </LogoWrapper>
  )
}

const Logo = styled.h1`
font-weight:  bold;
font-size: 30px;
margin-left: 20px;
font-family: "poppins";
background: ${(props) => props.theme.buttonGradient};
-webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
`
const LogoWrapper = styled.div`
`
