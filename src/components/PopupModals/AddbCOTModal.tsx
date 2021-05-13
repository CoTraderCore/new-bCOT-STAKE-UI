import React from 'react'
import {  Flex, Text, Modal, Button } from 'cofetch-uikit'
import styled from 'styled-components'

type AddbCOTModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => (string)
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null



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
  margin-left:15%;
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
    <Modal title={TranslateString(1202, 'BSC COT token')} onDismiss={onDismiss}>
      
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <ModalContent>
              <div className="header">1-Step Simple - Total DeFi</div>
              <div className="bottom">
                <Text>
                Can be changed to ETH COT using BurgerSwap.<br/> Click address to add it to your Metamask:
                <p>
                0x304fC73e86601a61a6C6db5B0eAfEA587622acdC
                </p>
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
