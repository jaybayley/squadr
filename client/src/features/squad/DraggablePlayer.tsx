import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { useAppSelector } from "../../app/hooks";
import { selectPlayers } from "./squadSlice";
import shirt from '../../svgs/shirt.svg';

interface PositionProps {
  playerId: (number | null);
  row: number;
  index: number;
  disableDrag?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 140,
    cursor: 'pointer',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 85
    },
  },
  disabled: {
    cursor: 'default'
  },
  empty: {
    height: 100,
    width: 100,
    backgroundColor: 'lightGray',
    borderRadius: 15,
    border: '3px dashed black',
    opacity: 0.15,
    [theme.breakpoints.down('sm')]: {
      height: 55,
      width: 55,
      borderWidth: 2
    },
  },
  shirt: {
    height: 100,
    width: 100,
    [theme.breakpoints.down('sm')]: {
      height: 55,
      width: 55
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${shirt})`
  },
  shirtNumber: {
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem'
    },
  },
  playerName: {
    width: 100,
    [theme.breakpoints.down('sm')]: {
      width: 55,
      fontSize: '0.75rem'
    },
  }
}));

const DraggablePlayer = ({ playerId, index, disableDrag, row }: PositionProps) => {

  const styles = useStyles();
  const players = useAppSelector(selectPlayers);
  const player = players.find(player => player.id === playerId);

  const id = player ? `player-${player.id}` : `empty-${row}-${index}`;

  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={disableDrag || !player}>
      {(provided, snapshot) => (
        <Grid 
          className={`${styles.root}${disableDrag ? styles.disabled : ''}`}
          item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={player ? styles.shirt : styles.empty}>
            <Typography className={styles.shirtNumber}>{player?.number}</Typography>
          </div>
          <Typography variant={'subtitle1'} className={styles.playerName} noWrap>{player?.lastName}</Typography>
        </Grid>
      )}
    </Draggable>
  )
}

export default DraggablePlayer;