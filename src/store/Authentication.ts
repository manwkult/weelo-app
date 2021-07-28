import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

import { Account } from '../models/Account';
import { User } from '../models/User';

import authenticationService from '../services/authentication';

// -----------------
// STATE
// -----------------

export interface AuthenticationState {
  isLoading: boolean;
  message?: string;
  authenticated: boolean;
  account?: Account;
}

// -----------------
// ACTIONS
// -----------------

interface RequestAccountAction {
  type: 'REQUEST_ACCOUNT';
  payload: {
    account: Account;
  }
}

interface RequestAccountFailedAction {
  type: 'REQUEST_ACCOUNT_FAILED';
  payload: {
    message: string;
  }
}

type KnownAction = RequestAccountAction | RequestAccountFailedAction;

// ----------------
// ACTION CREATORS
// ----------------

export const actionCreators = {
  login: (user: User): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const response = await authenticationService.login(user);

    if (response) {
      if (response.success) {
        const account = response.data as Account;
        localStorage.setItem("token", account.token);
        dispatch({ type: 'REQUEST_ACCOUNT', payload: { account } });
      } else {
        dispatch({ type: 'REQUEST_ACCOUNT_FAILED', payload: { message: response.message } });
      }
    } else {
      dispatch({ type: 'REQUEST_ACCOUNT_FAILED', payload: { message: 'Se ha presentado un error' } });
    }
  }
};

// ----------------
// REDUCER
// ----------------

const unloadedState: AuthenticationState = { account: {} as Account, message: undefined, authenticated: false, isLoading: false };

export const reducer: Reducer<AuthenticationState> = (state: AuthenticationState | undefined, incomingAction: Action): AuthenticationState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'REQUEST_ACCOUNT':
      const { account } = action.payload;
      if (account) {
        return {
          account,
          message: undefined,
          authenticated: true,
          isLoading: true
        };
      }
      break;
    case 'REQUEST_ACCOUNT_FAILED':
      const { message } = action.payload;
      return {
        account: undefined,
        message,
        authenticated: false,
        isLoading: true
      };
  }

  return state;
};
