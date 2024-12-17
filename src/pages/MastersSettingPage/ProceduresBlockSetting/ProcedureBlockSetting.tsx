import React, {useState} from 'react';
import { FaPlus } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Block from '../../../UI/Block/Block';
import usersData from '../../../database/usersData';
import Procedure from '../../MastersPage/components/ProceduresBlock/components/Procedure/Procedure';
import classes from './ProcedureBlockSetting.module.scss';

function ProcedureBlockSetting(): JSX.Element {
    const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Block >
      <div className={classes.block}>
        {usersData.treatments.map((treatment) => (
          <Procedure key={treatment.id} procedure={treatment} />
        ))}
        <button onMouseEnter={(): void=> setIsHovered(true)} onMouseLeave={(): void=> setIsHovered(false)} className={classes.addNewProcedureButton}>
          <motion.div animate={ isHovered? { rotate: [0, 15, -15, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
            <FaPlus className={classes.plusIcon}/>
          </motion.div>
        </button>
      </div>
    </Block>
  );
}

export default ProcedureBlockSetting;
