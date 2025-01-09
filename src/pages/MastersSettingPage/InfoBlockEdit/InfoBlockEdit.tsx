import React, { FormEvent, useState } from 'react';
import Block from '../../../UI/Block/Block';
import classes from './InfoBlockEdit.module.scss';
import ProcedurePlate from '../../../UI/procedurePlate/ProcedurePlate';
import MediumButton from '../../../UI/M-Button/MediumButton';
import ImagePicker from "./components/ImagePicker";
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { debounce } from '../../../assets/functions/functions';
import { setName } from '../../../store/modules/userDataReducer/reducer';



function InfoBlockEdit(): JSX.Element {
  const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
  const [isBlurredDescription, setIsBlurredDescription] = useState<boolean>(false);
  const {  name, description } = useAppSelector((state) => state.userDataReducer);
  const treatments = useAppSelector(state => state.treatmentsReducer.treatments);
  const dispatch = useAppDispatch();
  function onDescriptionEditHandler(isEditing: boolean): void {
    setIsDescriptionEditing(isEditing);
  }
  const debouncedUserNameChange = debounce((innerText)=> {
    dispatch(setName(innerText));
  }, 3000);
  function onChangeUserNameHandler(e: FormEvent<HTMLHeadingElement>) : void {
    debouncedUserNameChange(e.currentTarget.innerText);
  }
  return (
    <Block>
      <div className={classes.infoBlock}>
        <div className={classes.imgContainer}>
          <ImagePicker> Pick an Avatar </ImagePicker >
        </div>
        <div className={classes.description}>
          <h2 onClick={(): void => onDescriptionEditHandler(false)} onInput={onChangeUserNameHandler} contentEditable>{name}</h2>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.id}>
                <ProcedurePlate>{treatment.procedureName}</ProcedurePlate>
              </li>
            ))}
          </ul>
          <div className={`${isDescriptionEditing? classes.onDescriptionEditing : classes.notEditing} ${isBlurredDescription && isDescriptionEditing ? classes.onBlurDescription : ''}`}
            contentEditable
               onBlur={(): void=>setIsBlurredDescription(true)}
               onFocus={(): void=>setIsBlurredDescription(false)}
               onClick={():void => onDescriptionEditHandler(true)}
          >
            {description}
          </div>
          {isDescriptionEditing && (
            <MediumButton classNames={classes.saveButton} onClick={():void=> onDescriptionEditHandler(false)}>
              Save
            </MediumButton>
          )}
        </div>
      </div>
    </Block>
  );
}

export default InfoBlockEdit;
