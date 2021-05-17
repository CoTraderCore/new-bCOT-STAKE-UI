import React from 'react'
import { Text, Modal, Button } from 'cofetch-uikit'
import styled from 'styled-components'

type HowToDepositModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null



const HowToDepositModal = ({ onDismiss = defaultOnDismiss, translateString }: HowToDepositModalProps) => {
  const TranslateString = translateString


  const Flex=styled.div`
  justifyContent:center
  flexDirection:column
  display:flex;
  `
  const ModalContent = styled.div`
  border-radius: 10px;
  position: relative;
  overflow: auto;
  width: 100%;
  max-width: 390px;
  min-width:100px;
  background: #FFFFFF;
  
  font-family: calibri;
  color: #483D8B;
  
    word-wrap: break-all;
    text-align:justify;
  
  .header{
    fontWeight:bold;
    font-size:25px;
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
  
  .middle a{
    background-color:#dec4ff;
  }
  ` 
  return (
    <Modal title={TranslateString(1202, 'How To Deposit')} onDismiss={onDismiss}>
      
        <Flex>
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="middle">
                <Text>
                  Get{' '}
                  <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank" rel="noreferrer">
                    Metamask.io
                  </a>{' '}
                  and configure it for BSC
                </Text>
                <hr />
                <Text>
                  Send BNB (e.g. from{' '}
                  <a href="https://www.coinbase.com" target="_blank" rel="noreferrer">
                    Coinbase
                  </a>
                  ) to your BSC Metamask wallet
                </Text>
                <hr />
                <Text>Use BNB below to get and stake COT+BNB to earn APY</Text>
                <hr />
              </div>
              <div className="bottom">
                <Text>Note the price of COT in USD. It goes up as people go for APY
                <br />
                  Sometimes COT is cheaper on Ethereum exchanges like{' '}
                  <a style={{textDecoration:'underline'}} href="https://app.1inch.io/#/1/swap/ETH/COT" target="_blank" rel="noreferrer">
                    1INCH
                  </a>
                  <br />
                  You can bring COT from Ethereum to BSC using{' '}
                  <a style={{textDecoration:'underline'}} href="https://burgerswap.org/transit" target="_blank" rel="noreferrer">
                    BurgerSwap
                  </a>{' '}
                  bridge
                </Text>
              </div>
            </ModalContent>
          <Button style={{margin: "auto",display:"block" }} variant="tertiary" scale="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      
     
      
    </Modal>
  )
}

export default HowToDepositModal
