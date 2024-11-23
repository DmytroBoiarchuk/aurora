import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import './PhoneInputComponent.scss';

function PhoneInputComponent(): JSX.Element {
  const [value, setValue] = useState<string>('');

  return <PhoneInput rules={{ required: true }} defaultCountry="GB" placeholder="Enter phone number" value={value} onChange={setValue} />;
}

export default PhoneInputComponent;
