import React, { useEffect, useState } from 'react';
import { useAssetBalanceOf } from '../../../hooks/useAssetBalanceOf';
import { useAccount, useIsConnected } from '../../../hooks/useAccount';
import { useWeiAmount } from '../../../hooks/useWeiAmount';
import { useApproveAndBorrow } from '../../../hooks/trading/useApproveAndBorrow';
import { useIsAmountWithinLimits } from '../../../hooks/useIsAmountWithinLimits';
import TabContainer from '../components/TabContainer';
import '../assets/index.scss';
import { Asset } from '../../../../types/asset';
import { useSovryn_getRequiredCollateral } from '../../../hooks/protocol/useSovryn_getRequiredCollateral';
import { useApproveAndCloseWithDeposit } from '../../../hooks/trading/useApproveAndCloseWithDeposit';
import { useLending_transactionLimit } from '../../../hooks/lending/useLending_transactionLimit';
import { weiTo18 } from '../../../../utils/blockchain/math-helpers';
import { useLending_balanceOf } from '../../../hooks/lending/useLending_balanceOf';
import { useGetActiveLoans } from '../../../hooks/trading/useGetActiveLoans';

type Props = {
  currency: Asset;
};

const BorrowingContainer: React.FC<Props> = ({ currency }) => {
  const [amount, setAmount] = useState<string>('');
  const isConnected = useIsConnected();
  const weiAmount = useWeiAmount(amount);

  const onChangeAmount = (e: string) => {
    setAmount(e);
  };

  const currencyBalance = currency === Asset.BTC ? Asset.DOC : Asset.BTC;
  const { value: userBalance } = useAssetBalanceOf(currencyBalance as Asset);

  const { value } = useGetActiveLoans(
    useAccount(),
    0,
    1000,
    2, // must be 2 for borrow loans
    false,
    false,
  );

  const principalUserToken = value.reduce(
    (sum, amount) => sum + Number(amount['principal']),
    0,
  );

  const onMaxChange = (type: string) => {
    let amount = '0';
    if (type === 'Borrow') {
      amount = String((userBalance * 100) / 150.2);
    } else if (type === 'Repay') {
      amount = String(principalUserToken);
    }
    setAmount(weiTo18(amount));
  };

  // BORROW
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [borrowAmount, setBorrowAmount] = useState('0');
  useEffect(() => {
    // @ts-ignore
    setBorrowAmount(weiAmount);
  }, [amount, weiAmount]);

  const tokenToBorrow = currency;

  const tokenToCollarate = currency === Asset.BTC ? Asset.DOC : Asset.BTC;
  const initialLoanDuration = 60 * 60 * 24 * 10; // 10 days
  const { value: collateralTokenSent } = useSovryn_getRequiredCollateral(
    tokenToBorrow,
    tokenToCollarate,
    borrowAmount,
    '50000000000000000000',
    true,
  );

  const { borrow, ...txStateBorrow } = useApproveAndBorrow(
    tokenToBorrow,
    tokenToCollarate,
    borrowAmount,
    collateralTokenSent,
    initialLoanDuration.toString(),
  );

  const {
    closeWithDeposit,
    ...txStateCloseWithDeposit
  } = useApproveAndCloseWithDeposit(
    currency,
    tokenToCollarate,
    borrowAmount,
    useAccount(),
    amount,
  );

  const { value: tokenBalance } = useAssetBalanceOf(tokenToCollarate);

  const handleSubmitBorrow = () => {
    borrow();
  };
  const handleSubmitCloseWithDeposit = () => {
    closeWithDeposit();
  };
  const valid = useIsAmountWithinLimits(weiAmount, '1', tokenBalance);

  const { value: maxAmount } = useLending_transactionLimit(currency, currency);

  return (
    <TabContainer
      setBorrowAmount={setBorrowAmount}
      onMaxChange={onMaxChange}
      txState={
        txStateBorrow.status !== 'none' && txStateBorrow.loading
          ? txStateBorrow
          : txStateCloseWithDeposit
      }
      isConnected={isConnected}
      valid={valid}
      leftButton="Borrow"
      rightButton="Repay"
      amountValue={amount}
      onChangeAmount={onChangeAmount}
      handleSubmit={handleSubmitBorrow}
      handleSubmitRepay={handleSubmitCloseWithDeposit}
      currency={currency}
      amountName="Borrow Amount"
      maxValue={maxAmount}
    />
  );
};

export default BorrowingContainer;
