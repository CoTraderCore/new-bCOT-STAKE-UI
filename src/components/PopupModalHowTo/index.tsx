import React from 'react'

import styled from 'styled-components'
import { CloseIcon } from 'cofetch-uikit'

const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const ModalWrapper = styled.div`
  width: 450px;
  height: 480px;
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
  margin-top:-80px;
  border-radius: 10px;
  background: #ffffff;
  .header {
    fontweight: bold;
    font-size: 25px;
    margin-left: 30%;
    margin-bottom: 5%;
    padding: 10px;
  }

  .middle {
    padding: 25px;
  }

  .middle span p {
    font-size: 12px;
    padding-top: 5px;
  }

  .bottom {
    padding: 10px;
    font-size: 15px;
  }

  hr {
    border-top: 1px rgba(255, 0, 0, 0.1);
    width: 320px;
    height: 1px;
    margin-left: 1px;
    background-color: #483d8b;
  }

  .middle a {
    background-color: #dec4ff;
  }

  font-family: calibri;
  color: #483d8b;
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
            <CloseIcon
              style={{ marginLeft: '92%', marginTop: '3%', cursor: 'pointer' }}
              onClick={() => setShowModal((prev) => !prev)}
            />
            <ModalContent>
              <div className="header">How to Stake</div>
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
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default Modal
