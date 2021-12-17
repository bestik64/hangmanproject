export const calculateScoreSmarter = (
    err: number,
    uniqueChars: number,
    wordLength: number,
    duration: number
) => {
    const errConst = 4;
    const uniqueCharsConst = 3;
    const wordLengthConst = 2;
    const durationConst = 1;
    return (
        errConst * mathHelper(err) +
        uniqueCharsConst * (1 - mathHelper(uniqueChars)) +
        wordLengthConst * (1 - mathHelper(wordLength)) +
        durationConst * mathHelper(duration)
    );
};

const mathHelper = (x: number) => {
    return 1 / (Math.pow(x, 2) + 1);
};

//module.exports = calculateScoreSmarter;
