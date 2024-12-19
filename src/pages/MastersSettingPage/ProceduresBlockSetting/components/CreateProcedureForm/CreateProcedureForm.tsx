import React, { useState } from 'react';
import classes from './CreateProcedureForm.module.scss';
import usersData from '../../../../../database/usersData';
import ImagePicker from '../../../InfoBlockEdit/components/ImagePicker';

interface CreateProcedureFormProps {
  setFormIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}
function CreateProcedureForm({ setFormIsShown }: CreateProcedureFormProps): JSX.Element {
  const [procedurePickedImage, setProcedurePickedImage] = useState<string>('');
  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    console.log(event);
    console.log(procedurePickedImage);
  }
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <div className={classes.imagePicker}>
        <ImagePicker setProcedurePickedImage={setProcedurePickedImage} label="Procedure photo" isProcedurePhotoPicking>
          Pick an Image
        </ImagePicker>
      </div>
      <div className={classes.rightBlock}>
        <div>
          <label>Procedure name</label>
          <input name="procedure-name" type="text" required placeholder="ex: Lash Lift" />
        </div>
        <div className={classes.priceInput}>
          <label>Price</label>
          <div>
            <input
              name="procedure-price"
              type="number"
              maxLength={4}
              required
              min={0}
              max={9999}
              placeholder="ex: 25"
            />
            <p>{usersData.currency}</p>
          </div>
        </div>
        <div>
          <label>Duration</label>
          <div className={classes.durationInputWrapper}>
            <input name="procedure-duration-hours" type="number" min={0} max={12} required placeholder="ex: 1" />
            <p>Hours</p>
            <input name="procedure-duration-minutes" type="number" min={0} max={59} required placeholder="ex: 30" />
            <p>Minutes</p>
          </div>
        </div>
        <div>
          <label>Description</label>
          <textarea name="procedure-description" />
        </div>
      </div>
      <span>
        <button type="button" onClick={(): void => setFormIsShown(false)}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </span>
    </form>
  );
}

export default CreateProcedureForm;
