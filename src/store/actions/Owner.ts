import { Owner } from "../../models/Owner";

export interface GetAllOwnersAction {
  type: 'GET_ALL_OWNERS';
  payload: {
    data: Owner[];
  }
}

export interface CreateOwnerAction {
  type: 'CREATE_OWNER';
  payload: {
    owner: Owner;
    message: string;
  }
}

export interface GetAllOwnersFailedAction {
  type: 'GET_ALL_OWNERS_FAILED';
  payload: {
    message: string;
  }
}

export interface CreateOwnerFailedAction {
  type: 'CREATE_OWNER_FAILED';
  payload: {
    message: string;
  }
}

