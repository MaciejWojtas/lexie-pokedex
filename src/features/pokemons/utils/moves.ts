export interface PokemonMove {
  name: string
  level: number
}

const organizeByLevel = (moves: PokemonMove[]) =>
  moves.reduce((accum: { [key: string]: string[] }, move) => {
    const level = move.level.toString()
    return {
      ...accum,
      [level]: [...(accum[level] || []), move.name],
    }
  }, {})

export default organizeByLevel
