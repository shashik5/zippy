import { IAction, IActionDefinitionMap } from './types';

export function createActions<TAD extends IActionDefinitionMap<TStore>, TStore>(actionDefinitions: TAD) {
    const actionTypesInfo: { [key: string]: string } = {};
    const reducers: { [key: string]: (state: TStore, payload?: any) => TStore } = {};

    Object.keys(actionDefinitions).forEach((actionName) => {
        const actionDefinition = actionDefinitions[actionName];
        actionTypesInfo[actionName] = actionDefinition.type;
        reducers[actionDefinition.type] = actionDefinition.reducer;
    });

    const combinedReducer = (state: TStore, action: IAction) => {
        const reducer = reducers[action.type];
        return reducer === undefined ? state : reducer(state, action.payload);
    };

    return {
        actionTypesInfo,
        combinedReducer
    };
}