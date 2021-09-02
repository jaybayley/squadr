import { Grid, makeStyles } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import { useAppSelector } from "../../app/hooks";
import DraggablePlayer from "./DraggablePlayer";
import { selectDraggingPlayerId } from "./squadSlice";

interface RowProps {
  positions: number;
  playerIds: (number | null)[];
  id: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 4,
    minHeight: 140,
    [theme.breakpoints.down('sm')]: {
      minHeight: 85
    },
  },
}));

const Row = ({ positions, playerIds, id }: RowProps) => {
  const styles = useStyles();
  const draggablePlayerId = useAppSelector(selectDraggingPlayerId);
  const isDropDisabled = !playerIds.includes(draggablePlayerId);

  return (
    <Droppable droppableId={`droppable-row-${id}`} direction="horizontal" isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => (
        <Grid
          ref={provided.innerRef}
          {...provided.droppableProps}
          justifyContent={'center'}
          container
          spacing={1}
          className={styles.root}
        >
          {playerIds.map((playerId, index) => <DraggablePlayer key={index} index={index} row={id} playerId={playerId} disableDrag={positions === 1} />)}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  )
}

export default Row;