import { FormControl, makeStyles, Select } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFormation, selectFormations, updateFormation } from "./squadSlice";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 20,
    width: '100%'
  },
}));

const FormationSelector = () => {
  const styles = useStyles();
  const formations = useAppSelector(selectFormations);
  const formation = useAppSelector(selectFormation);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    // eslint-disable-next-line eqeqeq
    const formation = formations.find(formation => formation.id == event.target.value);

    if (formation) {
      dispatch(updateFormation(formation));
    }
  }

  return (
    <FormControl className={styles.root}>
      <Select
        native
        value={formation?.id || 0}
        onChange={handleChange}
        inputProps={{
          name: 'formation',
          id: 'formation',
        }}
      >
        {formations.map(formation => <option key={formation.id} value={formation.id}>{formation.name}</option>)}
      </Select>
    </FormControl>
  )
}

export default FormationSelector;