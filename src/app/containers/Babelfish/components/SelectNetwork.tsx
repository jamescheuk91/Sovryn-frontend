/**
 *
 * SelectNetwork
 *
 */

import logo from '../logo.svg';
import React from 'react';

interface Props {}

export function SelectNetwork(props: Props) {
  return (
    <div>
      <h4 className="tw-text-white tw-mb-10">Select Deposit Network</h4>
      <div></div>
    </div>
  );
}
interface ItemProps {
  title: string;
  image: string;
}

export function Item({ title, image }: ItemProps) {
  return (
    <div className="tw-flex tw-flex-col tw-items-center">
      <img src={logo} alt="MetaMask" className="tw-mb-4" />
      <span>{title}</span>
    </div>
  );
}
