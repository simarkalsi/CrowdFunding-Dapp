import React from 'react'
import Header from './Header'
import themes from './themes'
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState, createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';

const App = createContext();

export default function Layout({ children }) {


    const [theme, setTheme] = useState('dark');

    const changeTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    }

    return (
        <>
            <App.Provider value={{ changeTheme, theme }}>

                <ThemeProvider theme={themes[theme]}>
                    <LayoutWrapper>
                        <GlobalStyle />
                        <Header />
                        {children}
                    </LayoutWrapper>
                </ThemeProvider>
            </App.Provider>
        </>
    )
}
const GlobalStyle = createGlobalStyle`
body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
`
const LayoutWrapper = styled.div`
min-height:100vh;
background-color : ${(props) => props.theme.bgColor};
color:${(props) => props.theme.color}

`
export { App };