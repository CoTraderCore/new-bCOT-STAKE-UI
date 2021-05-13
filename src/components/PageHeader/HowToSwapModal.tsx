import React from 'react'
import {  Flex, Text, Modal, Button } from 'cofetch-uikit'
import styled from 'styled-components'

type HowToSwapModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null



const HowToSwapModal = ({ onDismiss = defaultOnDismiss, translateString }: HowToSwapModalProps) => {
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
    <Modal title={TranslateString(1202, 'How it works')} onDismiss={onDismiss}>
      
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="middle">
                <Text>Converts BNB to bCOT from CoSwap & LGE
                <p>
                0x73e982461370EB6E89aebEc687BA40524412610e
                </p>
                </Text>
                <hr />
                <Text>Buys 20% bCOT in our <a  href="https://swap.cotrader.com/#/swap" target="_blank" rel="noreferrer">CoSwap</a>
                <p>
                0xf1B735685416253A8F7c8a6686970cA2B0cceCce
                </p>
                </Text>
                <hr />
                <Text>Buys 80% bCOT in LGE to lower slippage
                <p>
                0x07Ca031835A05628104B957f5A80B627B6d51FC0
                </p>
                </Text>
                <hr />
                <Text>Stake COTBNB Liquidity Provider (LP) pool tokens COS-v2
                <p>
                0xe72a8D9eee7d01bead1766dF312655828cFd837D
                </p>
                </Text>
                <hr />
              </div>
              <div className="bottom">
                <Text>1) Use &quot;Claim&quot; to get bCOT, which you can redeposit with more BNB to earn more APY.<br />If you do this daily, you can compound up to ~2.7x more APY
                </Text>
                <br />
                <Text>
2) Use &quot;Withdraw&quot; to stop earning APY 
</Text>
                <br />
                <Text>
3) Withdraw gives you back COS-v2. You&apos;ll need to go to <a style={{textDecoration:'underline'}} href="https://swap.cotrader.com/#/swap" target="_blank" rel="noreferrer">swap.cotrader.com</a>,<br /> 
&quot;Liquidity&quot; tab, and &quot;Remove&quot;, to use COS to get back bCOT+BNB tokens.</Text>
              </div>
            </ModalContent>
          <Button variant="tertiary" scale="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      
     
      
    </Modal>
  )
}

export default HowToSwapModal
