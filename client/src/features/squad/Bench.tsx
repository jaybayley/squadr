import { Grid, makeStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../app/hooks';
import DraggablePlayer from './DraggablePlayer';
import { selectDraggingPlayerId, selectSquad } from './squadSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 140
  }
}));

const Bench = () => {
  const styles = useStyles();
  const squad = useAppSelector(selectSquad);
  const draggablePlayerId = useAppSelector(selectDraggingPlayerId);

  const benched = squad.config.slice(11);

  const isDropDisabled = benched.includes(draggablePlayerId);

  return (
    <Droppable droppableId={'droppable-bench'} direction="horizontal" isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => (
        <Grid
          ref={provided.innerRef}
          {...provided.droppableProps}
          justifyContent={'center'}
          container
          spacing={1}
          className={styles.root}
        >
          {benched.map((playerId, index) => <DraggablePlayer key={index} index={index} playerId={playerId} row={999} disableDrag={true} />)}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
}

export default Bench;