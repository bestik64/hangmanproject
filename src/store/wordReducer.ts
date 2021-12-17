import { Reducer } from "redux";
import { CLEAR_WORD, SET_WORD } from "../actions/wordActions";

export interface WordState {
    text: string;
}

const initialState: WordState = {
    text: "",
};

export const wordReducer: Reducer<WordState> = (
    state: WordState = initialState,
    action: any
): WordState => {
    switch (action.type) {
        case SET_WORD:
            let text = action.text as string;
            return { ...state, text: text };
        case CLEAR_WORD:
            return { ...initialState };
        default:
            return state;
    }
};
