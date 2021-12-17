export {}

const calculateScoreSmarter = require('../../helpers/calculationHelpers')

test('fewer errors - higher score', () => {
    expect(calculateScoreSmarter(5, 12, 20, 53543)).toBeGreaterThan(calculateScoreSmarter(7, 20, 42, 12465))
});

test('same errors number, larger unique letters number - higher score', () => {
    expect(calculateScoreSmarter(5, 12, 20, 53543)).toBeLessThan(calculateScoreSmarter(5, 20, 42, 12465))
});

test('same errors number, unique letters number, longer solution - higher score', () => {
    expect(calculateScoreSmarter(5, 12, 20, 53543)).toBeLessThan(calculateScoreSmarter(5, 12, 25, 12465))
});

test('same errors number, unique letters number, solution length, faster solution - higher score', () => {
    expect(calculateScoreSmarter(5, 12, 20, 53543)).toBeLessThan(calculateScoreSmarter(5, 12, 20, 12465))
});