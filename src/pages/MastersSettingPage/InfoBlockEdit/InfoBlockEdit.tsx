import React, { FormEvent, useRef, useState } from 'react';
import Block from '../../../UI/Block/Block';
import classes from './InfoBlockEdit.module.scss';
import ProcedurePlate from '../../../UI/procedurePlate/ProcedurePlate';
import MediumButton from '../../../UI/M-Button/MediumButton';
import ImagePicker from './components/ImagePicker/ImagePicker';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { debounce } from '../../../assets/functions/functions';
import { setName } from '../../../store/modules/userDataReducer/reducer';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../query';

async function sendNewDescription(newDescription: string): Promise<void> {
  // const response = await fetch() ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

function InfoBlockEdit(): JSX.Element {
  const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
  const { name, description } = useAppSelector((state) => state.userDataReducer);
  const treatments = useAppSelector((state) => state.treatmentsReducer.treatments);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useAppDispatch();
  const { mutate } = useMutation({
    // data, isError, error, isPending
    mutationFn: sendNewDescription,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['MastersData'] });
    },

  });
  function onDescriptionEditHandler(isEditing: boolean): void {
    setIsDescriptionEditing(isEditing);
    if (descriptionRef.current) mutate(descriptionRef.current.innerText);
  }
  const debouncedUserNameChange = debounce((innerText) => {
    dispatch(setName(innerText)); // tempo
  }, 3000); // ??
  function onChangeUserNameHandler(e: FormEvent<HTMLHeadingElement>): void {
    debouncedUserNameChange(e.currentTarget.innerText);
  }
  return (
    <Block>
      <div className={classes.infoBlock}>
        <div>
          <ImagePicker> Pick an Avatar </ImagePicker>
        </div>
        <div className={classes.description}>
          <div className={classes.nameContainer}>
            <h2 onClick={(): void => onDescriptionEditHandler(false)} onInput={onChangeUserNameHandler} contentEditable>
              {name}
            </h2>
          </div>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.id}>
                <ProcedurePlate>{treatment.procedureName}</ProcedurePlate>
              </li>
            ))}
          </ul>
          <h3
            ref={descriptionRef}
            contentEditable
            onBlur={(): void => setIsDescriptionEditing(false)}
            onFocus={(): void => setIsDescriptionEditing(true)}
            onClick={(): void => setIsDescriptionEditing(true)}
          >
            {description}
          </h3>
          {isDescriptionEditing && (
            <MediumButton classNames={classes.saveButton} onClick={(): void => onDescriptionEditHandler(false)}>
              Save
            </MediumButton>
          )}
        </div>
      </div>
    </Block>
  );
}

export default InfoBlockEdit;
