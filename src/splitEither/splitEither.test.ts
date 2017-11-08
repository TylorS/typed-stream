import { Test, describe, given, it } from '@typed/test'
import { at, mergeArray, runEffects, tap } from '@most/core'

import { Either } from '@typed/either'
import { Stream } from '@most/types'
import { newDefaultScheduler } from '@most/scheduler'
import { range } from '@typed/list'
import { splitEither } from './splitEither'

export const test: Test = describe(`splitEither`, [
  given(`a Stream of Either a b`, [
    it(`returns (Stream a, Stream b)`, ({ equal }) => {
      const collectEvents = setup()
      const stream = mergeArray(
        range(0, 10).map(
          n =>
            n % 2 === 0
              ? at(n, Either.of<number, number>(n))
              : at(n, Either.left<number, number>(n))
        )
      )

      const odds = [1, 3, 5, 7, 9]
      const evens = [0, 2, 4, 6, 8]

      const [left$, right$] = splitEither(stream)

      return Promise.all([
        collectEvents(left$).then(equal(odds)),
        collectEvents(right$).then(equal(evens)),
      ])
    }),
  ]),
])

function setup() {
  const scheduler = newDefaultScheduler()
  const drain = <A>(stream: Stream<A>) => runEffects<A>(stream, scheduler)

  return function<A>(stream: Stream<A>): Promise<ReadonlyArray<A>> {
    const events: Array<A> = []

    return drain(tap(x => events.push(x), stream)).then(() => events)
  }
}
