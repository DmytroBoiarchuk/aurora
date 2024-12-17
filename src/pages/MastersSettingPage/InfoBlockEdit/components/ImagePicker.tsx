import React, { useRef, useState } from 'react';
import {motion} from "framer-motion";
import classes from './ImagePicker.module.scss';
import usersData from '../../../../database/usersData';

function ImagePicker({ label }: { label?: string | undefined }): JSX.Element {
  const currentAvatar = usersData.photo;
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function onClickPickHandler(): void {
    inputRef.current?.click();
  }
  function onConfirmAvatarHandler(isConfirmed): void {
    if (isConfirmed) {
      if (pickedImage) usersData.photo = pickedImage;
      setPickedImage(null);
    }
    if (!isConfirmed) {
      setInputKey(prevState => prevState+1);
      setPickedImage(null);
    }
  }
  function changeInputHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target?.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (): void => {
      setPickedImage(fileReader.result as string);
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
        <button onClick={onClickPickHandler}>Pick an Avatar</button>
          <motion.div
              initial={{ opacity: 0, display: 'none' }}
            animate={
              pickedImage
                ? { opacity: 1, display: 'flex' }
                : { opacity: 0, display: 'none' }
            }
            transition={{ duration: 0.5 }}
            className={classes.cancelAndConfirmButtons}
          >
            <button onClick={(): void => onConfirmAvatarHandler(false)}>Cancel</button>
            <button onClick={(): void => onConfirmAvatarHandler(true)}>Confirm</button>
          </motion.div>

      </div>
    </div>
  );
}

export default ImagePicker;
