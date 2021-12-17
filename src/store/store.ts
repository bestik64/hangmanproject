import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { wordReducer as word, WordState } from "./wordReducer";

export interface AppState {
    word: WordState;
}

export default function configureStore(initialState?: AppState) {
    const reducer = combineReducers<AppState>({
        word,
    });
    /* eslint-disable no-underscore-dangle */
    const result = createStore(reducer, initialState, composeWithDevTools());
    /* eslint-enable */
    return result;
}
