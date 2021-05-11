/**
 *
 * Babelfish
 *
 */

import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
// import { SelectNetwork } from './components/SelectNetwork';
// import { WrongNetwork } from './components/WrongNetwork';
import { Deposit } from './components/Deposit';
import babelfish from 'assets/images/babelfish.svg';

interface Props {
  show: boolean;
  onClose: () => void;
}

export function Babelfish(props: Props) {
  return (
    <Dialog isOpen={props.show} className="tw-border-none">
      <div className="tw-flex tw-justify-between tw-mb-4">
        <Button icon="cross" onClick={props.onClose} minimal />
      </div>
      <div className="tw-p-5">
        <div className="tw-container tw-mx-auto tw-px-4 ">
          {/* <SelectNetwork /> */}
          {/* <WrongNetwork /> */}
          <Deposit />
        </div>
        <div className="tw-flex tw-flex-col tw-align-center w-full tw-text-center">
          <img
            src={babelfish}
            alt="babelfish"
            className="tw-mt-4 tw-w-10 mx-auto"
            width="40"
          />
          <p>Powered by BabelFish</p>
        </div>
      </div>
    </Dialog>
  );
}
