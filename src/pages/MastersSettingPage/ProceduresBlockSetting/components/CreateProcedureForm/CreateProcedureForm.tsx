import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './CreateProcedureForm.module.scss';
import ImagePicker from '../../../InfoBlockEdit/components/ImagePicker';
import { TreatmentsProps } from '../../../../../assets/interfaces/interfaces';
import DurationInput from './DurationInput/DurationInput';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { createTreatment, editTreatment } from '../../../../../store/modules/treatmentsReducer/reducer';

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
  const store = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const newTreatmentData = Object.fromEntries(fd.entries());
    const newTreatment: TreatmentsProps = {
      id: store.treatmentsReducer.treatments.length,
      img: procedurePickedImage,
      procedureName: newTreatmentData.procedureName.toString(),
      price: newTreatmentData.procedurePrice.toString(),
      description: newTreatmentData.procedureDescription.toString(),
      options: optionsFields.map(
        (option) =>
          +newTreatmentData[`procedureDurationHours${option}`] +
          +newTreatmentData[`procedureDurationMinutes${option}`] / 60
      ),
    };
    //  fetch PUT instead
    if (isEditing && procedure) dispatch(editTreatment({ id: procedure.id, treatment: newTreatment }));
    else dispatch(createTreatment(newTreatment));
    setFormIsShown(false);
  }

  return (
    <form
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
            <p>{store.userDataReducer.currency}</p>
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
        <button type="submit">{isEditing ? 'Save' : 'Create'}</button>
      </span>
    </form>
  );
}

export default CreateProcedureForm;
