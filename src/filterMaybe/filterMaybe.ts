import { Maybe, fromJust, isJust } from '@typed/maybe'
import { filter, map } from '@most/core'

import { Stream } from '@most/types'
import { pipe } from '@typed/functions'

export const filterMaybe: <A>(maybe$: Stream<Maybe<A>>) => Stream<A> = pipe(
  filter(isJust),
  map(fromJust)
)
