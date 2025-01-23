import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import classes from './TreatmentButton.module.scss';
import { TreatmentsProps } from '../../../../../../assets/interfaces/interfaces';

interface TreatmentButtonProps {
  treatment: TreatmentsProps,
  manuallySetProcedureName: (treatment: TreatmentsProps, duration: number | undefined) => void,
}

function TreatmentButton({treatment, manuallySetProcedureName} :TreatmentButtonProps): JSX.Element {
  const [treatmentDuration, setTreatmentDuration] = useState<number | undefined>(undefined);
  return (
    <button
      className={classes.treatmentNameButton}
      onClick={(): void => manuallySetProcedureName(treatment, treatmentDuration)}
      key={treatment.id}
    >
      {treatment.procedureName}
      {treatment.options.length > 1 && (
        <select onChange={(e): void=> setTreatmentDuration(+e.currentTarget.value)} onClick={(e): void => e.stopPropagation()}>
          {treatment.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </button>
  );
}

export default TreatmentButton;
