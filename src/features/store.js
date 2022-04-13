import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import sessionReducer from './session/sessionSlice';
import membersReducer from './session/membersSlice';

export const store = configureStore({
    reducer: {
      session: sessionReducer,
      members: membersReducer,
    },
  })

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)