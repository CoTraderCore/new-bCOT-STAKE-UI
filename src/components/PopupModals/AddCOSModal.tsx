import React from 'react'
import {  Flex, Text, Modal, Button, LinkExternal } from 'cofetch-uikit'
import styled from 'styled-components'

type AddbCOTModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const addToken=async ()=>{
const tokenAddress = '0xE81e92Bf8A02da1937B932d06ea6d1C6E35b7C01';
const tokenSymbol = 'COS';
const tokenDecimals = 18;
const tokenImage = '';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  if(window.web3)
  {
    await window.web3.currentProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    
  }
  
} catch (error) {
  console.log(error);
}
}



const AddbCOTModal = ({ onDismiss = defaultOnDismiss, translateString }: AddbCOTModalProps) => {
  const TranslateString = translateString


const ModalContent = styled.div`
border-radius: 10px;
position: relative;
padding: 10px;
margin-top:15px;
background: #FFFFFF;
.header{
  fontWeight:bold;
  font-size:25px;
  margin-left:%;
  margin-bottom:5%;   
  padding:10px
}

.middle{
  padding:10px;
  margin-left:15%;
}

.middle span p{
  font-size:12px;
  padding-top:5px;
}

.bottom{
  padding:10px;
  font-size:15px;
}

hr {
  border-top: 1px  rgba(255,0,0,.1);
  width: 320px;
  height: 1px;
  margin-left: 1px;
  background-color:#483D8B;
}

.middle a{
  background-color:#dec4ff;
}

 
font-family: calibri;
color: #483D8B;
` 
  return (
    <Modal title={TranslateString(1202, 'COS token')} onDismiss={onDismiss}>
      
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="bottom">
                <Text>
                Pool token that you can use to get back bCOT+BNB when <br/>  you “Remove” liquidity in <LinkExternal  href="https://swap.cotrader.com/#/swap" >swap.cotrader.com</LinkExternal>
                <br/>
Click address to add it to your Metamask:
                <br/>
                <Button onClick={()=>addToken()}>
                0xE81e92Bf8A02da1937B932d06ea6d1C6E35b7C01</Button>
                
                </Text>
                
              </div>
            </ModalContent>
          <Button variant="tertiary" scale="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      
     
      
    </Modal>
  )
}

export default AddbCOTModal
