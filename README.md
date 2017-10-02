# @typed/stream

Well-typed extensions to [`@most/core`](https://github.com/mostjs/core)

## Get it
```sh
yarn add @typed/stream
# or
npm install --save @typed/stream
```

## API

#### filterMaybe\<A\>(maybe$: Stream\<Maybe\<A\>\>): Stream\<A\>

Filters out the `Nothing` values a stream of `Maybe`s and unwraps the
values of all `Just`s.

```typescript
maybe$:             ---N---J(1)---N---J(1)---->
filterMaybe(maybe$):---------1----------1----->
```

#### splitEither\<A, B\>(either$: Stream\<Either\<A, B\>\>): [ Stream\<A\>, Stream\<B\> ]

Splits the values contained in an `Either` and produces 1 stream for the `Left` 
and 1 stream `Right` values.

```typescript
either$: ---L(1)---R(2)---L(3)---R(4)--->
const [ left$, right$ ] = splitEither(either$)
left$:   -----1-------------3----------->
right$:  ------------2-------------4---->
```
