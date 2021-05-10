/**
 *
 * Babelfish
 *
 */

import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { SelectNetwork } from './components/SelectNetwork';

interface Props {
  show: boolean;
  onClose: () => void;
}

export function Babelfish(props: Props) {
  return (
    <Dialog isOpen={props.show} className="tw-p-4 tw-border-none">
      <div className="tw-container tw-mx-auto tw-px-4">
        <SelectNetwork />
      </div>
    </Dialog>
  );
}
