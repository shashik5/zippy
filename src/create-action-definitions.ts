import { IActionDefinitionMap } from './types';

export const createActionDefinitions = <TStore, TAD extends IActionDefinitionMap<TStore> = IActionDefinitionMap<TStore>>(definitions: TAD) => definitions;