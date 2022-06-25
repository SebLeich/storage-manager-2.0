import { createAction } from '@ngrx/store';
import { IInterface } from '../../globals/i-interface';

export const addIInterface = createAction(
  '[IInterface] Add IInterface',
  (iface: IInterface) => ({ iface })
);

export const addIInterfaces = createAction(
  '[IInterface] Add IInterfaces',
  (ifaces: IInterface[]) => ({ ifaces })
);

export const loadIInterfaces = createAction(
  '[IInterface] Load IInterfaces'
);

export const updateIInterface = createAction(
  '[IInterface] Update IInterfaces',
  (iface: IInterface) => ({ iface })
);

export const upsertIInterface = createAction(
  '[IInterface] Upsert IInterface',
  (iface: IInterface) => ({ iface })
);

export const upsertIInterfaces = createAction(
  '[IInterface] Upsert IInterfaces',
  (ifaces: IInterface[]) => ({ ifaces })
);

export const removeIInterface = createAction(
  '[IInterface] Remove IInterfaces',
  (iface: IInterface|number) => ({ iface })
);
