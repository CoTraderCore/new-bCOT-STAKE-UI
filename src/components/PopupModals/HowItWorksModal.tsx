import React from 'react'
import {  Text, Modal, Button } from 'cofetch-uikit'
import styled from 'styled-components'

type HowItWorksModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null



const HowItWorksModal = ({ onDismiss = defaultOnDismiss, translateString }: HowItWorksModalProps) => {
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
    <Modal title={TranslateString(1202, 'How it works')} onDismiss={onDismiss}>
      
        <Flex  >
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="middle">
                <Text>Converts BNB to bCOT from CoSwap & LGE
                <p >
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
                <Text>1) Use &quot;Claim&quot; to get bCOT, which you can redeposit with more BNB to earn more APY. If you do this daily, you can compound up to ~2.7x more APY
                </Text>
                <br />
                <Text>
2) Use &quot;Withdraw&quot; to stop earning APY 
</Text>
                <br />
                <Text>
3) Withdraw gives you back COS-v2. You&apos;ll need to go to <a style={{textDecoration:'underline'}} href="https://swap.cotrader.com/#/swap" target="_blank" rel="noreferrer">swap.cotrader.com</a>, 
&quot;Liquidity&quot; tab, and &quot;Remove&quot;, to use COS to get back bCOT+BNB tokens.</Text>
              </div>
            </ModalContent>
          <Button variant="tertiary" scale="sm" style={{margin: "auto",display:"block" }} onClick={onDismiss}>
            Close
          </Button>
        </Flex>      
    </Modal>
  )
}

export default HowItWorksModal
