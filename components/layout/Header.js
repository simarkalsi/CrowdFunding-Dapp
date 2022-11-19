import React from 'react'
import styled from 'styled-components'
import HeaderLogo from './components/HeaderLogo'
import HeaderNav from './components/HeaderNav'
import HeaderRight from './components/HeaderRight'
export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderLogo/>
      <HeaderNav/>
      <HeaderRight/>

    </HeaderWrapper>
  )
}
const HeaderWrapper=styled.div`
width: 100%;
height: 70px;
padding-top: 5px;
display: flex;
justify-content: space-between;
align-items: center;

`


