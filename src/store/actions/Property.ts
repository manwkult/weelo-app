import { Property } from "../../models/Property";

export interface GetAllPropertiesAction {
  type: 'GET_ALL_PROPERTIES';
  payload: {
    data: Property[];
  }
}

export interface FilterPropertiesAction {
  type: 'FILTER_PROPERTIES';
  payload: {
    filters?: Property[];
  }
}

export interface CreatePropertyAction {
  type: 'CREATE_PROPERTY';
  payload: {
    property: Property;
    message: string;
  }
}

export interface UpdatePropertyAction {
  type: 'UPDATE_PROPERTY';
  payload: {
    property: Property;
    message: string;
  }
}

export interface DeletePropertyAction {
  type: 'DELETE_PROPERTY';
  payload: {
    message: string;
  }
}

export interface GetAllPropertiesFailedAction {
  type: 'GET_ALL_PROPERTIES_FAILED';
  payload: {
    message: string;
  }
}

export interface FilterPropertiesFailedAction {
  type: 'FILTER_PROPERTIES_FAILED';
  payload: {
    message: string;
  }
}

export interface CreatePropertyFailedAction {
  type: 'CREATE_PROPERTY_FAILED';
  payload: {
    message: string;
  }
}

export interface UpdatePropertyFailedAction {
  type: 'UPDATE_PROPERTY_FAILED';
  payload: {
    message: string;
  }
}

export interface DeletePropertyFailedAction {
  type: 'DELETE_PROPERTY_FAILED';
  payload: {
    message: string;
  }
}

