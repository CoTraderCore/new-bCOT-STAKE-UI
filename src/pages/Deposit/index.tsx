import { CurrencyAmount, JSBI, Token } from '@pancakeswap-libs/sdk'
import { ethers } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CardBody, Button, Text, Checkbox, Input } from '@pancakeswap-libs/uikit'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import RoverInputPanel from 'components/RoverInputPanel'
import CardNav from 'components/CardNav'
import { AutoRow, RowBetween } from 'components/Row'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import { BottomGrouping, Wrapper } from 'components/swap/styleds'
import TokenWarningModal from 'components/TokenWarningModal'
import SyrupWarningModal from 'components/SyrupWarningModal'
import { parseEther } from '@ethersproject/units'

import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance } from 'state/user/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import Loader from 'components/Loader'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'

import ConnectWalletButton from 'components/ConnectWalletButton'
import AppBody from '../AppBody'
import { useDepositerContract, useTokenContract } from '../../hooks/useContract'
import { AddressDepositor, RoverAddress } from '../../constants/address/address'
import RoverTabs from '../RoverTabs'

import '../../App.css'

const Deposit = () => {
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()
  const contract = useDepositerContract(AddressDepositor)
  const loadedUrlParams = useDefaultsFromURLSearch()
  const TranslateString = useI18n()
  const [isClaimable, setIsClaimable] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [roverValue, setRoverValue] = useState('')
  const [roverBalance, setRoverBalance] = useState('')
  const tokenContract = useTokenContract(RoverAddress)
  useEffect(() => {
    async function getRoverBalance() {
      if (account && tokenContract) {
        const amount = await tokenContract.balanceOf(account)
        const stringAmount = BigNumber.from(amount._hex).toString()
        const displayAmount = ethers.utils.formatEther(stringAmount)
        setRoverBalance(parseFloat(displayAmount).toFixed(4))
      }
    }
    getRoverBalance()
  }, [account, tokenContract])
  // token warning stuff
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

  const [isExpertMode] = useExpertModeManager()

  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError } = useDerivedSwapInfo()
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

  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const isValid = !inputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )

  const handleTypeInput2 = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT2, value)
    },
    [onUserInput]
  )

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const maxAmountInput2: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT2])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))
  const atMaxAmountInput2 = Boolean(maxAmountInput2 && parsedAmounts[Field.INPUT2]?.equalTo(maxAmountInput2))
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !inputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

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
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(inputCurrency.symbol.toLowerCase(), 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForSyrup]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleMaxInput2 = useCallback(() => {
    if (maxAmountInput2) {
      onUserInput(Field.INPUT2, maxAmountInput2.toExact())
    }
  }, [maxAmountInput2, onUserInput])

  const handleDeposit = async () => {
    if (account) {
      if (contract != null) {
        try {
          const inputAmount = parseEther(formattedAmounts[Field.INPUT].toString())
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
                value={formattedAmounts[Field.INPUT]}
                isDeposit
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />

              {roverBalance !== '' && roverBalance !== '0' ? (
                <RoverInputPanel
                  label={
                    TranslateString(76, 'Rover Amount')
                  }
                  value={formattedAmounts[Field.INPUT2]}
                  roverBalance={roverBalance}
                  isDeposit
                  showMaxButton={!atMaxAmountInput2}
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
                <select onChange={(e) => setIsClaimable(e.currentTarget.value === 'true')} className="form-control">
                  <option className="select-option" selected value="true">
                    {' '}
                    Claimable
                  </option>
                  <option value="false">Non-Claimable</option>
                </select>
              </div>

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
                  1
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Text mb="4px">{TranslateString(1194, 'Insufficient liquidity for this trade.')}</Text>
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <Button
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    style={{ width: '48%' }}
                    variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  >
                    2
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        Approving <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      'Approved'
                    ) : (
                      `Approve ${currencies[Field.INPUT]?.symbol}`
                    )}
                  </Button>
                  {/* <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{ width: '48%' }}
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  >
                    3
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? `Price Impact High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Button> */}
                </RowBetween>
              ) : (
                <Button
                  onClick={() => handleDeposit()}
                  id="deposit-button"
                  disabled={!isValid}
                  variant={!isValid ? 'danger' : 'primary'}
                  width="100%"
                >
                  {inputError || 'Deposit'}
                </Button>
              )}
              {/* {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null} */}
            </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />
    </>
  )
}

export default Deposit
