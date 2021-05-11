/**
 *
 * SelectNetwork
 *
 */

import React from 'react';
import ethNetwork from 'assets/images/network/eth.svg';
import bscNetwork from 'assets/images/network/bsc.svg';
import styled from 'styled-components';

interface Props {}

export function SelectNetwork(props: Props) {
  return (
    <div>
      <h4 className="tw-text-white tw-mb-10 tw-text-center">
        Select Deposit Network
      </h4>
      <div className="tw-flex tw-justify-between tw-my-10">
        <NetworkItem title="ETH Network" image={ethNetwork} />
        <NetworkItem title="BSC Network" image={bscNetwork} />
      </div>
    </div>
  );
}
interface ItemProps {
  title: string;
  image: string;
}

export function NetworkItem({ title, image }: ItemProps) {
  return (
    <NetworkButton className="tw-flex tw-flex-col tw-items-center tw-justify-around mx-4">
      <img src={image} alt={title} />
      <span>{title}</span>
    </NetworkButton>
  );
}

const NetworkButton = styled.button`
  width: 160px;
  height: 160px;
  padding: 15px;
  transition: opacity 0.5s, border-color 0.5s;
  cursor: pointer;
  border: 1px solid #e9eae9;
  border-radius: 20px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;
