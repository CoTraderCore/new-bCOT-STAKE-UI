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
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: center;
  z-index: 10;
  border-radius: 10px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left:10%;
  line-height: 1.8;
  color: #141414;
  h1 {
    font-size: 30px; // makes font size 100px
  }
  p {
    margin-bottom: 1rem;
  }
`

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <Background
          onClick={() => {
            setShowModal(false)
          }}
        >
          <ModalWrapper>
            <CloseIcon style={{ marginLeft: '95%', marginTop: '2%' }} onClick={() => setShowModal((prev) => !prev)} />
            <ModalContent>
              <h1>1-Step Simple - Total DeFi</h1>
              <h3>Converts BNB to COT from Pancake</h3>
              <h3>Buys 20% COT in our CoSwap</h3>
              <h3>Buys 80% COT in LGE to lower slippage</h3>
              <h3>Stake COTBNB Liquidity Provider (LP) pool tokens COS-v2</h3>
              <p>{`Use "Claim" to get bCOT, which you can redeposit with more BNB to earn more APY. If you do this daily, you can compound up to ~2.7x more APY
                `}</p>
              <p>{`
Use "Withdraw" to stop earning APY 
`}</p>
              <p>{`
Withdraw gives you back COS-v2. You'll need to go to swap.cotrader.com, "Liquidity" tab, and "Remove", to use COS to get back bCOT+BNB tokens.`}</p>
            </ModalContent>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default Modal
