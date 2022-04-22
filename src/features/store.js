import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import sessionReducer from './sessionSlice';
import membersReducer from './membersSlice';
import researchReducer from './researchSlice';

export const store = configureStore({
    reducer: {
      session: sessionReducer,
      members: membersReducer,
      research: researchReducer,
    },
  })

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)