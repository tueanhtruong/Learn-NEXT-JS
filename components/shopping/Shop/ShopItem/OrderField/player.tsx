/* eslint-disable react/self-closing-comp */
import React, { useEffect, useRef } from 'react';
import { Callback } from '../../../../../redux/type';
export enum Cart_State {
  _loading = 'https://assets1.lottiefiles.com/private_files/lf30_pqzcapyb.json',
  _success = 'https://assets1.lottiefiles.com/private_files/lf30_xs5elnbg.json',
}

export default function Player(props: { loading: boolean; onAdd: Callback }) {
  const { loading, onAdd } = props;
  const ref = useRef<any>(null);
  useEffect(() => {
    if (loading) {
      ref.current?.play();
    }
  }, [loading]);

  return (
    <div onClick={onAdd}>
      <lottie-player
        id="firstLottie"
        ref={ref}
        loop
        mode="normal"
        src={Cart_State._loading}
        style={{ width: '60px', height: '60px', cursor: 'pointer' }}
      ></lottie-player>
    </div>
  );
}
