import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SingleValue } from 'react-select';
import { Option } from 'react-google-places-autocomplete/build/types';

import { AnimatePresence, motion } from 'framer-motion';
import classes from './AddressPicker.module.scss';
import { VITE_GOOGLE_MAPS_API_KEY } from '../../../../../constants/keys';
import MediumButton from '../../../../../UI/M-Button/MediumButton';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setAddress } from '../../../../../store/modules/userDataReducer/reducer';


async function sendNewAddress(newAddress: string): Promise<void> {
  // const response = await fetch() ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

function AddressPicker(): JSX.Element {
  const [isDataPickerOn, setIsDataPickerOn] = useState<boolean>(false);
  const [usersAddress, setUsersAddress] = useState<SingleValue<Option>>(null);
  const dispatch = useAppDispatch(); //temporary (useMutation react Query instead);
  const { mutate } = useMutation({
    // data, isError, error, isPending
    mutationFn: sendNewAddress,
    onSuccess: (): void => {},
  });
  function handleSubmitAddress(): void {
    setIsDataPickerOn((prevState) => !prevState);
    if(usersAddress )
    dispatch(setAddress(usersAddress.label));

  }
  useEffect(() => {
    if (usersAddress !== null) mutate(usersAddress.label);
  }, [usersAddress]);

  return (
    <motion.div className={classes.addressPickerContainer}>
      <AnimatePresence>
        {isDataPickerOn && (
          <motion.div
            className={classes.inputWrapper}
            animate={{ opacity: 1, width: '350px'}}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, width: 0}}
          >
            <GooglePlacesAutocomplete
              selectProps={{
                value: usersAddress,
                onChange: setUsersAddress,
              }}
              apiKey={VITE_GOOGLE_MAPS_API_KEY}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <MediumButton onClick={handleSubmitAddress}>Set address</MediumButton>
    </motion.div>
  );
}

export default AddressPicker;
