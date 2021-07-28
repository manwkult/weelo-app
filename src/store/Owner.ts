import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

import {
  GetAllOwnersAction,
  CreateOwnerAction,
  GetAllOwnersFailedAction,
  CreateOwnerFailedAction
} from './actions/Owner';

import { Owner } from '../models/Owner';

import ownerService from '../services/owner';

// -----------------
// STATE
// -----------------

export interface OwnersState {
  data: Owner[];
  message?: string;
  created?: boolean;
  updated?: boolean;
}


type KnownAction =
  GetAllOwnersAction |
  CreateOwnerAction |
  GetAllOwnersFailedAction |
  CreateOwnerFailedAction;

// ----------------
// ACTION CREATORS
// ----------------

export const actionCreators = {
  getAllOwners: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await ownerService.get();

    if (response) {
      if (response.success) {
        dispatch({ type: 'GET_ALL_OWNERS', payload: { data: response.data as Owner[] } });
      } else {
        dispatch({ type: 'GET_ALL_OWNERS_FAILED', payload: { message: response.message } });
      }
    } else {
      dispatch({ type: 'GET_ALL_OWNERS_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  },
  createOwner: (owner: Owner): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await ownerService.create(owner);

    if (response) {
      if (response.success) {
        dispatch({ type: 'CREATE_OWNER', payload: { owner: response.data as Owner, message: response.message } });
      } else {
        dispatch({ type: 'CREATE_OWNER_FAILED', payload: { message: response.message } });
      }
    } else {
      dispatch({ type: 'CREATE_OWNER_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  }
};

// ----------------
// REDUCER
// ----------------

const unloadedState: OwnersState = { data: [], message: undefined, created: false, updated: false };

export const reducer: Reducer<OwnersState> = (state: OwnersState | undefined, incomingAction: Action): OwnersState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'GET_ALL_OWNERS': {
      const { data } = action.payload;
      if (data && data.length) {
        return {
          data,
          message: undefined,
          created: undefined,
          updated: undefined
        };
      }
      break;
    }
    case 'CREATE_OWNER': {
      const { owner, message } = action.payload;
      if (owner && owner.id) {
        return {
          data: state.data,
          message,
          created: true,
          updated: undefined
        };
      }
      break;
    }
    case 'GET_ALL_OWNERS_FAILED': {
      const { message } = action.payload;
      return {
        data: [],
        message,
        created: undefined,
        updated: undefined
      };
    }
    case 'CREATE_OWNER_FAILED': {
      const { message } = action.payload;
      return {
        data: state.data,
        message,
        created: false,
        updated: undefined
      };
    }
  }

  return state;
};
