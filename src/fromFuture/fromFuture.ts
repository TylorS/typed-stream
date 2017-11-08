import { Disposable, Scheduler, Sink, Stream } from '@most/types'

import { Either } from '@typed/either'
import { Future } from '@typed/future'
import { currentTime } from '@most/scheduler'

export function fromFuture<A, B>(future: Future<A, B>): Stream<Either<A, B>> {
  return new FromFuture(future)
}

class FromFuture<A, B> implements Stream<Either<A, B>> {
  constructor(private future: Future<A, B>) {}

  public run(sink: Sink<Either<A, B>>, scheduler: Scheduler): Disposable {
    const { future } = this

    return future.fork(
      (value: A) => {
        const now = currentTime(scheduler)
        sink.event(now, Either.left(value))
        sink.end(now)
      },
      (value: B) => {
        const now = currentTime(scheduler)
        sink.event(now, Either.of(value))
        sink.end(now)
      }
    )
  }
}
