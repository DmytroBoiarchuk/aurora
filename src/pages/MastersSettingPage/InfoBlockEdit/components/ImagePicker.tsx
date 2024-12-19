import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classes from './ImagePicker.module.scss';
import usersData from '../../../../database/usersData';

function ImagePicker({
  label,
  children,
  isProcedurePhotoPicking = false,
  setProcedurePickedImage = undefined,
}: {
  label?: string | undefined;
  children: React.ReactNode;
  isProcedurePhotoPicking?: boolean;
  setProcedurePickedImage?: React.Dispatch<React.SetStateAction<string>> | undefined;
}): JSX.Element {
  const currentAvatar = isProcedurePhotoPicking ? '/no-photo-img.jpg' : usersData.photo;
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function onClickPickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    inputRef.current?.click();
  }
  function onConfirmAvatarHandler(event, isConfirmed: boolean): void {
    event.preventDefault();
    if (isConfirmed && pickedImage) {
      usersData.photo = pickedImage;
    }
    if (!isConfirmed) {
      setInputKey((prevState) => prevState + 1);
    }
    setPickedImage(null);
  }
  function changeInputHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target?.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (): void => {
      setPickedImage(fileReader.result as string);
      if(setProcedurePickedImage) setProcedurePickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.originInput}>
      <label>{label}</label>
      <div>
        <img src={pickedImage ?? currentAvatar} alt="Picked avatar" />
      </div>
      <input
        key={inputKey}
        ref={inputRef}
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        type="file"
        onChange={changeInputHandler}
      />
      <div>
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
