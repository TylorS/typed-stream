import { Maybe, Nothing } from '@typed/prelude'
import { Scheduler, Stream } from '@most/types'
import { Test, describe, given, it } from '@typed/test'
import { at, mergeArray, runEffects, tap } from '@most/core'

import { filterMaybe } from './filterMaybe'
import { newDefaultScheduler } from '@most/scheduler'

export const test: Test = describe(`filterMaybe`, [
  given(`a stream of Maybe a`, [
    it(`it returns a`, ({ equal }) => {
      const scheduler = newDefaultScheduler()
      const stream = mergeArray([
        at(0, Maybe.of(0)),
        at(10, Nothing),
        at(20, Maybe.of(1)),
      ])

      const expected = [0, 1]

      return collectEvents(filterMaybe(stream), scheduler).then(equal(expected))
    }),
  ]),
])

export function collectEvents<A>(
  stream: Stream<A>,
  scheduler: Scheduler
): Promise<Array<A>> {
  const events: Array<A> = []

  return runEffects(tap(x => events.push(x), stream), scheduler).then(
    () => events
  )
}
