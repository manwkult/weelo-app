import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

import {
  GetAllPropertiesAction,
  FilterPropertiesAction,
  CreatePropertyAction,
  UpdatePropertyAction,
  DeletePropertyAction,
  GetAllPropertiesFailedAction,
  FilterPropertiesFailedAction,
  CreatePropertyFailedAction,
  UpdatePropertyFailedAction,
  DeletePropertyFailedAction
} from './actions/Property';

import { Property } from '../models/Property';

import propertyService from '../services/property';

// -----------------
// STATE
// -----------------

export interface PropertiesState {
  data: Property[];
  filters?: Property[];
  message?: string;
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;
}

// -----------------
// ACTIONS
// -----------------

type KnownAction =
  GetAllPropertiesAction |
  FilterPropertiesAction |
  CreatePropertyAction |
  UpdatePropertyAction |
  DeletePropertyAction |
  GetAllPropertiesFailedAction |
  FilterPropertiesFailedAction |
  CreatePropertyFailedAction |
  UpdatePropertyFailedAction |
  DeletePropertyFailedAction;

// ----------------
// ACTION CREATORS
// ----------------

export const actionCreators = {
  getAllProperties: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await propertyService.get();

    if (response) {
      const { success, message, data } = response;

      if (success) {
        dispatch({ type: 'GET_ALL_PROPERTIES', payload: { data: data as Property[] } });
      } else {
        dispatch({ type: 'GET_ALL_PROPERTIES_FAILED', payload: { message } });
      }
    } else {
      dispatch({ type: 'GET_ALL_PROPERTIES_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  },
  filterProperties: (value: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    if (!value) {
      dispatch({ type: 'FILTER_PROPERTIES', payload: { filters: undefined } });
    }

    const state = getState();

    if (state.properties) {
      const filters = state.properties.data.filter(property =>
        property.name.toLowerCase().includes(value.toLowerCase()) ||
        property.year.toString().includes(value) ||
        property.address.toLowerCase().includes(value.toLowerCase()) ||
        property.internalCode.toLowerCase().includes(value.toLowerCase()) ||
        property.price.toString().toLowerCase().includes(value.toLowerCase()) ||
        property.owner.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filters && filters.length) {
        dispatch({ type: 'FILTER_PROPERTIES', payload: { filters } });
      } else {
        dispatch({ type: 'FILTER_PROPERTIES_FAILED', payload: { message: 'No se encontraron resultados' } });
      }
    } else {
      dispatch({ type: 'FILTER_PROPERTIES_FAILED', payload: { message: 'Lista vacia' } });
    }
  },
  createProperty: (property: Property): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await propertyService.create(property);

    if (response) {
      const { success, message, data } = response;

      if (success) {
        dispatch({ type: 'CREATE_PROPERTY', payload: { property: data as Property, message } });
      } else {
        dispatch({ type: 'CREATE_PROPERTY_FAILED', payload: { message } });
      }
    } else {
      dispatch({ type: 'CREATE_PROPERTY_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  },
  updateProperty: (property: Property): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await propertyService.update(property);

    if (response) {
      const { success, message, data } = response;

      if (success) {
        dispatch({ type: 'UPDATE_PROPERTY', payload: { property: data as Property, message } });
      } else {
        dispatch({ type: 'UPDATE_PROPERTY_FAILED', payload: { message } });
      }
    } else {
      dispatch({ type: 'UPDATE_PROPERTY_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  },
  deleteProperty: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await propertyService.remove(id);

    if (response) {
      const { success, message } = response;

      if (success) {
        dispatch({ type: 'DELETE_PROPERTY', payload: { message } });
      } else {
        dispatch({ type: 'DELETE_PROPERTY_FAILED', payload: { message } });
      }
    } else {
      dispatch({ type: 'DELETE_PROPERTY_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  }
};

// ----------------
// REDUCER
// ----------------

const unloadedState: PropertiesState = { data: [], filters: undefined, message: undefined, created: undefined, updated: undefined, deleted: undefined };

export const reducer: Reducer<PropertiesState> = (state: PropertiesState | undefined, incomingAction: Action): PropertiesState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'GET_ALL_PROPERTIES': {
      const { data } = action.payload;
      if (data && data.length) {
        return {
          data,
          filters: undefined,
          message: undefined,
          created: undefined,
          updated: undefined,
          deleted: undefined
        };
      }
      break;
    }
    case 'FILTER_PROPERTIES': {
      const { filters } = action.payload;
      if (filters && filters.length) {
        return {
          data: state.data,
          filters,
          message: undefined,
          created: undefined,
          updated: undefined,
          deleted: undefined
        };
      }
      break;
    }
    case 'CREATE_PROPERTY': {
      const { property, message } = action.payload;
      if (property && property.id) {
        return {
          data: state.data,
          filters: state.filters,
          message,
          created: true,
          updated: undefined,
          deleted: undefined
        };
      }
      break;
    }
    case 'UPDATE_PROPERTY': {
      const { property, message } = action.payload;
      if (property && property.id) {
        return {
          data: state.data,
          filters: state.filters,
          message,
          created: undefined,
          updated: true,
          deleted: undefined
        };
      }
      break;
    }
    case 'DELETE_PROPERTY': {
      const { message } = action.payload;
      return {
        data: state.data,
        filters: state.filters,
        message,
        created: undefined,
        updated: undefined,
        deleted: true
      };
    }
    case 'GET_ALL_PROPERTIES_FAILED':
    case 'FILTER_PROPERTIES_FAILED': {
      const { message } = action.payload;
      return {
        data: [],
        filters: undefined,
        message,
        created: undefined,
        updated: undefined,
        deleted: undefined
      };
    }
    case 'CREATE_PROPERTY_FAILED': {
      const { message } = action.payload;
      return {
        data: state.data,
        filters: state.filters,
        message,
        created: false,
        updated: undefined,
        deleted: undefined
      };
    }
    case 'UPDATE_PROPERTY_FAILED': {
      const { message } = action.payload;
      return {
        data: state.data,
        filters: state.filters,
        message,
        created: undefined,
        updated: false,
        deleted: undefined
      };
    }
    case 'DELETE_PROPERTY_FAILED': {
      const { message } = action.payload;
      return {
        data: state.data,
        filters: state.filters,
        message,
        created: undefined,
        updated: undefined,
        deleted: false
      };
    }
  }

  return state;
};
