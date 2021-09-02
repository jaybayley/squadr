import React from 'react';
import { Box } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { selectFormation, selectSquad } from './squadSlice';
import Row from './Row';

const Squad = () => {
  const squad = useAppSelector(selectSquad);
  const formation = useAppSelector(selectFormation);
  const formationConfig = [...formation.config]
  formationConfig.unshift(1);

  let trackIndex = 0;

  return (
    <Box>
      {formationConfig.map((positions, index) => {
        const slice = [...squad.config].splice(trackIndex, positions);
        trackIndex += positions;

        return (
          <Row positions={positions} playerIds={slice} key={index} id={index} />
        )
      })}
    </Box>
  );
}

export default Squad;