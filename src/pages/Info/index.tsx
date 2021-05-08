import React, { useEffect, useState } from 'react'
import { CardBody} from 'cofetch-uikit'
import CardNav from 'components/CardNav'
import {  BottomGrouping, Wrapper } from 'components/swap/styleds'

import Web3 from 'web3'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ClaimableAddress, NonClaimableAddress } from 'constants/address/address'
import { useActiveWeb3React } from 'hooks'
import { useStakeContract, useTokenContract } from 'hooks/useContract'
import AppBody from '../AppBody'
import { UNDERLYING_NAME } from '../../constants'

import '../../App.css'


const Stats = () => {

  const TranslateString = useI18n()
  const { account } = useActiveWeb3React()
  const claimableTokenContract = useTokenContract(ClaimableAddress)
  const nonClaimableTokenContract = useTokenContract(NonClaimableAddress)
  const ClaimableStakeContract = useStakeContract(ClaimableAddress)
  const NonClaimableStakeContract = useStakeContract(NonClaimableAddress)
  const [displayClaimableEarned, setDisplayClaimableEarned] = useState('0')
  let web3 = new Web3()
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'))
  }

  useEffect(() => {
    async function getPoolBalance(){
    if(account && claimableTokenContract && nonClaimableTokenContract)
    {
      const claimableAmount = await claimableTokenContract.balanceOf(account)
      if(claimableAmount > 0)
      {
        const claimableEarned = await ClaimableStakeContract?.earned(account)
        if(claimableEarned)
        setDisplayClaimableEarned(parseFloat(web3.utils.fromWei(claimableEarned.toString())).toFixed(6))
      }
    }
    }
    getPoolBalance();
}, [account,claimableTokenContract,nonClaimableTokenContract,ClaimableStakeContract,NonClaimableStakeContract,web3.utils]);
  return (
    <>
      <CardNav activeIndex={4} />
      <AppBody>
        <Wrapper id="swap-page">

          <PageHeader
            title={TranslateString(8, 'Instructions')}
            description={TranslateString(1192, 'How to use STAKE page')}
          />
          <CardBody>

            <BottomGrouping>
              <div>
              <span>Get Metamask.io and configure it for BSC

(Use MetaMask For Binance Smart Chain - Binance Chain Docs)2. Send BNB (e.g. from Coinbase) to your BSC Metamask wallet

</span> 
<br/>
<br/>
<br/>
<span>

Use BNB below to get and stake COT+BNB to earn APY

Note the price of COT in USD. It goes up as people go for APY

Sometimes COT is cheaper on Ethereum exchanges like 1INCH

(1inch - DeFi / DEX aggregator on Ethereum & Binance Smart Chain)You can bring COT from Ethereum to BSC using BurgerSwap bridge (BurgerSwap)

</span>

              </div>
                </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
    </>
  )
}

export default Stats
