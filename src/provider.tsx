import * as React from 'react';
import { StoreContext } from './context';
import { createActions } from './actionCreator';
import { IActionDefinitionMap, ActionsOf } from './types';

interface IStoreProviderProps<TAD extends IActionDefinitionMap<TState>, TState> {
    actionDefitions: TAD;
    children?: React.ReactNode;
    initialState: TState;
}
export function StoreProvider<TAD extends IActionDefinitionMap<TState>, TState>(props: IStoreProviderProps<TAD, TState>) {
    const { actionDefitions, initialState, children } = props;

    const { actionTypesInfo, combinedReducer } = React.useMemo(() => createActions<TAD, TState>(actionDefitions), [actionDefitions]);

    const [state, dispatch] = React.useReducer(combinedReducer, initialState);

    const actionBuilder = React.useCallback((actionsObj: ActionsOf<TAD, TState>, actionName: string) => {
        const action = (payload?: any) => dispatch({ payload, type: actionTypesInfo[actionName] });
        action.type = actionTypesInfo[actionName];
        (actionsObj as any)[actionName] = action;
        return actionsObj;
    }, [dispatch, actionTypesInfo]);

    const actions = React.useMemo(() => Object.keys(actionTypesInfo).reduce(actionBuilder, {} as ActionsOf<TAD, TState>), [actionBuilder, actionTypesInfo]);

    return (
        <StoreContext.Provider value={{ actions, state }}>
            {children}
        </StoreContext.Provider>
    );
}