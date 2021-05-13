import React from 'react'
import {  Flex, Text, Modal, Button } from 'cofetch-uikit'
import styled from 'styled-components'

type HowToDepositModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null



const HowToDepositModal = ({ onDismiss = defaultOnDismiss, translateString }: HowToDepositModalProps) => {
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
  margin-left:20%;
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
    <Modal title={TranslateString(1202, 'How To Deposit')} onDismiss={onDismiss}>
      
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="middle">
                <span>
                  Get{' '}
                  <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank" rel="noreferrer">
                    Metamask.io
                  </a>{' '}
                  and configure it for BSC
                </span>
                <hr />
                <span>
                  Send BNB (e.g. from{' '}
                  <a href="https://www.coinbase.com" target="_blank" rel="noreferrer">
                    Coinbase
                  </a>
                  ) to your BSC Metamask wallet
                </span>
                <hr />
                <span>Use BNB below to get and stake COT+BNB to earn APY</span>
                <hr />
              </div>
              <div className="bottom">
                <span>Note the price of COT in USD. It goes up as people go for APY
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
                </span>
              </div>
            </ModalContent>
          <Button variant="tertiary" scale="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      
     
      
    </Modal>
  )
}

export default HowToDepositModal
