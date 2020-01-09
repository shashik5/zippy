import { useContext, useMemo } from 'react';
import { StoreContext } from './context';
import { IActionDefinitionMap, ActionsOf } from './types';

export function useAction<TAD extends IActionDefinitionMap<any>>() {
    const { actions } = useContext(StoreContext);
    return actions as ActionsOf<TAD, any>;
}

export function useStore<TStore>() {
    const { state } = useContext(StoreContext);
    return useMemo(() => Object.freeze(state), [state]) as TStore;
}