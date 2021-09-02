import { Formation, Player, Squad } from '@prisma/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Page {
  formations: Formation[];
  squad: Squad;
  players: Player[];
}

interface MutableSquad {
  id: number;
  formationId: number;
  config: (number | null)[];
}

interface MutableFormation {
  id: number;
  name: string;
  config: number[];
}

export interface SquadState {
  players: Player[];
  formations: MutableFormation[];
  formation: MutableFormation;
  squad: MutableSquad;
  squadDirty: boolean;
  status: 'idle' | 'loading' | 'failed';
  draggingPlayerId: number;
}

const formation: MutableFormation = {
  id: 1,
  name: '4-4-2',
  config: [4,4,2]
}

const squad: MutableSquad = {
  id: 1,
  formationId: 1,
  config: Array(16).fill(null)
}

export const initialState: SquadState = {
  players: [],
  formations: [],
  formation: formation,
  squad: squad,
  squadDirty: false,
  status: 'idle',
  draggingPlayerId: 0
};

export const fetchPage = createAsyncThunk(
  'squad/fetchPage',
  async () => {
    const response = await fetch('/api/page');
    const json = await response.json();
    return json as Page;
  }
);

export const fetchSquad = createAsyncThunk(
  'squad/fetchSquad',
  async () => {
    const response = await fetch('/api/squad');
    const json = await response.json();
    return json as Squad;
  }
);

export const fetchFormations = createAsyncThunk(
  'squad/fetchFormations',
  async () => {
    const response = await fetch('/api/formations');
    const json = await response.json();
    return json as Formation[];
  }
);

export const fetchPlayers = createAsyncThunk(
  'squad/fetchPlayers',
  async () => {
    const response = await fetch('/api/players');
    const json = await response.json();
    return json as Player[];
  }
);

export const postSquad = createAsyncThunk(
  'squad/postSquad',
  async (squad: MutableSquad) => {
    const config = JSON.stringify(squad.config);
    const immutableSquad: Squad = {...squad, config};

    const response = await fetch(`/api/squad/${squad.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(immutableSquad)
    });

    const json = await response.json();
    return json as Squad;
  }
);

export const squadSlice = createSlice({
  name: 'squad',
  initialState,
  reducers: {
    updateSquad: (state, action: PayloadAction<(number | null)[]>) => {
      state.squad.config = action.payload;
      state.squadDirty = true;
    },
    updatePosition: (state, action: PayloadAction<{index: number, playerId: (number | null)}>) => {
      state.squad.config[action.payload.index] = action.payload.playerId;
      state.squadDirty = true;
    },
    updateFormation: (state, action: PayloadAction<MutableFormation>) => {
      state.formation = action.payload;
      state.squad.formationId = action.payload?.id;
      state.squadDirty = true;
    },
    updateDraggingPlayerId: (state, action: PayloadAction<number>) => {
      state.draggingPlayerId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSquad.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formations = action.payload.formations.map(formation => {
          const config = JSON.parse(formation.config);
          return {...formation, config};
        });
        state.players = action.payload.players;
        const config = JSON.parse(action.payload.squad.config);
        state.squad = {...action.payload.squad, config};
        const formation = state.formations.find(formation => formation.id === state.squad.formationId);

        if (formation) {
          state.formation = formation;
        } else if (!state.formation && state.formations.length) {
          state.formation = state.formations[0];
        }
      })
      .addCase(fetchSquad.fulfilled, (state, action) => {
        state.status = 'idle';
        const config = JSON.parse(action.payload.config);
        state.squad = {...action.payload, config};
      })
      .addCase(fetchFormations.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formations = action.payload.map(formation => {
          const config = JSON.parse(formation.config);
          return {...formation, config};
        });
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.players = action.payload;
      })
      .addCase(postSquad.fulfilled, (state, action) => {
        state.squadDirty = false;
      });
  },
});

export const { updateSquad, updateFormation, updateDraggingPlayerId, updatePosition } = squadSlice.actions;

export const selectStatus = (state: RootState) => state.squad.status;
export const selectPlayers = (state: RootState) => state.squad.players;
export const selectSquad = (state: RootState) => state.squad.squad;
export const selectSquadDirty = (state: RootState) => state.squad.squadDirty;
export const selectFormations = (state: RootState) => state.squad.formations;
export const selectFormation = (state: RootState) => state.squad.formation;
export const selectDraggingPlayerId = (state: RootState) => state.squad.draggingPlayerId;

export default squadSlice.reducer;
