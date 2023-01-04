import calculateAverage from './average'

interface BestOccurrenceFunction {
  betterAcceptance: any
  coffeeTime: boolean
}

export function calculateBestOccurrence(
  array: any[],
): BestOccurrenceFunction | undefined {
  if (!array.length) return undefined
  // procurar maior card com maior ocorrência
  const objOccurrences = array
    // remover duplicados
    .filter((este, i) => array.indexOf(este) === i)
    // remover vazios
    .filter((a) => a)
    .map((item) => ({
      value: item,
      count: array.filter((i) => i === item).length,
    }))
    .sort((a, b) => b.count - a.count)
  const moreOccurrences = objOccurrences[0]
    ? objOccurrences[0].value
    : undefined
  // se não houver card com maior número de escolha, deve-se
  // calcular a média
  const average = calculateAverage(array)
  // procurar o valor mais próximo da lista em comparação com a média

  if (average === undefined) {
    return {
      betterAcceptance: '?',
      coffeeTime: false,
    }
  }

  const bestOccurrence = array.reduce(function (prevValue, currentValue) {
    return Math.abs(currentValue - average) < Math.abs(prevValue - average)
      ? currentValue
      : prevValue
  })

  const betterAcceptance =
    moreOccurrences !== undefined ? moreOccurrences : bestOccurrence

  return {
    betterAcceptance,
    coffeeTime: moreOccurrences === '☕' && !bestOccurrence,
  }
}
