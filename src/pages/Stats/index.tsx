import React, { useEffect, useState } from 'react'
import { CardBody} from 'cofetch-uikit'
import CardNav from 'components/CardNav'
import {  BottomGrouping, Wrapper } from 'components/swap/styleds'

import Web3 from 'web3'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ClaimableAddress, DEXFormulaAddress, NonClaimableAddress, bCOTAddress, UNDERLYING_Pool } from 'constants/address/address'
import { useActiveWeb3React } from 'hooks'
import { useStakeContract, useTokenContract, useDexFormulaContract } from 'hooks/useContract'
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
  const DexFormula = useDexFormulaContract(DEXFormulaAddress)
  const tokenContract = useTokenContract(ClaimableAddress)
  const [poolBalance,setPoolBalance]=useState(null)
  const [displayClaimableEarned, setDisplayClaimableEarned] = useState('0')
  const [displayTotalDeposited, setDisplayTotalDeposited] = useState('0')
  const [displayPoolConnectorsCOT, setDisplayPoolConnectorsCOT] = useState('0')
  const [displayPoolConnectorsBNB, setDisplayPoolConnectorsBNB] = useState('0')''
  const [displayPoolConnectorsCOTAddress, setDisplayPoolConnectorsCOTAddress] = useState('0x..')
  const [displayPoolConnectorsBNBAddress, setDisplayPoolConnectorsBNBAddress] = useState('0x..')

  let web3 = new Web3()
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'))
  }

//   useEffect(() => {
//     async function getPoolBalance(){
//     if(account && tokenContract)
//     {
//       const amount = await tokenContract.balanceOf(account)
//       setPoolBalance(amount)
//     }
//     }
//     getPoolBalance();
// }, [account,tokenContract]);

  useEffect(() => {
    async function totalDepositedAmount(){
    if(account && DexFormula && tokenContract)
    {
      try{
        let poolAmount = await tokenContract.balanceOf(account)
        //poolAmount='1000000000'
        setPoolBalance(poolAmount)
        // console.log(poolAmount)
        const totalDeposit=await DexFormula.convertPoolConnectorsToDestanationToken(
          UNDERLYING_Pool,
          bCOTAddress,
          poolAmount
        )
        // console.log(totalDeposit)
        const poolConnectors=await DexFormula.getConnectorsAmountByPoolAmount(
          poolAmount,
          UNDERLYING_Pool
        )

        console.log(poolConnectors)
        if(totalDeposit)
        setDisplayTotalDeposited(parseFloat(web3.utils.fromWei(totalDeposit.toString())).toFixed(6))

        if(poolConnectors)
        {

        setDisplayPoolConnectorsCOT(parseFloat(web3.utils.fromWei(poolConnectors[0].toString())).toFixed(6))
        setDisplayPoolConnectorsBNB(parseFloat(web3.utils.fromWei(poolConnectors[1].toString())).toFixed(6))
        setDisplayPoolConnectorsCOTAddress(poolConnectors[2])
        setDisplayPoolConnectorsBNBAddress(poolConnectors[3])

        }
      }
      catch(e)
      {
        // console.log(e)
      }
     
    }
    }
    totalDepositedAmount();
}, [account,poolBalance,DexFormula,tokenContract,web3.utils]);


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
      <CardNav activeIndex={3} />
      <AppBody>
        <Wrapper id="swap-page">

          <PageHeader
            title={TranslateString(8, 'Stats')}
            description={TranslateString(1192, 'Your stake stats')}
          />
          <CardBody>

            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : <div>
                <span>Earned: {Number(displayClaimableEarned).toFixed(2)} {UNDERLYING_NAME}</span>
                <br/>
                <span>Total Deposit: {Number(displayTotalDeposited).toFixed(2)} {UNDERLYING_NAME}</span>
                <br/>
                <span>Pool Connectors: {Number(displayPoolConnectorsCOT).toFixed(2)} {UNDERLYING_NAME}</span>
                <br/>
                <span>Pool Connectors: {Number(displayPoolConnectorsBNB).toFixed(2)} BNB</span>
              </div>
              }
                </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
    </>
  )
}

export default Stats
