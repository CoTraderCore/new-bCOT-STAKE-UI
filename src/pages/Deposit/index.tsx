import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount } from '@pancakeswap-libs/sdk'
import { ethers } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CardBody, Button, Text } from '@pancakeswap-libs/uikit'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import RoverInputPanel from 'components/RoverInputPanel'
import CardNav from 'components/CardNav'
import { AutoRow } from 'components/Row'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import { BottomGrouping, Wrapper } from 'components/swap/styleds'
import TokenWarningModal from 'components/TokenWarningModal'
import SyrupWarningModal from 'components/SyrupWarningModal'
import { parseEther } from '@ethersproject/units'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'

import ProgressSteps from 'components/ProgressSteps'
import {
  tryParseAmount,
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from 'state/swap/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Loader from 'components/Loader'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'

import Web3 from 'web3'
import ConnectWalletButton from 'components/ConnectWalletButton'
import AppBody from '../AppBody'
import {
  useDepositerContract,
  useDexFormulaContract,
  useRouterContract,
  useStakeContract,
  useTokenContract,
} from '../../hooks/useContract'
import {
  ClaimableAddress,
  NonClaimableAddress,
  AddressDepositor,
  DEXFormulaAddress,
  RouterAddress,
  RoverAddress,
} from '../../constants/address/address'

import '../../App.css'
import { UNDERLYING_NAME } from '../../constants'
import pair from '../../config/config'

const Deposit = () => {
  let web3 = new Web3()
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'))
  }

  const inputCurrency = useCurrency('BNB')
  const UNDERLYING_TOKEN = RoverAddress
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()
  const contract = useDepositerContract(AddressDepositor)
  const DexFormula = useDexFormulaContract(DEXFormulaAddress)
  const Router = useRouterContract(RouterAddress)
  const loadedUrlParams = useDefaultsFromURLSearch()
  const TranslateString = useI18n()
  const [isClaimable, setIsClaimable] = useState(true)
  const [roverBalance, setRoverBalance] = useState('')
  const roverTokenContract = useTokenContract(RoverAddress)
  const ClaimableStakeContract = useStakeContract(ClaimableAddress)
  const NonClaimableStakeContract = useStakeContract(NonClaimableAddress)

  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [isSyrup, setIsSyrup] = useState<boolean>(false)
  const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const handleConfirmSyrupWarning = useCallback(() => {
    setIsSyrup(false)
    setSyrupTransactionType('')
  }, [])

  // const [isExpertMode] = useExpertModeManager()

  // const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, typedValue2, earnedRewards, poolAmount: calculatedPoolAmount } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError, inputErrorDeposit } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const {
    onCurrencySelection,
    onUserInput,
    onUserInput2,
    onChangeEarnedRewards,
    onChangePoolAmount,
  } = useSwapActionHandlers()
  const isValid = !inputError && !inputErrorDeposit
  // const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  //   const changedIsClaimable = e.currentTarget.value === 'true'
  // const earned = await (changedIsClaimable
  //   ? ClaimableStakeContract
  //   : NonClaimableStakeContract
  // )?.earnedByShare(calculatedPoolAmount)

  // onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))

  useEffect(() => {
    async function getRoverBalance() {
      if (account && roverTokenContract) {
        const amount = await roverTokenContract.balanceOf(account)
        const stringAmount = BigNumber.from(amount._hex).toString()
        const displayAmount = ethers.utils.formatEther(stringAmount)
        setRoverBalance(parseFloat(displayAmount).toFixed(4))
      }
    }

    async function getEarnedRewards() {
      if (account && calculatedPoolAmount) {
        const earned =  await (isClaimable ? ClaimableStakeContract : NonClaimableStakeContract) ?.earnedByShare(
          calculatedPoolAmount
        )
        onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))
      }
    }

 
    getRoverBalance()
    getEarnedRewards()
   
  }, [account, roverTokenContract,ClaimableStakeContract,NonClaimableStakeContract,calculatedPoolAmount,isClaimable,onChangeEarnedRewards,web3.utils])


  const handleTypeInput = useCallback(
    async (value: string) => {
      if (DexFormula && Router) {
        const addressTemp = await Router.WETH()
        if (tryParseAmount(value, inputCurrency ?? undefined)) {
          onUserInput(Field.INPUT, value)
          const BNBAmountHalf = BigNumber.from(web3.utils.toWei(value)).div(2).toString()
          const UnderlyingAmount = await DexFormula.routerRatio(addressTemp, UNDERLYING_TOKEN, web3.utils.toWei(value))
          const UnderlyingAmountForRewards = await DexFormula.routerRatio(addressTemp, UNDERLYING_TOKEN, BNBAmountHalf)
          if (roverBalance !== '' && roverBalance !== '0') {
            onUserInput2(Field.INPUT2, parseFloat(web3.utils.fromWei(UnderlyingAmount.toString())).toFixed(6))
            const poolAmount = await DexFormula.calculatePoolToMint(
              web3.utils.toWei(value),
              web3.utils.toWei(UnderlyingAmount.toString()),
              pair
            )
            const earned = await (isClaimable ? ClaimableStakeContract : NonClaimableStakeContract)?.earnedByShare(
              poolAmount
            )
            onChangePoolAmount(poolAmount)

            onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))
          } else {
            // we don't have rover
            const poolAmount = await DexFormula.calculatePoolToMint(BNBAmountHalf, UnderlyingAmountForRewards, pair)
            const earned = await (isClaimable ? ClaimableStakeContract : NonClaimableStakeContract)?.earnedByShare(
              poolAmount
            )

            onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))
          }
        } else {
          onUserInput(Field.INPUT, value)
          onUserInput2(Field.INPUT2, '0')
        }
      }
    },
    [
      onChangePoolAmount,
      onChangeEarnedRewards,
      onUserInput,
      onUserInput2,
      DexFormula,
      Router,
      web3.utils,
      UNDERLYING_TOKEN,
      inputCurrency,
      ClaimableStakeContract,
      NonClaimableStakeContract,
      isClaimable,
      roverBalance,
    ]
  )

  const handleTypeInput2 = useCallback(
    async (value: string) => {
      if (DexFormula && Router) {
        // const display = web3.utils.toWei(value)
        const addressTemp = await Router.WETH()
        if (tryParseAmount(value, inputCurrency ?? undefined)) {
          // const BNBAmountHalf = web3.utils.toWei(BigNumber.from(value).div(2).toString())
          // const UnderlyingAmountForRewards = await DexFormula.routerRatio(addressTemp, UNDERLYING_TOKEN, BNBAmountHalf)

          onUserInput2(Field.INPUT2, value)
          const bnbAmount = await DexFormula.routerRatio(UNDERLYING_TOKEN, addressTemp, web3.utils.toWei(value))
          onUserInput(Field.INPUT, parseFloat(web3.utils.fromWei(bnbAmount.toString())).toFixed(6))
          const poolAmount = await DexFormula.calculatePoolToMint(
            web3.utils.toWei(bnbAmount.toString()),
            web3.utils.toWei(value),
            pair
          )
          const earned = await (isClaimable ? ClaimableStakeContract : NonClaimableStakeContract)?.earnedByShare(
            poolAmount
          )

          onChangePoolAmount(poolAmount)
          onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))
        } else {
          onUserInput2(Field.INPUT2, value)
          onUserInput(Field.INPUT, '0')
        }
      }
    },
    [
      onChangePoolAmount,
      onChangeEarnedRewards,
      onUserInput,
      onUserInput2,
      DexFormula,
      Router,
      web3.utils,
      UNDERLYING_TOKEN,
      inputCurrency,
      ClaimableStakeContract,
      NonClaimableStakeContract,
      isClaimable,
    ]
  )

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ''
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  // }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallback(
    new TokenAmount(
      new Token(ChainId.BSCTESTNET, UNDERLYING_TOKEN, 0),
      web3.utils.toWei(typedValue2 === '' ? '0' : typedValue2)
    ),
    AddressDepositor
  )
  // const hey=useApproveCallback(typedValue2 as unknown as CurrencyAmount, RouterAddress)
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const maxAmountInput2: string = roverBalance
  // const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))
  // const atMaxAmountInput2 = Boolean(maxAmountInput2 && parsedAmounts[Field.INPUT2]?.equalTo(maxAmountInput2))
  // const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  // // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !inputError &&
    !inputErrorDeposit &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED))

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    // console.log(Token)
    // console.log(inputError)
    // console.log(inputError)
    // console.log(approval)
    // console.log(ApprovalState.PENDING)
    // console.log(ApprovalState.NOT_APPROVED)

    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted, showApproveFlow, inputError, inputErrorDeposit])

  //   useLayoutEffect(() => {
  //     return () => {
  //        typedValue2='0'
  //     }
  // }, [])
  // This will check to see if the user has selected Syrup to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForSyrup = useCallback(
    (selected: string, purchaseType: string) => {
      if (selected === 'syrup') {
        setIsSyrup(true)
        setSyrupTransactionType(purchaseType)
      }
    },
    [setIsSyrup, setSyrupTransactionType]
  )

  const handleInputSelect = useCallback(
    (inputCurrencySelect) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrencySelect)
      if (inputCurrencySelect.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(inputCurrencySelect.symbol.toLowerCase(), 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForSyrup]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      handleTypeInput(maxAmountInput.toExact())
      // onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, handleTypeInput])

  const handleMaxInput2 = useCallback(() => {
    if (maxAmountInput2) {
      handleTypeInput2(maxAmountInput2)
      // onUserInput2(Field.INPUT2, maxAmountInput2)
    }
  }, [maxAmountInput2, handleTypeInput2])

  const handleDeposit = async () => {
    if (account) {
      if (contract != null) {
        try {
          const inputAmount = parseEther(typedValue)
          const txReceipt = await contract.deposit(isClaimable, { value: inputAmount._hex })
          addTransaction(txReceipt)
        } catch (error) {
          console.error('Could not deposit', error)
        }
      }
    } else {
      alert('Please connect to web3')
    }
  }

  const handleDepositWithRover = async () => {
    if (account) {
      if (contract != null) {
        try {
          const bnbAmount = parseEther(typedValue)
          const roverAmount = parseEther(typedValue2)
          // console.log(contract)
          // const finalAmount= web3.utils.toBN(amount._hex)
          // console.log(finalAmount)
          // console.log(typeof finalAmount)
          const txReceipt = await contract.depositETHAndERC20(isClaimable, roverAmount._hex, { value: bnbAmount._hex })
          addTransaction(txReceipt)
        } catch (error) {
          console.error('Could not deposit', error)
        }
      }
    } else {
      alert('Please connect to web3')
    }
  }

  return (
    <>
      <TokenWarningModal
        isOpen={urlLoadedTokens.length > 0 && !dismissTokenWarning}
        tokens={urlLoadedTokens}
        onConfirm={handleConfirmTokenWarning}
      />
      <SyrupWarningModal
        isOpen={isSyrup}
        transactionType={syrupTransactionType}
        onConfirm={handleConfirmSyrupWarning}
      />
      <CardNav activeIndex={0} />
      <AppBody>
        <Wrapper id="swap-page">
          <PageHeader
            title={TranslateString(8, 'Deposit')}
            description={TranslateString(1192, 'Deposit tokens in an instant')}
          />
          <CardBody>
            <AutoColumn gap="md">
              <CurrencyInputPanel
                label={
                  independentField === Field.OUTPUT && !showWrap && trade
                    ? TranslateString(194, 'BNB Amount (estimated)')
                    : TranslateString(76, 'BNB Amount')
                }
                value={typedValue}
                isDeposit
                showMaxButton
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />

              {roverBalance !== '' && roverBalance !== '0' ? (
                <RoverInputPanel
                  label={TranslateString(76, 'Rover Amount')}
                  value={typedValue2}
                  roverBalance={roverBalance}
                  showMaxButton
                  currency={currencies[Field.INPUT2]}
                  onUserInput={handleTypeInput2}
                  onMax={handleMaxInput2}
                  id="swap-currency-input"
                />
              ) : null}
              {/* <AutoColumn justify="space-between">
                <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  {recipient === null && !showWrap && isExpertMode ? (
                    <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                      + Add a send (optional)
                    </LinkStyledButton>
                  ) : null}
                </AutoRow>
              </AutoColumn> */}

              {/* {recipient !== null && !showWrap ? (
                <>
                  <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable={false}>
                      <ArrowDown size="16" color={theme.colors.textSubtle} />
                    </ArrowWrapper>
                    <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                      - Remove send
                    </LinkStyledButton>
                  </AutoRow>
                  <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                </>
              ) : null} */}

              <div className="select-deposit">
                <select
                  onChange={async (e) => {
                    setIsClaimable(e.currentTarget.value === 'true')
                    const changedIsClaimable = e.currentTarget.value === 'true'
                    if(calculatedPoolAmount)
                    {
                      const earned = await (changedIsClaimable
                        ? ClaimableStakeContract
                        : NonClaimableStakeContract
                      )?.earnedByShare(calculatedPoolAmount)
                      
                      if(earned)
                      onChangeEarnedRewards(parseFloat(web3.utils.fromWei(earned.toString())).toFixed(6))
                    }
                    
                  }}
                  className="form-control"
                >
                  <option className="select-option" selected value="true">
                    {' '}
                    Claimable
                  </option>
                  <option value="false">Non-Claimable</option>
                </select>
              </div>
              <div>{isValid && earnedRewards ? `Earned Rewards: ${earnedRewards} ` : null}</div>

              {/* {showWrap ? null : (
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">{TranslateString(1182, 'Price')}</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                      <RowBetween align="center">
                        <Text fontSize="14px">{TranslateString(88, 'Slippage Tolerance')}</Text>
                        <Text fontSize="14px">{allowedSlippage / 100}%</Text>
                      </RowBetween>
                    )}
                  </AutoColumn>
                </Card>
              )} */}
            </AutoColumn>
            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : // <Button disabled={Boolean(wrapInputError)}>Hello</Button>
              showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} width="100%">
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Text mb="4px">{TranslateString(1194, 'Insufficient liquidity for this trade.')}</Text>
                </GreyCard>
              ) : showApproveFlow ? (
                <Button
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  style={{ width: '100%' }}
                  variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                >
                  {approval === ApprovalState.PENDING ? (
                    <AutoRow gap="6px" justify="center">
                      Approving <Loader stroke="white" />
                    </AutoRow>
                  ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                    'Approved'
                  ) : (
                    `Approve ${UNDERLYING_NAME}`
                  )}
                </Button>
              ) : (
                <div>
                  <Button
                    onClick={() =>
                      roverBalance !== '' && roverBalance !== '0' ? handleDepositWithRover() : handleDeposit()
                    }
                    // onClick={() => handleDeposit()}
                    id="deposit-button"
                    disabled={!isValid}
                    variant={!isValid ? 'danger' : 'primary'}
                    width="100%"
                  >
                    {inputError || inputErrorDeposit || 'Deposit'}
                  </Button>
                </div>
              )}
              {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {/* {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}  */}
            </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />
    </>
  )
}

export default Deposit
