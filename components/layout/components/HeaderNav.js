import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function HeaderNav() {
  const Router = useRouter();
  return (
    <HeaderNavWrapper>

      <StyledLink href={"/"}><HeaderNavLinks active={Router.pathname == "/" ? true : false} ><Div>Campaigns</Div></HeaderNavLinks></StyledLink>
      <StyledLink href={"/createCampaign"}><HeaderNavLinks active={Router.pathname == "/createCampaign" ? true : false}><Div>Create Campaign</Div></HeaderNavLinks></StyledLink>
      <StyledLink href={"/dashboard"}> <HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false}><Div>Dashboard</Div></HeaderNavLinks></StyledLink>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: ${(props) => props.theme.bgDiv};
padding: 7px 0px 7px 0px;
height: 50%;
border-radius: 10px;


`
const Div = styled.div`


`
const HeaderNavLinks = styled.div`
display: flex;
align-items: center;
font-family: 'Roboto';
border: 3px solid transparent;
  border-radius: 10px;
  background: 
    linear-gradient(to right,${(props)=>props.theme.bgDiv}, ${(props)=>props.theme.bgDiv}), 
    ${(props)=>props.active?props.theme.buttonGradient:props.theme.bgDiv}; 
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  
  /* Other styles */

  padding: 10px;
cursor: pointer;
font-weight:bold;
font-size: small;
color: ${(props) => props.theme.color};
text-decoration: none;
`

const StyledLink = styled(Link)`
color: ${(props) => props.theme.color};
padding: 0%;
text-decoration: none;
margin :6px;

`