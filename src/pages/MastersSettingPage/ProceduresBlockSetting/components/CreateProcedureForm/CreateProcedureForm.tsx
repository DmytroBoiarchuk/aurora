import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './CreateProcedureForm.module.scss';
import usersData from '../../../../../database/usersData';
import ImagePicker from '../../../InfoBlockEdit/components/ImagePicker';
import { TreatmentsProps } from '../../../../../assets/interfaces/interfaces';
import DurationInput from './DurationInput/DurationInput';

interface CreateProcedureFormProps {
  setFormIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  procedure?: TreatmentsProps | undefined;
  isEditing?: boolean;
}
function CreateProcedureForm({
  setFormIsShown,
  procedure = undefined,
  isEditing = false,
}: CreateProcedureFormProps): JSX.Element {
  const [procedurePickedImage, setProcedurePickedImage] = useState<string>(procedure?.img || '');
  const [optionsFields, setOptionsFields] = useState<number[]>(procedure?.options || [0]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const procedureData = Object.fromEntries(fd.entries());
    const newProcedure: TreatmentsProps = {
      id: usersData.treatments.length,
      img: procedurePickedImage,
      procedureName: procedureData.procedureName.toString(),
      price: procedureData.procedurePrice.toString(),
      description: procedureData.procedureDescription.toString(),
      options: optionsFields.map(
        (option) =>
          +procedureData[`procedureDurationHours${option}`] + +procedureData[`procedureDurationMinutes${option}`] / 60
      ),
    };
    //  fetch PUT instead
    if (isEditing)
      usersData.treatments = usersData.treatments.map((treatment) => {
        if (treatment.id === procedure?.id) return newProcedure;
        return treatment;

      });
    else usersData.treatments.push(newProcedure);
    setFormIsShown(false);
  }

  return (
    <motion.form
      initial={{ opacity: 0, top: '25%' }}
      animate={{ opacity: 1, top: '50%' }}
      exit={{ opacity: 0, top: '25%' }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={classes.formContainer}
    >
      <div className={classes.imagePicker}>
        <ImagePicker
          defaultValue={procedure?.img}
          setProcedurePickedImage={setProcedurePickedImage}
          label="Procedure photo"
          isProcedurePhotoPicking
        >
          Pick an Image
        </ImagePicker>
      </div>
      <div className={classes.rightBlock}>
        <div>
          <label>Procedure name</label>
          <input
            defaultValue={procedure?.procedureName}
            name="procedureName"
            type="text"
            required
            placeholder="ex: Lash Lift"
          />
        </div>
        <div className={classes.priceInput}>
          <label>Price</label>
          <div>
            <input
              defaultValue={procedure?.price}
              name="procedurePrice"
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
          {optionsFields.map((option) => (
            <DurationInput option={option} key={option} />
          ))}
        </div>
        <div className={classes.addNewOptionButtonContainer}>
          <button
            className={classes.addNewOptionButton}
            type="button"
            onClick={(): void => {
              if (optionsFields.length < 9) setOptionsFields((prevState) => [...prevState, prevState.length]);
            }}
          >
            +
          </button>
          <button
            className={classes.addNewOptionButton}
            type="button"
            onClick={(): void => {
              if (optionsFields.length > 1) setOptionsFields((prevState) => [...prevState].slice(0, -1));
            }}
          >
            -
          </button>
        </div>
        <div>
          <label>Description</label>
          <textarea defaultValue={procedure?.description} name="procedureDescription" />
        </div>
      </div>
      <span>
        <button type="button" onClick={(): void => setFormIsShown(false)}>
          Cancel
        </button>
        <button type="submit">{isEditing? 'Save' : 'Create'}</button>
      </span>
    </motion.form>
  );
}

export default CreateProcedureForm;
