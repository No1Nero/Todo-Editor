import { combineReducers, createStore } from "redux";
import { todoReducer } from "./todoReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, );

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
