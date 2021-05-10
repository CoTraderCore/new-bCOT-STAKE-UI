import React from 'react'

import styled from 'styled-components'
import { CloseIcon } from 'cofetch-uikit'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const ModalWrapper = styled.div`
  width: 400px;
  height: 550px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: center;
  z-index: 10;
  border-radius: 10px;
`

const ModalContent = styled.div`
position: relative;
padding: 8px;
margin: 8px;
margin-top:15px;
background: #FFFFFF;
.header{
  
  fontWeight:bold;
  font-size:25px;
  margin-left:10%;
  margin-bottom:5%;   
  padding:10px
}

.middle{
  padding:25px
}

.middle span p{
  font-size:12px;
  padding-top:5px;
}

.bottom{
  padding:10px;
  font-size:14px;
}

hr {
  border-top: 1px  rgba(255,0,0,.1);
  width: 320px;
  height: 1px;
  margin-left: 1px;
  background-color:#483D8B;
}

a{
  background-color:#dec4ff;
}

 
font-family: calibri;
color: #483D8B;
` 

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? ( 
        <Background
          // onClick={() => {
          //   setShowModal(false)
          // }}
        >
          <ModalWrapper>
            <CloseIcon style={{ marginLeft: '92%', marginTop: '3%',cursor: 'pointer'}}  onClick={() => setShowModal((prev) => !prev)} />
            <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="middle">
                <span>Converts BNB to bCOT from <a href="https://exchange.pancakeswap.finance/#/swap" target="_blank" rel="noreferrer">Pancake</a>
                <p>
                0xE81e92Bf8A02da1937B932d06ea6d1C6E35b7C01
                </p>
                </span>
                <hr />
                <span>Buys 20% bCOT in our <a href="https://swap.cotrader.com/#/swap" target="_blank" rel="noreferrer">CoSwap</a>
                <p>
                0xe72a8D9eee7d01bead1766dF312655828cFd837D
                </p>
                </span>
                <hr />
                <span>Buys 80% bCOT in LGE to lower slippage
                <p>
                0x07Ca031835A05628104B957f5A80B627B6d51FC0
                </p>
                </span>
                <hr />
                <span>Stake COTBNB Liquidity Provider (LP) pool tokens COS-v2
                <p>
                0x73e982461370EB6E89aebEc687BA40524412610e
                </p>
                </span>
                <hr />
              </div>
              <div className="bottom">
                <span>{`1) Use "Claim" to get bCOT, which you can redeposit with more BNB to earn more APY. If you do this daily, you can compound up to ~2.7x more APY
                `}</span>
                <br />
                <br />
                <span>{`
2) Use "Withdraw" to stop earning APY 
`}</span>
                <br />
                <br />
                <span>{`
3) Withdraw gives you back COS-v2. You'll need to go to swap.cotrader.com, "Liquidity" tab, and "Remove", to use COS to get back bCOT+BNB tokens.`}</span>
              </div>
            </ModalContent>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default Modal
