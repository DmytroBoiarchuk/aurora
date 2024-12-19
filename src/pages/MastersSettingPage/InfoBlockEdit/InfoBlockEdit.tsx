import React, { useState } from 'react';
import usersData from '../../../database/usersData';
import Block from '../../../UI/Block/Block';
import classes from './InfoBlockEdit.module.scss';
import ProcedurePlate from '../../../UI/procedurePlate/ProcedurePlate';
import MediumButton from '../../../UI/M-Button/MediumButton';
import ImagePicker from "./components/ImagePicker";

function InfoBlockEdit(): JSX.Element {
  const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
  const [isBlurredDescription, setIsBlurredDescription] = useState<boolean>(false)
  const { name, description, treatments } = usersData;
  function onDescriptionEditHandler(isEditing): void {
    setIsDescriptionEditing(isEditing);
  }
  function onDescriptionSaveHandler(): void {
    setIsDescriptionEditing(false);
  }
  return (
    <Block>
      <div className={classes.infoBlock}>
        <div className={classes.imgContainer}>
          <ImagePicker> Pick an Avatar </ImagePicker >
        </div>
        <div className={classes.description}>
          <h2 onClick={(): void => onDescriptionEditHandler(false)} contentEditable>{name}</h2>
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
            <MediumButton classNames={classes.saveButton} onClick={onDescriptionSaveHandler}>
              Save
            </MediumButton>
          )}
        </div>
      </div>
    </Block>
  );
}

export default InfoBlockEdit;
