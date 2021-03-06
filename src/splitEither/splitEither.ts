import { Either, fromLeft, fromRight, isLeft, isRight } from '@typed/either'
import { filter, map, multicast } from '@most/core'

import { Stream } from '@most/types'
import { pipe } from '@typed/functions'

const toLeftValue: <A, B>(either$: Stream<Either<A, B>>) => Stream<A> = pipe(
  filter(isLeft),
  map(fromLeft)
)
const toRightValue: <A, B>(either$: Stream<Either<A, B>>) => Stream<B> = pipe(
  filter(isRight),
  map(fromRight)
)

export const splitEither: <A, B>(
  either$: Stream<Either<A, B>>
) => [Stream<A>, Stream<B>] = pipe(multicast, __splitEither)

function __splitEither<A, B>(
  either$: Stream<Either<A, B>>
): [Stream<A>, Stream<B>] {
  return [toLeftValue(either$), toRightValue(either$)]
}
