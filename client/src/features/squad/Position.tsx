import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Player } from "@prisma/client";

interface PositionProps {
  player: Player;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 100,
    lineHeight: '100px',
    textAlign: 'center'
  }
}));

const Position = ({ player }: PositionProps) => {
  const styles = useStyles();

  return (
    <Grid item>
      <Paper className={styles.paper}>{player.lastName}</Paper>
    </Grid>
  )
}

export default Position;