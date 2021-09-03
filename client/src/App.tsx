import React, { useEffect, useState } from 'react';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { AppBar, Container, CssBaseline, Drawer, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPage, postSquad, selectFormation, selectSquad, selectSquadDirty, selectStatus, updateDraggingPlayerId, updateSquad } from './features/squad/squadSlice';
import FormationSelector from './features/squad/FormationSelector';
import Squad from './features/squad';
import PositionSelector from './features/squad/PositionSelector';
import Bench from './features/squad/Bench';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 70,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    },
  },
  drawer: {
    width: 250,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    flexGrow: 1,
  },
  bench: {
    marginTop: 20
  }
}));

function App() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus)
  const squad = useAppSelector(selectSquad);
  const squadDirty = useAppSelector(selectSquadDirty);
  const formation = useAppSelector(selectFormation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showHelpText, setShowHelpText] = useState(true);
  const formationConfig = [...formation.config];
  formationConfig.unshift(1);

  useEffect(() => {
    dispatch(fetchPage());
  }, [dispatch]);

  useEffect(() => {
    if (squadDirty) {
      dispatch(postSquad(squad));
    }
  }, [squadDirty, squad, dispatch]);

  const toggleDrawer = (open: boolean) => (event: any) => {
    setShowHelpText(false);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open)
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    let sourceIndex = 0;
    let destinationIndex = 0;
    const draggedPlayerId = parseInt(result.draggableId.substring(result.draggableId.lastIndexOf('-') + 1));

    switch (result.source.droppableId) {
      case 'droppable-bench':
        sourceIndex = 11;
        break;
      case 'droppable-bus':
        sourceIndex = 16;
        break;
      default:
        // TODO: Create utlity to convert draggable id strings to numeric ID
        const sourceRowId = parseInt(result.source.droppableId.substring(result.source.droppableId.lastIndexOf('-') + 1));
    
        formationConfig.some((positions, index) => {
          if (index < sourceRowId) {
            sourceIndex += positions || 0;
            return false;
          } else {
            return true;
          }
        });
    }

    switch (result.destination?.droppableId) {
      case 'droppable-bench':
        destinationIndex = 11;
        break;
      case 'droppable-bus':
        destinationIndex = 16;
        break;
      default:
        // TODO: Create utlity to convert draggable id strings to numeric ID
        const destinationRowId = parseInt(result.destination?.droppableId.substring(result.destination?.droppableId.lastIndexOf('-') + 1));

        formationConfig.some((positions, index) => {
          if (index < destinationRowId) {
            destinationIndex += positions || 0;
            return false;
          } else {
            return true;
          }
        });
    }

    sourceIndex += result.source.index;
    destinationIndex += result.destination.index;

    const newSquadConfig = [...squad.config];

    newSquadConfig.splice(sourceIndex, 1);
    newSquadConfig.splice(destinationIndex, 0, draggedPlayerId);

    dispatch(updateSquad(newSquadConfig));
  }

  const handleDragStart = (initial: DragStart) => {
    // TODO: Create utlity to convert draggable id strings to player ID
    const playerId = parseInt(initial.draggableId.substring(initial.draggableId.lastIndexOf('-') + 1));
    dispatch(updateDraggingPlayerId(playerId));
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <CssBaseline />
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SportsSoccerIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" className={styles.title} noWrap>
            Squadr
          </Typography>
          {showHelpText &&
            <React.Fragment>
              <Typography variant="subtitle1" color="inherit" noWrap>
                Configure your team here 
              </Typography>
              <ArrowRightAltIcon />
            </React.Fragment>
          }
          <IconButton color="inherit" aria-label="Toggle Menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
        <Container className={styles.drawer}>
          <Typography variant="h6" color="inherit" noWrap>
            Formation
          </Typography>
          <FormationSelector />
          <Typography variant="h6" color="inherit" noWrap>
            Lineup
          </Typography>
          <PositionSelector />
        </Container>
        {/* <Button onClick={clearSquad}>Clear Squad</Button> */}
      </Drawer>
      <Container className={styles.root} maxWidth={false}>
        {status === 'idle' &&
          <React.Fragment>
            <Squad />
            <Typography className={styles.bench} variant="h6" color="inherit" noWrap>
              Bench
            </Typography>
            <Bench />
          </React.Fragment>
        }
      </Container>
    </DragDropContext>
  )
}

export default App;
