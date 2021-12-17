export interface IResult {
    id?: number
    quoteId: string | undefined,
    length: number | undefined,
    uniqueCharacters: number | undefined,
    userName: string | undefined,
    errors: number | undefined
    duration: number | undefined
}