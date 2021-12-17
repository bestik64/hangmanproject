export const SET_WORD = "SET_WORD";
export const CLEAR_WORD = "CLEAR_WORD";

export const SetWord = (text: string) => {
    return { type: SET_WORD, text };
};

export const ClearWord = () => {
    return { type: CLEAR_WORD };
}