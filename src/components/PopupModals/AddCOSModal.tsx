import React from 'react'
import { Text, Modal, Button, LinkExternal } from 'cofetch-uikit'
import styled from 'styled-components'

type AddbCOTModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => string
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const addToken = async () => {
  const tokenAddress = '0xE81e92Bf8A02da1937B932d06ea6d1C6E35b7C01'
  const tokenSymbol = 'COS'
  const tokenDecimals = 18
  const tokenImage = ''

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    if (window.web3) {
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
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const AddbCOTModal = ({ onDismiss = defaultOnDismiss, translateString }: AddbCOTModalProps) => {
const TranslateString = translateString

  const Flex = styled.div`
  justifyContent:center
  flexDirection:column
  display:flex;
  `

  const ModalContent = styled.div`
  border-radius: 10px;
  position: relative;
  overflow: auto;
  width: 100%;
  max-width: 300px;
  min-width:100px;
  background: #FFFFFF;
  
  font-family: calibri;
  color: #483D8B;
  
    // word-wrap: break-all;
    // text-align:justify;
  
  .header{
    fontWeight:bold;
    font-size:20px;
    float:left
    margin-bottom:5%;   
    padding-left:40px;
    padding:10px
  }
  
  .middle{
    float:left
  }
  
  .middle p{
    font-size:13px;
  }
  
  .bottom{
    font-size:15px;
    
  }
  
  hr {
    border-top: 1px  rgba(255,0,0,.1);
    width: 320px;
    height: 1px;
    margin-left: 1px;
    background-color:#483D8B;
  }
  
  .bottom a{
    background-color:#dec4ff;
  }
  `
  return (
    <Modal title={TranslateString(1202, 'COS token')} onDismiss={onDismiss}>
      <Flex>
        <ModalContent>
          <div className="header">1-Step Simple - Total DeFi</div>
          <div className="bottom">
            <Text>
              Pool token that you can use to get back bCOT+BNB when you “Remove” liquidity in {' '}
              <a href="https://swap.cotrader.com/#/swap">swap.cotrader.com</a>
              <br />
              Click address to add it to your Metamask:
              <br />
              <Button scale="sm" style={{display:"block", margin:"auto"}} onClick={() => addToken()}>
                0xE81e9....5b7C01
              </Button>
            </Text>
          </div>
        </ModalContent>
        <Button style={{display:"block", margin:"auto"}} variant="tertiary" scale="sm" onClick={onDismiss}>
          Close
        </Button>
      </Flex>
    </Modal>
  )
}

export default AddbCOTModal
