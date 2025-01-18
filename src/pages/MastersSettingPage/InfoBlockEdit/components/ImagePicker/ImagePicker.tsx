import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classes from './ImagePicker.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { setPhoto } from '../../../../../store/modules/userDataReducer/reducer';

function ImagePicker({
  label,
  children,
  isProcedurePhotoPicking = false,
  setProcedurePickedImage = undefined,
  defaultValue = null,
}: {
  label?: string | undefined;
  children: React.ReactNode;
  isProcedurePhotoPicking?: boolean;
  setProcedurePickedImage?: React.Dispatch<React.SetStateAction<string>> | undefined;
  defaultValue?: string | null;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const { photo } = useAppSelector((state) => state.userDataReducer);
  const [pickedImage, setPickedImage] = useState<string | null>(defaultValue);
  const currentAvatar = isProcedurePhotoPicking ? (pickedImage ?? '/no-photo-img.jpg') : photo;
  const [inputKey, setInputKey] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function onClickPickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    inputRef.current?.click();
  }
  function onConfirmAvatarHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, isConfirmed: boolean): void {
    event.preventDefault();
    if (isConfirmed && pickedImage) {
      dispatch(setPhoto(pickedImage));
    }
    if (!isConfirmed) {
      setInputKey((prevState) => prevState + 1);
    }
    setPickedImage(null);
  }
  function onSelectPhotoHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      const file = event.target?.files[0];
      if (!file) return;
      const fileReader = new FileReader();
      fileReader.onload = (): void => {
        setPickedImage(fileReader.result as string);
        if (setProcedurePickedImage) setProcedurePickedImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  }
  return (
    <div className={classes.originInput}>
      <label>{label}</label>
      <img src={pickedImage ?? currentAvatar} alt="Picked avatar" />
      <input
        key={inputKey}
        ref={inputRef}
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        type="file"
        onChange={onSelectPhotoHandler}
      />
      <div className={classes.buttonContainer}>
        <button onClick={(event): void => onClickPickHandler(event)}>{children}</button>
        {!isProcedurePhotoPicking && (
          <motion.div
            initial={{ opacity: 0, display: 'none' }}
            animate={pickedImage ? { opacity: 1, display: 'flex' } : { opacity: 0, display: 'none' }}
            transition={{ duration: 0.5 }}
            className={classes.cancelAndConfirmButtons}
          >
            <button onClick={(event): void => onConfirmAvatarHandler(event, false)}>Cancel</button>
            <button onClick={(event): void => onConfirmAvatarHandler(event, true)}>Confirm</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ImagePicker;
