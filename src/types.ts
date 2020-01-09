export interface IAction {
    type: string;
    payload?: any;
}

type ActionDefinition<TStore, TPayload> = {
    type: string;
    reducer(state: TStore, payload?: TPayload): TStore;
};

export interface IActionDefinitionMap<TStore> {
    [actionName: string]: ActionDefinition<TStore, any>;
}

export type ActionsOf<TAD extends IActionDefinitionMap<TStore>, TStore> = {
    [H in keyof TAD]: TAD[H]['reducer'] extends (state: any, payload: infer P) => void ? {
        (payload?: P): void;
        type: string;
    } : never;
}

export interface IStoreContext<TStore = {}, TAD extends IActionDefinitionMap<TStore> = IActionDefinitionMap<TStore>> {
    actions: ActionsOf<TAD, TStore>;
    state: TStore;
}