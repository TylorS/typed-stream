import { Maybe, fromJust, isJust, pipe } from '@typed/prelude'
import { filter, map } from '@most/core'

import { Stream } from '@most/types'

export const filterMaybe: <A>(maybe$: Stream<Maybe<A>>) => Stream<A> = pipe(
  filter(isJust),
  map(fromJust)
)
