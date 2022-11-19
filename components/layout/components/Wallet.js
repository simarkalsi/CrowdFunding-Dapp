import React from 'react'
import { ethers } from 'ethers'
import { useState } from 'react'
import styled from 'styled-components';

const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
};

export default function Wallet() {

    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const switchEthereumChain = async () => {
        if (window.ethereum) {
            try {
                // check if the chain to connect to is installed
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${Number(80001).toString(16)}` }], // chainId must be in hexadecimal numbers
                });
                connectWallet();
            } catch (error) {
                // This error code indicates that the chain has not been added to MetaMask
                // if it is not, then install it into the user MetaMask
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${Number(80001).toString(16)}`,
                                    rpcUrl: ["https://rpc-mumbai.maticvigil.com/"],
                                },
                            ],
                        });

                    } catch (addError) {
                        console.error(addError);
                    }
                }
                console.error(error);
            }
        } else {
            // if no window.ethereum then MetaMask is not installed
            alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    }
    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);

    };

    return (
        <Connect onClick={switchEthereumChain}>
            {balance == null ? <div></div> : <Balance>{balance.slice(0, 4)} Matic</Balance>}
            {address == null ? <Address>Connect Wallet</Address> : <Address>{address.slice(0, 6)}...{address.slice(39)}</Address>}
        </Connect>
    )
}

const Connect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: ${(props)=>props.theme.buttonGradient};
  padding: 5px 5px;
  height: 100%;
  color: #fff;
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`
const Address = styled.h2`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
    
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    padding: 0px 5px;
    border-radius: 10px 0px 0px 10px;
    background: ${(props)=>props.theme.bgSubDiv};

`

