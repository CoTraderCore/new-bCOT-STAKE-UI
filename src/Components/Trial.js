// import { CurrencyAmount, JSBI, Token, Trade } from "@pancakeswap-libs/sdk";
// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { ArrowDown } from "react-feather";
// import {
//   CardBody,
//   ArrowDownIcon,
//   Button,
//   IconButton,
//   Text,
// } from "@pancakeswap-libs/uikit";
// import { ThemeContext } from "styled-components";
// import AddressInputPanel from "components/AddressInputPanel";
// import Card, { GreyCard } from "components/Card";
// import { AutoColumn } from "components/Column";
// import ConfirmSwapModal from "components/swap/ConfirmSwapModal";
// import CurrencyInputPanel from "components/CurrencyInputPanel";
// import CardNav from "components/CardNav";
// import { AutoRow, RowBetween } from "components/Row";
// import AdvancedSwapDetailsDropdown from "components/swap/AdvancedSwapDetailsDropdown";
// import confirmPriceImpactWithoutFee from "components/swap/confirmPriceImpactWithoutFee";
// import {
//   ArrowWrapper,
//   BottomGrouping,
//   SwapCallbackError,
//   Wrapper,
// } from "components/swap/styleds";
// import TradePrice from "components/swap/TradePrice";
// import TokenWarningModal from "components/TokenWarningModal";
// import SyrupWarningModal from "components/SyrupWarningModal";
// import ProgressSteps from "components/ProgressSteps";

// import { INITIAL_ALLOWED_SLIPPAGE } from "constants/index";
// import { useActiveWeb3React } from "hooks";
// import { useCurrency } from "hooks/Tokens";
// import {
//   ApprovalState,
//   useApproveCallbackFromTrade,
// } from "hooks/useApproveCallback";
// import { useSwapCallback } from "hooks/useSwapCallback";
// import useWrapCallback, { WrapType } from "hooks/useWrapCallback";
// import { Field } from "state/swap/actions";
// import {
//   useDefaultsFromURLSearch,
//   useDerivedSwapInfo,
//   useSwapActionHandlers,
//   useSwapState,
// } from "state/swap/hooks";
// import {
//   useExpertModeManager,
//   useUserDeadline,
//   useUserSlippageTolerance,
// } from "state/user/hooks";
// import { LinkStyledButton } from "components/Shared";
// import { maxAmountSpend } from "utils/maxAmountSpend";
// import { computeTradePriceBreakdown, warningSeverity } from "utils/prices";
// import Loader from "components/Loader";
// import useI18n from "hooks/useI18n";
// import PageHeader from "components/PageHeader";
// import ConnectWalletButton from "components/ConnectWalletButton";
// import AppBody from "../AppBody";

// const Swap = () => {
//   return (
//     <>
//       <PageHeader
//         title={TranslateString(8, "Exchange")}
//         description={TranslateString(1192, "Trade tokens in an instant")}
//       />

//       <AutoColumn gap="md">
//         <CurrencyInputPanel />
//       </AutoColumn>
//       <AutoColumn justify="space-between">
//         <AutoRow
        
//           style={{ padding: "0 1rem" }}
//         >
//           <ArrowWrapper clickable>
//             <IconButton
//               variant="tertiary"
//               onClick={() => {
              
//               }}
//               style={{ borderRadius: "50%" }}
//               scale="sm"
//             >
//               <ArrowDownIcon color="primary" width="24px" />
//             </IconButton>
//           </ArrowWrapper>
         
//         </AutoRow>
//       </AutoColumn>
//     </>
//   );
// };
// export default Swap;
