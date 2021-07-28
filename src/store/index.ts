import * as Authentication from './Authentication';
import * as Owner from './Owner';
import * as Property from './Property';

export interface ApplicationState {
	authentication: Authentication.AuthenticationState | undefined;
	owners: Owner.OwnersState | undefined;
	properties: Property.PropertiesState | undefined;
};

export const reducers = {
	authentication: Authentication.reducer,
	owners: Owner.reducer,
	properties: Property.reducer
};

export interface AppThunkAction<TAction> {
	(dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}