/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Cart_State } from './player';

export default function SuccessPlayer() {
  return (
    <div>
      <lottie-player
        id="secondLottie"
        autoplay
        loop
        mode="normal"
        src={Cart_State._success}
        style={{ width: '60px', height: '60px' }}
      ></lottie-player>
    </div>
  );
}
