import React, { useState } from 'react';
import Input, { InputProps } from '../Input';

const InputPassword: React.FC<Props> = (props) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleEye = () => setHidden((prev) => !prev);

  const inputType = hidden ? 'password' : 'text';
  const iconName = hidden ? 'ic_password_view' : 'ic_eye-off';

  return <Input {...props} type={inputType} iconName={iconName} onIconClick={toggleEye} />;
};

type Props = InputProps;

export default InputPassword;
