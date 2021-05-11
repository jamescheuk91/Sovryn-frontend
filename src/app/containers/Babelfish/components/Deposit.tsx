/**
 *
 * Deposit
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import image from 'assets/images/big-arrow-right.svg';
import { SwapAssetSelector } from 'app/containers/SwapFormContainer/components/SwapAssetSelector/Loadable';
import { Asset } from 'types/asset';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import cn from 'classnames';

import { AssetRenderer } from 'app/components/AssetRenderer';
import { Input } from 'form/Input';
import { AmountInput } from 'form/AmountInput';
import { FormGroup } from 'form/FormGroup';
import { AssetsDictionary } from 'utils/dictionaries/assets-dictionary';
import { AvailableBalance } from 'app/components/AvailableBalance';

interface Props {}

const Img = styled.img`
  width: 82px;
  height: 82px;
`;

const sourceOptions = [
  {
    key: Asset.USDT,
    label: AssetsDictionary.get(Asset.USDT).symbol,
  },
  {
    key: Asset.DOC,
    label: AssetsDictionary.get(Asset.DOC).symbol,
  },
];

export function Deposit() {
  const { t } = useTranslation();
  const [loading] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [depositToken, setDepositToken] = useState(Asset.DOC);

  return (
    <div>
      <h4 className="tw-text-white tw-text-xl tw-mb-4 tw-text-center">
        Deposit to Sovryn from ETH Network
      </h4>
      <div className="tw-w-full tw-flex tw-items-center">
        <div className="tw-flex-1">
          <SwapAssetSelector
            value={depositToken}
            items={sourceOptions}
            placeholder={'select Deposit token'}
            onChange={value => setDepositToken(value.key)}
          />
          <div className="tw-mb-6 tw-mt-2">
            <AvailableBalance asset={depositToken} />
          </div>

          <FormGroup
            label={t(translations.marginTradePage.tradeForm.labels.amount)}
          >
            <AmountInput
              value={amount}
              onChange={value => setAmount(value)}
              asset={depositToken}
            />
          </FormGroup>
        </div>
        <Img src={image} alt="Next step" />
        <div className="tw-flex-1">
          <div className="tw-text-base tw-mb-1">
            {t(translations.spotTradingPage.tradeForm.amountReceived)}:
          </div>
          <Input
            value={'10000.0'}
            onChange={value => setAmount(value)}
            readOnly={true}
            appendElem={<AssetRenderer asset={depositToken} />}
          />
          <span>Gas Fee: 0.0002 ETH</span>

          <StyledButton
            className={cn({ loading })}
            onClick={() => {}}
            disabled={loading}
          >
            DEPOSIT
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

const StyledButton = styled.button`
  height: 50px;
  width: 100%;
  min-width: 200px;
  margin-top: 0;
  border: 1px solid #fec004;
  padding: 11px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 10px;
  text-transform: none;
  line-height: 1;
  transition: background 0.3s;
  background: #fec004;
  border-radius: 8px;
  color: #000000;
  text-transform: uppercase;

  &:hover {
    background: #edb305;
  }
`;
