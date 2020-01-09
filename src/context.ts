import { createContext } from 'react';
import { IStoreContext } from './types';

export const StoreContext = createContext<IStoreContext>({ actions: {}, state: {} });