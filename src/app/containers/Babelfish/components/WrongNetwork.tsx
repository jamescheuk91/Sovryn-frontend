/**
 *
 * WrongNetwork
 *
 */

import React from 'react';
import ethNetwork from 'assets/images/network/eth.svg';
import { NetworkItem } from './SelectNetwork';
import styled from 'styled-components';

interface Props {}

export function WrongNetwork(props: Props) {
  return (
    <div>
      <h4 className="tw-text-white tw-text-xl tw-mb-4 tw-text-center">
        Select ETH Network
      </h4>
      <p className="tw-text-red tw-text-opacity-50">
        We detected that you are on RSK Mainnet Please switch to ETH Mainnet in
        your Metamask wallet
      </p>
      <div className="tw-flex tw-flex-col tw-items-center tw-mt-10 tw-mb-4">
        <NetworkItem title="ETH Network" image={ethNetwork} />
        <a
          className="tw-mt-10 tw-text-center tw-underline tw-text-primary tw-text-sm w-full"
          href="/"
        >
          How to connect to ETH Mainnet with Metamask
        </a>
      </div>
    </div>
  );
}
