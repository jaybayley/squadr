import React from "react";
import { FormControl, Grid, makeStyles, Select, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPlayers, selectSquad, updatePosition } from "./squadSlice";

const squadSize = 16;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  title: {
    marginTop: 20
  }
}));

const PositionSelector = () => {
  const styles = useStyles();
  const players = useAppSelector(selectPlayers);
  const squad = useAppSelector(selectSquad);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const index = parseInt(event.target.name || '');
    // eslint-disable-next-line eqeqeq
    const player = players.find(player => player.id == event.target.value);
    const playerId = player ? player.id : null;

    dispatch(updatePosition({index, playerId}));
  }

  return (
    <Grid
      container
      alignItems={'flex-start'}
      direction={'column'}
    >
      {Array.from({ length: squadSize }, (_, index) => {
        return (
          <React.Fragment key={index}>
            {index === 11 && (
              <Typography variant="h6" color="inherit" noWrap className={styles.title}>
                Bench
              </Typography>
            )}
            <Grid item className={styles.root}>
              <FormControl className={styles.root}>
                <Select
                  native
                  value={squad.config[index] || undefined}
                  onChange={handleChange}
                  inputProps={{
                    name: `${index}`,
                    id: `${index}`
                  }}
                >
                  <option key={0} value={undefined}>-</option>
                  {players.map(player => <option key={player.id} value={player.id} disabled={squad.config.includes(player.id)}>{player.lastName}</option>)}
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

export default PositionSelector;