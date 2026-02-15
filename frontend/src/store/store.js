import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import storageWithMidnightExpiry from "./slices/storageWithMidnighExpiry";

const authPersistConfig = {
  key: "auth",
  storage: storageWithMidnightExpiry, // ✅ swapped storage
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistAuthReducer,
});

// console.log(await storageWithMidnightExpiry.getItem("auth"));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["register"],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
